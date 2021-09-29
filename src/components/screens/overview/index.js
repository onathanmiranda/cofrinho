import { useSelector } from 'react-redux'

import ButtonAccountSettings  from '../../molecule/button-account-settings'
import ButtonCreateExpense    from '../../molecule/button-create-expense'
import AccountsCarousel       from '../../organism/carousel-accounts'
import EarningsList           from '../../organism/list-earnings'
import Modal                  from '../../organism/modal'
import Summary                from '../../organism/summary'
import Timeline               from '../../organism/timeline'

import styles from './styles.module.scss'

export default function Overview(){

  const user = useSelector(({ user }) => user.data )
  
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.welcome}>Bem-vindo, {user.name}</h1>
      <Summary />
      <AccountsCarousel />
      <EarningsList />
      <Timeline />
      <ButtonAccountSettings />
      <ButtonCreateExpense />
      <Modal/>
    </div>
  )
}