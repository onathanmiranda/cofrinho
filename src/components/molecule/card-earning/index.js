import { useDispatch, useSelector } from 'react-redux'
import { DeleteForever, Edit }  from '@material-ui/icons'

import Button from '../../atoms/button'

import formatCurrency from '../../../helpers/formatCurrency'

import { setFormEarning } from '../../../store/slices/modal'
import { deleteEarning } from '../../../store/slices/earnings'

import styles from './styles.module.scss'

export default function EarningCard({ id, className = "" }){

  const dispatchEvent = useDispatch();
  
  const earning = useSelector(({ earnings }) => earnings.items.find(( earning ) => earning.id === id ))

  function handleEdit(){
    dispatchEvent(setFormEarning({ show: true, earningID: earning.id }))
  }

  function handleDelete(){
    dispatchEvent(deleteEarning( earning.id ))
  }

  return (
      <article className={`${styles.card} ${className}`}>
        <div>
          <div className={styles.title}>{ earning.title }</div>
          <div className={styles.amount}>{ formatCurrency( earning.amount ) }</div>
        </div>
        <Button className={styles.cardButton} type='button' onClick={ handleEdit }>
          <Edit fontSize="large" />
        </Button>
        <Button className={styles.cardButton} type='button' onClick={ handleDelete }>
          <DeleteForever fontSize="large" />
        </Button>
      </article>
  )
}