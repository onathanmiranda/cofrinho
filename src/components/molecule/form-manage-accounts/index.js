import { useState } from "react"
import { useSelector, useDispatch} from "react-redux"

import Button from '../../atoms/button'
import PercentageInput from "../../atoms/input-percentage"

import styles from './styles.module.scss'

export default function FormManageAccounts({ onCancel, onSubmit }){
  const dispatchEvent = useDispatch()
  
  const accountsItems = useSelector(({ accounts }) => accounts.items)

  const initialState = accountsItems.reduce((acc, account) => {
    acc.push({ id: account.id, quota: account.quota })
    return acc
  }, [])

  const [ accounts, setAccounts ] = useState(initialState)

  const quotasSum = accounts.reduce((acc, account) => acc + account.quota * 100, 0);

  function handleCancel(){
    if(onCancel) onCancel()
  }

  function handleSubmit(e){
    e.preventDefault()
    if(onSubmit) onSubmit()
  }

  function handleOnChange(accountID, newQuota){
    let _accounts = [ ...accounts ]
    const accountIndex = _accounts.findIndex((account) => account.id === accountID)
    _accounts[accountIndex].quota = newQuota
    setAccounts(_accounts)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {accounts.map(( account ) => {
        return (
          <div key={account.id}>
            <PercentageInput onChange={(value) => handleOnChange(account.id, value)} value={account.quota} />
          </div>
        )
      })}
      <div>{quotasSum}</div>
      <Button className={styles.submitButton} >Salvar</Button>
      <Button className={styles.cancelButton} type="button" onClick={handleCancel}>Cancelar</Button>
    </form>
  )
}