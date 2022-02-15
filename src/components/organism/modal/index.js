import { useSelector, useDispatch } from "react-redux";

import FormCreateExpense from "../../molecule/form-expense-create";
import FormCreateEarning from "../../molecule/form-earning";
import FormManageAccounts from "../../molecule/form-manage-accounts";

import {
  hideFormEarning,
  hideFormCreateExpense,
  hideFormManageAccounts,
} from "../../../store/slices/modal";

import styles from "./styles.module.scss";

export default function Modal() {
  const dispatchEvent = useDispatch();

  const modal = useSelector(({ modal }) => modal);

  const { formCreateExpense, formEarning, formManageAccounts } = modal;

  const displayModal = Object.keys(modal).reduce(
    (acc, key) => (acc ? acc : modal[key].show),
    false
  );

  function formCreateExpenseOnAction() {
    dispatchEvent(hideFormCreateExpense());
  }

  function formEarningOnAction() {
    dispatchEvent(hideFormEarning());
  }

  function formManageAccountsOnAction() {
    dispatchEvent(hideFormManageAccounts());
  }

  return (
    <>
      {displayModal && (
        <div className={`${styles.modal}`}>
          {formCreateExpense.show && (
            <FormCreateExpense
              account={formCreateExpense.accountID}
              onCancel={formCreateExpenseOnAction}
              onSubmit={formCreateExpenseOnAction}
            />
          )}
          {formEarning.show && (
            <FormCreateEarning
              earningID={formEarning.earningID}
              onCancel={formEarningOnAction}
              onSubmit={formEarningOnAction}
            />
          )}
          {formManageAccounts.show && (
            <FormManageAccounts
              onCancel={formManageAccountsOnAction}
              onSubmit={formManageAccountsOnAction}
            />
          )}
        </div>
      )}
    </>
  );
}
