import { useDispatch, useSelector } from 'react-redux'
import { DeleteForever, Edit }      from '@material-ui/icons'

import Button from '../../atoms/button'

import formatCurrency from '../../../helpers/formatCurrency'

import { deleteExpense } from '../../../store/slices/expenses'

import styles from './styles.module.scss'

export default function ExpenseCard({ id, className }){

  const dispatchEvent = useDispatch();
  
  const expense = useSelector(({ expenses }) => expenses.items.find(( expense ) => expense.id === id ))

  const { title, amount } = expense

  function onEdit(){

  }
  function onDelete(){
    dispatchEvent(deleteExpense( id ))
  }

  return (
    <article className={`${styles.card} ${className || ""}`}>
      <div>
        <div className={styles.title}>{ title }</div>
        <data value={ amount } className={styles.amount}>{ formatCurrency( amount ) }</data>
      </div>
      <Button className={styles.cardButton} type='button' onClick={ onEdit }>
        <Edit fontSize="large" />
      </Button>
      <Button className={styles.cardButton} type='button' onClick={ onDelete }>
        <DeleteForever fontSize="large" />
      </Button>
    </article>
  )
}