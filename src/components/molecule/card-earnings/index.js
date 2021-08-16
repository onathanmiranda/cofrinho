import { useState }                 from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteForever, Edit }  from '@material-ui/icons'

import Button       from '../../atoms/button'
import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'

import formatCurrency from '../../../helpers/formatCurrency'

import { deleteEarning, updateEarning } from '../../../store/slices/earnings'

import styles from './styles.module.scss'

export default function EarningCard({ id, className }){

  const dispatchEvent = useDispatch();
  
  const earning = useSelector(({ earnings }) => earnings.items.find(( earning ) => earning.id === id ))

  const [ isEditing, set_isEditing ] = useState(false)
  const [ title, set_title ]         = useState(earning.title)
  const [ amount, set_amount ]       = useState(earning.amount)

  const onEdit = (e) => {
    e.preventDefault()
    dispatchEvent(updateEarning({
      ...earning,
      title,
      amount
    }))
    set_isEditing(false)
  }

  function onCancelEdit(){
    set_isEditing(false)
    set_title(earning.title)
    set_amount(earning.amount)
  }

  return (
    <>
      {!isEditing && 
        <article className={`${styles.card} ${className || ""}`}>
          <div className={styles.title}>{ earning.title }</div>
          <div className={styles.amount}>{ formatCurrency( earning.amount ) }</div>
          <Button className={styles.cardButton} type='button' onClick={ () => set_isEditing( true ) }>
            <Edit fontSize="large" />
          </Button>
          <Button className={styles.cardButton} type='button' onClick={ () => dispatchEvent(deleteEarning( id )) }>
            <DeleteForever fontSize="large" />
          </Button>
        </article>
      }

      {isEditing && (
        <form onSubmit={onEdit} className={`p-13 bg-gray-200`}>
          <div className={`p-13`}>
            <label htmlFor="title">Título</label>
            <InputText placeholder="Salário" name="title" value={title} onChange={(e) => set_title(e.target.value)} />
          </div>
          <div className={`p-13`}>
            <InputAmount placeholder="R$ 1.500,00" name="amount" value={amount} onChange={set_amount} />
          </div>
          <Button type="submit">Atualizar</Button>
          <Button type="button" onClick={onCancelEdit}>Cancelar</Button>
        </form>
      )}
    </>
  )
}