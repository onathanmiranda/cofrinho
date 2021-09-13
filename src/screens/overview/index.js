import { useSelector } from 'react-redux'

import FloatingCreateExpense  from '../../components/atoms/floating-create-expense'
import Timeline               from '../../components/organism/timeline'
import Summary                from '../../components/organism/summary'
import EarningsList           from '../../components/organism/list-earnings'
import AccountsCarousel       from '../../components/organism/carousel-accounts'
import Modal                  from '../../components/organism/modal'

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