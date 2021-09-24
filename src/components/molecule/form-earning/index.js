import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EarningModel from '../../../models/earning'

import { createEarning, updateEarning } from '../../../store/slices/earnings'

import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'
import Button       from '../../atoms/button'

import styles from './styles.module.scss'

export default function FormEarning({ onSubmit, onCancel, className = "", earningID }){

  const isEditing = Boolean(earningID)
  const earnings = useSelector(({ earnings }) => earnings );
  const earning  = isEditing ? earnings.items.find(({ id }) => id === earningID ) : new EarningModel({});

  const [ title, set_title ]   = useState(earning.title);
  const [ amount, set_amount ] = useState(earning.amount);

  const dispatchEvent = useDispatch();
  const inputTitleRef = useRef();
  const currentMonthTimestamp = useSelector(({ timeline }) => timeline.current.timestamp )
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const createdAt = currentMonthTimestamp

    if(earningID){
      dispatchEvent(updateEarning({ ...earning, title, amount }));
    } else {
      dispatchEvent(createEarning({ title, amount, createdAt }));
    }

    if(onSubmit) onSubmit();
  }

  function handleCancel(){
    if(onCancel) onCancel();
  }
  
  useEffect(() => {
    inputTitleRef.current.focus();
  }, []);

  const formTitle = isEditing ? "Edite a Receita" : "Adicione uma Receita"

  return (
    <form className={ `${styles.form} ${className}` } onSubmit={ handleSubmit }>
      <h2 className={styles.title}>{formTitle}</h2>
      <InputText className={ styles.titleInput } name="title" onChange={(e) => set_title(e.target.value)} placeholder="Título da Receita" ref={inputTitleRef} required={ true } value={title} />
      <InputAmount className={ styles.amountInput } name="amount" onChange={set_amount} required={ true } value={amount} />
      <Button className={ styles.submitButton } type="submit" >Adicionar</Button>
      <Button className={ styles.cancelButton } onClick={handleCancel} type="button" >Cancelar</Button>
    </form>
  )
}
