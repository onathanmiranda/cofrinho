import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createEarning } from '../../../store/slices/earnings'

import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'
import Button       from '../../atoms/button'

import styles from './styles.module.scss'

export default function FormEarning(props){

  const [ title, set_title ]   = useState("")
  const [ amount, set_amount ] = useState("")
  const [ open, set_open ]     = useState(false)

  const dispatchEvent = useDispatch()
  
  const onSubmit = (e) => {
    e.preventDefault()

    dispatchEvent(createEarning({ title, amount }))

    set_title("")
    set_amount("")

    if(props.onSubmit) props.onSubmit()
  }

  return (
    <>
      {!open && 
        <Button>
          Adicionar nova receita
        </Button>
      }
      {open &&
        <form onSubmit={onSubmit} className={`p-13 bg-gray-200`}>
          <div className={`p-13`}>
            <label htmlFor="title">Título</label>
            <InputText placeholder="Salário" name="title" value={title} onChange={(e) => set_title(e.target.value)} />
          </div>
          <div className={`p-13`}>
            <InputAmount placeholder="R$ 1.500,00" name="amount" value={amount} onChange={set_amount} />
          </div>
          <Button type="submit">Adicionar</Button>
        </form>
      }
    </>
  )
}
