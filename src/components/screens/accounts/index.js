import { useParams }    from "react-router";
import { Link }         from "react-router-dom";
import { ArrowBackIos } from '@material-ui/icons'

import Timeline from "../../organism/timeline";

import useAccount     from "../../../hooks/useAccount";
import formatCurrency from '../../../helpers/formatCurrency'

import styles from './styles.module.scss'

export default function Accounts(){

  const id = parseInt(useParams().id);

  const {
    leftOvers,
    account,
    accountBudget,
    expenses,
    accountAvailable,
    totalSpent,
    remainingTotal
  } = useAccount(id);


  return (
    <div className={styles.wrapper}>
      <Link to="/overview" className={styles.backLink}><ArrowBackIos/> Voltar</Link>
      <header className={styles.header}>
        <h1 className={styles.title}>{account?.title}</h1>
      </header>
      <section className={styles.summary}>
        <p className={styles.item}>Total: <data value={accountAvailable}>{formatCurrency(accountAvailable)}</data></p>
        <p className={styles.item}>Gasto: <data value={totalSpent}>{formatCurrency(totalSpent)}</data></p>
        <p className={styles.item}>Disponível: <data value={remainingTotal}>{formatCurrency(remainingTotal)}</data></p>
      </section>
      <Timeline />
    </div>
  )
}