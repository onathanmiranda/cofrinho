import { useState } from 'react'

import styles from './styles.module.scss'

export default function PercentageInput( props ){

  const [focus, set_focus] = useState(false);
  const [stagedValue, setStagedValue] = useState(false);

  const onChange = (e) => {
    let { value } = e.target
    value = value ? value.replaceAll(',','.').match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/g)[0] : '0'
    const lastValueCharacter = value.substr(value.length -1)
    if(lastValueCharacter === '.'){
      setStagedValue(value)
      return
    } else {
      console.log(value)
      value = parseFloat( value ) / 100
      console.log(value)
      value = isNaN( value ) ? 0 : value
      props.onChange( value )
      setStagedValue(false)
    }
  }

  const formattedValue = stagedValue ? stagedValue : (props.value * 100).toString()
  const focusClassName = focus ? styles.focus : ""
  const valueToCharsArray = formattedValue.toString().split('')
  const cursorWhiteSpaces = valueToCharsArray.reduce((acc) => <>{acc}&nbsp;&nbsp;</>, '')

  console.log(formattedValue)

  return (
    <div className={`${styles.inputWrapper} ${props.className || ''} ${focusClassName}`}>
      {formattedValue}
      <span className={`${styles.cursor} ${focusClassName}`}>{cursorWhiteSpaces}|</span>
      %
      <input { ...props } 
        onFocus={() => set_focus(true)}
        onBlur={() => set_focus(false)}
        className={ `${styles.input}` } 
        value={ formattedValue } 
        onChange={onChange} 
        name={ props.name }
        type="text"
      />
      
    </div>
  )
}