import { useSelector } from 'react-redux'

import Timeline     from '../../components/organism/timeline'
import Summary      from '../../components/organism/summary'
import EarningsList from '../../components/organism/list-earnings'
import FloatingCreateExpense from '../../components/organism/floating-create-expense'
import AccountsCarousel from '../../components/organism/carousel-accounts'

import styles from './styles.module.scss'

export default function Overview(props){

  const user = useSelector(({ user }) => user.data )
  
  return (
    <>
      <h1 className={styles.welcome}>Bem-vindo, {user.name}</h1>
      <Summary />
      <AccountsCarousel />
      <EarningsList />
      <Timeline />
      <FloatingCreateExpense />
    </>
  )
}