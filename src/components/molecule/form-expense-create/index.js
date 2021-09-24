import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import InputText from '../../atoms/input-text'
import InputAmount from '../../atoms/input-amount'
import Button from '../../atoms/button'

import { createExpense, getExpenses } from '../../../store/slices/expenses'

import styles from './styles.module.scss'

export default function FormCreateExpense({ onSubmit, onCancel, account = false, onClick }){
  const dispatchEvent = useDispatch();
  const inputTitle    = useRef();
  
  const accounts      = useSelector(({ accounts }) => accounts.items);
  const accountTitle  = accounts.find(({ id }) => id === account )?.title;

  const [ title, setTitle ]         = useState("")
  const [ amount, setAmount ]       = useState(0)
  const [ accountID, setAccountID ] = useState(account)

  const handleSubmit = (e) => {
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
      if(onSubmit) onSubmit()
    })
  }

  useEffect(() => {
    inputTitle.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit} className={`${styles.form}`} onClick={onClick}>
      {account &&
        <h3 className={styles.accountTitle}>{`Adicione um gasto com ${accountTitle}`}</h3>
      }
      <InputText className={styles.inputTitle} ref={inputTitle} required={true} onChange={(e) => setTitle(e.target.value)} value={title} name="title" placeholder="Com o que você gastou?" />
      <InputAmount required={true} onChange={setAmount} value={amount} />
      {!account && <>
        <h3 className={styles.accountSelectorText}>À qual conta pertence o gasto?</h3>
        <div className={styles.accountsWrapper}>
          {accounts.map(( account ) => {
            const isChecked = account.id === accountID
            const classNames = isChecked ? styles.checked : ''
            return(
              <label required={true} key={account.id} className={`${styles.radioLabel} ${classNames}`}>
                <input className={styles.inputRadio} type="radio" onChange={()=>{ setAccountID(account.id) }} name="account" value={account.id} checked={isChecked}/>
                {account.title}
              </label>
            )
          })}
        </div>
      </>}
      <Button className={styles.submitButton} >Salvar</Button>
      <Button className={styles.cancelButton} type="button" onClick={onCancel}>Cancelar</Button>
    </form>
  )
}