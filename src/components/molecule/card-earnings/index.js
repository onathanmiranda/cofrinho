import { useState }                 from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button       from '../../atoms/button'
import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'

import formatCurrency from '../../../helpers/formatCurrency'

import { deleteEarning, updateEarning } from '../../../store/slices/earnings'

export default function EarningCard({ id }){

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
    <div className={`flex w-full p-8 shadow max-w-610 justify-between`}>
      {!isEditing && <>
        <div>{ earning.title }</div>
        <div>{ formatCurrency( earning.amount ) }</div>
        <Button type='button' onClick={ () => set_isEditing( true ) }>Editar</Button>
        <Button type='button' onClick={ () => dispatchEvent(deleteEarning( id )) }>Apagar</Button>
      </>}

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
    </div>
  )
}