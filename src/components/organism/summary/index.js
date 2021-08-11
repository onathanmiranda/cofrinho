import { useSelector } from "react-redux"

import formatCurrency from '../../../helpers/formatCurrency'

import styles from './styles.module.scss'

export default function Summary(){
  
  const { totalSpent }  = useSelector(({ expenses }) => expenses )
  const { totalEarned } = useSelector(({ earnings }) => earnings )
  
  const totalAvailable  = totalEarned - totalSpent;
  
  const negativeClassName = ( totalAvailable < 0 ) ? styles.negative : ""
  
  return (
    <header className={styles.header}>
      <data className={`${styles.totalAvailable} ${negativeClassName}`} value={totalAvailable}>{formatCurrency(totalAvailable)}</data>
      <data className={styles.totalEarned} value={totalEarned}>{formatCurrency(totalEarned)}</data>
    </header>
  )
}