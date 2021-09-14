import { useSelector } from 'react-redux'

import FloatingCreateExpense  from '../../atoms/floating-create-expense'
import Timeline               from '../../organism/timeline'
import Summary                from '../../organism/summary'
import EarningsList           from '../../organism/list-earnings'
import AccountsCarousel       from '../../organism/carousel-accounts'
import Modal                  from '../../organism/modal'

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
      <FloatingCreateExpense />
      <Modal/>
    </div>
  )
}