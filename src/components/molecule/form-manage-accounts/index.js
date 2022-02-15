import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Decimal from "decimal.js";

import Button from "../../atoms/button";
import PercentageInput from "../../atoms/input-percentage";

import { updateAccount } from "../../../store/slices/accounts";

import styles from "./styles.module.scss";

export default function FormManageAccounts({ onCancel, onSubmit }) {
  const dispatchEvent = useDispatch();

  const accountsItems = useSelector(({ accounts }) => accounts.items);

  const initialState = accountsItems.reduce((acc, account) => {
    acc.push({ id: account.id, quota: account.quota, title: account.title });
    return acc;
  }, []);

  const [accounts, setAccounts] = useState(initialState);

  let quotasSum = accounts
    .reduce((acc, { quota }) => {
      acc = new Decimal(acc);
      quota = new Decimal(quota);
      return acc.plus(quota);
    }, 0)
    .times(100);

  quotasSum = parseFloat(quotasSum);

  const isQuotasSumDifferentFrom100 = quotasSum !== 100;
  const quotasSumErrorClassName = isQuotasSumDifferentFrom100
    ? styles.error
    : "";

  function handleCancel() {
    if (onCancel) onCancel();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isQuotasSumDifferentFrom100) return;
    Promise.all(
      accounts.map((account) => dispatchEvent(updateAccount(account)))
    )
      .then(() => {
        if (onSubmit) onSubmit();
      })
      .catch(console.log);
  }

  function handleOnChange(accountID, newQuota) {
    let _accounts = [...accounts];
    const accountIndex = _accounts.findIndex(
      (account) => account.id === accountID
    );
    _accounts[accountIndex].quota = parseFloat(newQuota);
    setAccounts(_accounts);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {accounts.map((account) => {
        return (
          <div className={styles.account} key={account.id}>
            <label className={styles.accountTitle} htmlFor={account.title}>
              {account.title}
            </label>
            <PercentageInput
              name={account.title}
              onChange={(value) => handleOnChange(account.id, value)}
              value={account.quota}
            />
          </div>
        );
      })}
      <div className={`${styles.quotasSum} ${quotasSumErrorClassName}`}>
        <p>Total {quotasSum}%</p>
        {isQuotasSumDifferentFrom100 && (
          <p className={styles.errorMessage}>
            A soma das porcentagens deve ser igual à 100%
          </p>
        )}
      </div>
      <Button
        disabled={isQuotasSumDifferentFrom100}
        className={styles.submitButton}
      >
        Salvar
      </Button>
      <Button
        className={styles.cancelButton}
        type="button"
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </form>
  );
}
