import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { createEarning } from '../../../store/slices/earnings'

import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'
import Button       from '../../atoms/button'

import styles from './styles.module.scss'

export default function FormEarning(props){

  const [ title, set_title ]   = useState("");
  const [ amount, set_amount ] = useState("");
  const [ open, set_open ]     = useState(false);

  const dispatchEvent = useDispatch();
  const inputTitleRef = useRef();
  
  const onSubmit = (e) => {
    e.preventDefault();
  
    dispatchEvent(createEarning({ title, amount }));

    set_open(false);
    set_title("");
    set_amount("");

    if(props.onSubmit) props.onSubmit();
  }
  
  useEffect(() => {
    if(open) inputTitleRef.current.focus();
  }, [open]);

  return (
    <>
      {!open && 
        <Button  className={`${props.className || ""}`} onClick={() => set_open( true )} type="button" >Adicionar</Button>
      }
      {open && 
        <form onSubmit={onSubmit} className={ `${styles.form} ${props.className || ""}` }>
          <InputText ref={inputTitleRef} className={ styles.titleInput } placeholder="Título da Receita" name="title" value={title} onChange={(e) => set_title(e.target.value)} required={ true }/>
          <InputAmount className={ styles.amountInput } name="amount" value={amount} onChange={set_amount} required={ true }/>
          <Button className={ styles.submitButton } type="submit" >Adicionar</Button>
          <Button className={ styles.cancelButton } onClick={() => set_open( false )} type="button" >Cancelar</Button>
        </form>
      }
    </>
  )
}
