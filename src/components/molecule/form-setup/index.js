import { useState } from 'react'
import { useDispatch } from 'react-redux'

import InputText from '../../atoms/input-text'
import Button from '../../atoms/button'

import { postUser } from '../../../store/slices/user'
import { getAccounts } from '../../../store/slices/accounts'

export default function FormSetup(props){

  const [ name, set_name ] = useState("")
  
  const dispatchEvent = useDispatch();
  
  const onChange = (e) => set_name(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()

    if(Boolean(name)) {
      Promise
      .all([ dispatchEvent(postUser({ name })) ])
      .then(() => {
        dispatchEvent(getAccounts())
        if(props.onSubmit) props.onSubmit() 
      })
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Como você gostaria de ser chamado?</label>
        <InputText name="name" value={name} onChange={onChange} />
        <Button type="submit">Salvar</Button>
      </form>
    </>
  )
}