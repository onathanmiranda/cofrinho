import styles from './styles.module.scss'

import formatCurrency from '../../../helpers/formatCurrency'
import { useState } from 'react'

export default function AmountInput( props ){

  const [focus, set_focus] = useState(false);

  const onChange = (e) => {
    let { value } = e.target
    value = value.replace(/\D/g,"") //remove non-numeric chars
    value = parseInt( value )
    value = isNaN(value) ? 0 : value
    props.onChange( value )
  }

  const formattedValue = formatCurrency( props.value )

  const focusClassName = focus ? styles.focus : ""

  return (
    <div className={`${styles.inputWrapper} ${props.className || ''} ${focusClassName}`}>

      {formattedValue}<span className={`${styles.cursor} ${focusClassName}`}>|</span>

      <input { ...props } 
        onFocus={() => set_focus(true)}
        onBlur={() => set_focus(false)}
        className={ `${styles.input}` } 
        value={ props.value } 
        onChange={onChange} 
        name={ props.name }
        type="number"
        min={0}
      />
    </div>
  )
}