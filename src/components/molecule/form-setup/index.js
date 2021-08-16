import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import InputText from '../../atoms/input-text'
import Button from '../../atoms/button'

import { postUser } from '../../../store/slices/user'
import { getAccounts } from '../../../store/slices/accounts'

import styles from './styles.module.scss'

export default function FormSetup(props){

  const [ name, set_name ] = useState("")

  const inputNameRef = useRef();
  
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

  useEffect(() => {
    inputNameRef.current.focus()
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputText className={styles.input} placeholder="Como você se chama?" ref={inputNameRef} name="name" value={name} onChange={onChange}  />
        <Button className={styles.cta} type="submit">Salvar</Button>
      </form>
    </>
  )
}