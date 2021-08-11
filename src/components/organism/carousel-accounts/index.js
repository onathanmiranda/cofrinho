import { useSelector } from "react-redux"

import CardAccount from "../../molecule/card-account"

import styles from './styles.module.scss'

export default function AccountsCarousel(){
  
  const accounts = useSelector(({ accounts }) => accounts.items )
  
  return (
    <section className={styles.carousel}>
      <div className={styles.scrollable}>
        {accounts.map(( account ) => (
          <CardAccount key={ account.id } id={ account.id } />
        ))}
      </div>
    </section>
  )
}