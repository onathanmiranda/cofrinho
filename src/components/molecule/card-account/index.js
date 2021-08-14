import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';

import formatPercentage from '../../../helpers/formatPercentage'
import formatCurrency from '../../../helpers/formatCurrency'

import 'swiper/swiper.scss';
import styles from './styles.module.scss'

export default function CardAccount({ id, className, style }){

    const account = useSelector(({ accounts }) => accounts.items.find(( account ) => account.id === id ))
    const accountBudget = useSelector(({ earnings }) => earnings.totalEarned * account.quota)
    const expenses = useSelector(({ expenses }) => expenses.items.filter(( expense ) => expense.account === account.id ))
    const totalSpent = expenses.reduce((accumulator, expense) => {
      return accumulator + expense.amount
    }, 0)

    const remainingTotal = accountBudget - totalSpent
    
    return (
        <a style={style} className={`${styles.card} ${className || ''}`} href={`accounts/${account.id}`}>
          <header className={styles.header}>
            <div className={styles.quota}>
              {formatPercentage(account.quota)}
            </div>
            <div>
              <h3>{account.title}</h3>
              <p>{formatCurrency( remainingTotal )}</p>
            </div>
          </header>
          <section className={styles.expenses}>
            <h3 className={styles.latestExpensesTitle}>Últimas despesas</h3>
            <Swiper
              spaceBetween={5}
              slidesPerView={'auto'}
              freeMode={true}
              className={styles.expensesSwaper}
            >
              {expenses.map((expense) => {
                return (
                  <SwiperSlide className={styles.expense} key={expense.id}>
                    <div className={styles.expenseTitle}>{expense.title}</div>
                    {formatCurrency( expense.amount )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
        </a>
    )
}