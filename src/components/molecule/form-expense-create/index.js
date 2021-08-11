import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import InputText from '../../atoms/input-text'
import InputAmount from '../../atoms/input-amount'
import Button from '../../atoms/button'

import { createExpense, getExpenses } from '../../../store/slices/expenses'

import styles from './styles.module.scss'

export default function FormCreateExpense(props){
  const dispatchEvent = useDispatch();
  const accounts = useSelector(({ accounts }) => accounts.items)
  const inputTitle = useRef();

  const [ title, setTitle ] = useState("")
  const [ amount, setAmount ] = useState(0)
  const [ accountID, setAccountID ] = useState()

  const onSubmit = (e) => {
    e.preventDefault();
    Promise.all([
      dispatchEvent(createExpense({
        title,
        amount,
        account: accountID
      }))
    ]).then(() => {
      return dispatchEvent(getExpenses())
    }).then(() => {
      if(props.onSubmit) props.onSubmit()
    })
  }

  useEffect(() => {
    inputTitle.current.focus()
  }, [])

  console.log(styles)

  return (
    <form onSubmit={onSubmit} className={`${styles.form} px-13 py-21`}>
      <label>
        Com o que você gastou?
        <InputText ref={inputTitle} required={true} onChange={(e) => setTitle(e.target.value)} value={title} name="title" placeholder="Ex: Aluguel" />
      </label>
      <InputAmount required={true} onChange={setAmount} value={amount} />
      <div>
        À qual conta pertence o gasto?
        <div className={`gap-5 flex flex-wrap`}>
          {accounts.map(( account ) => {
            const isChecked = account.id === accountID
            const classNames = isChecked ? `bg-black text-white` : ''
            return(
              <label required={true} key={account.id} className={`text-center block w-1/3 rounded border p-3 ${classNames}`}>
                <input className={`opacity-0 absolute`} type="radio" onChange={()=>{ setAccountID(account.id) }} name="account" value={account.id} checked={isChecked}/>
                {account.title}
              </label>
            )
          })}
        </div>
      </div>
      <Button>Salvar</Button>
      <Button type="button" onClick={props.onCancel}>Cancelar</Button>
    </form>
  )
}