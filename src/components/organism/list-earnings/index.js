import { useSelector } from 'react-redux'

import EarningCard from '../../molecule/card-earnings'
import FormEarning from '../../molecule/form-earning-create'

import styles from './styles.module.scss'

export default function EarningsList(){
  
  const earnings = useSelector(({ earnings }) => earnings.items )

  return (
    <section className={styles.section}>
      <h2 className={styles.listTitle}>Receita</h2>
      {earnings.map((earning) => (
        <EarningCard id={ earning.id } key={ earning.id } />
      ))}
      <FormEarning />
    </section>
  )
}