import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";

import ExpenseCard from "../../molecule/card-expense";
import Timeline from "../../organism/timeline";
import FloatingCreateExpense from "../../molecule/button-create-expense";
import Modal from "../../organism/modal";

import useAccount from "../../../hooks/useAccount";
import formatCurrency from "../../../helpers/formatCurrency";
import formatPercentage from "../../../helpers/formatPercentage";

import styles from "./styles.module.scss";

export default function Accounts() {
  const id = parseInt(useParams().id);

  const {
    leftOvers,
    account,
    accountBudget,
    expenses,
    accountAvailable,
    totalSpent,
    remainingTotal,
  } = useAccount(id);

  return (
    <div className={styles.wrapper}>
      <Link to="/overview" className={styles.backLink}>
        <ArrowBackIos /> Voltar
      </Link>
      <header className={styles.header}>
        <h1 className={styles.title}>{account?.title}</h1>
      </header>
      <section className={styles.summary}>
        <p className={`${styles.item} ${styles.leftOvers}`}>
          Sobrou de Meses Anteriores:{" "}
          <data value={leftOvers || 0}>{formatCurrency(leftOvers)}</data>
        </p>
        <p className={`${styles.item} ${styles.accountBudget}`}>
          Orçamento desse Mês:{" "}
          <data value={accountBudget || 0}>
            {formatCurrency(accountBudget)}
          </data>
        </p>
        <p className={`${styles.item} ${styles.accountAvailable}`}>
          Total:{" "}
          <data value={accountAvailable || 0}>
            {formatCurrency(accountAvailable)}
          </data>
        </p>
        <p className={`${styles.item} ${styles.totalSpent}`}>
          Gasto:{" "}
          <data value={totalSpent || 0}>{formatCurrency(totalSpent)}</data>
        </p>
        <p className={`${styles.item} ${styles.remainingTotal}`}>
          Restante:{" "}
          <data value={remainingTotal || 0}>
            {formatCurrency(remainingTotal)}
          </data>
        </p>
        <div className={styles.quota}>{formatPercentage(account?.quota)}</div>
      </section>
      <section className={styles.expenses}>
        {expenses.map(({ id }) => {
          return <ExpenseCard className={styles.expense} id={id} key={id} />;
        })}
      </section>
      <Timeline />
      <FloatingCreateExpense accountID={id} />
      <Modal />
    </div>
  );
}
