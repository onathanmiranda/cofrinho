import { useDispatch } from 'react-redux'
import { Swiper, SwiperSlide }      from 'swiper/react'
import SwiperCore, { Mousewheel }   from 'swiper/core'

import Button from '../../atoms/button'

import useAccount from '../../../hooks/useAccount';

import formatPercentage from '../../../helpers/formatPercentage'
import formatCurrency   from '../../../helpers/formatCurrency'

import { setFormCreateExpense } from '../../../store/slices/modal'

import 'swiper/swiper.scss';
import styles from './styles.module.scss'

SwiperCore.use([ Mousewheel ]);

export default function CardAccount({ id, className, style }){
  const dispatchEvent = useDispatch();

  const { account, expenses, accountAvailable, remainingTotal } = useAccount(id);

  const displayFormReduxAction = setFormCreateExpense({ show: true, accountID: account.id });

  function handleAddNewExpenseClick(e){
    e.stopPropagation();
    e.preventDefault();
    dispatchEvent(displayFormReduxAction);
  }
  
  return (
    <a style={style} className={`${styles.card} ${className || ''}`} href={`accounts/${account.id}`}>
      <header className={styles.header}>
        <div className={styles.quota}>
          {formatPercentage(account.quota)}
        </div>
        <div className={styles.account}>
          <h3 className={styles.title}>{account.title}</h3>
          <p>{formatCurrency( accountAvailable )}</p>
        </div>
      </header>
      <section>
        <data value={ remainingTotal } className={styles.remainingTotal}>{formatCurrency( remainingTotal )}</data>
      </section>
      <section className={styles.expenses}>
        <h3 className={styles.latestExpensesTitle}>Últimas despesas</h3>
        <div className={styles.expensesListWrapper}>
          <Button onClick={handleAddNewExpenseClick} className={styles.addNewExpense} >+</Button>
          <Swiper
            spaceBetween={5}
            slidesPerView={'auto'}
            freeMode={true}
            className={styles.expensesSwaper}
            nested={true}
            mousewheel={true}
          >
            {expenses.map((expense) => {
              return (
                <SwiperSlide className={styles.expense} key={expense.id}>
                  <div className={styles.expenseTitle}>{expense.title}</div>
                  {formatCurrency( expense.amount )}
                </SwiperSlide>
              )})
            }
          </Swiper>
        </div>
      </section>
    </a>
  )
}