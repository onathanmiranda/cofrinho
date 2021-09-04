import { useSelector } from "react-redux"

import formatCurrency from '../../../helpers/formatCurrency'

import styles from './styles.module.scss'

export default function Summary(){
  
  const { totalSpent }    = useSelector(({ expenses })  => expenses )
  const { totalEarned }   = useSelector(({ earnings })  => earnings )
  const { totalLeftOver } = useSelector(({ leftovers }) => leftovers )

  const totalAvailable  = totalEarned + totalLeftOver;
  const totalLasting    = totalAvailable - totalSpent;
  
  const negativeClassName = ( totalAvailable < 0 ) ? styles.negative : ""
  
  return (
    <header className={styles.header}>
      <data className={`${styles.totalAvailable} ${negativeClassName}`} value={totalLasting}>{formatCurrency(totalLasting)}</data>
      <data className={styles.totalEarned} value={totalEarned}>{formatCurrency(totalAvailable)}</data>
    </header>
  )
}