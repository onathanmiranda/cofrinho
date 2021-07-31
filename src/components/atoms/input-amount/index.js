import styles from './styles.module.scss'

import formatCurrency from '../../../helpers/formatCurrency'

export default function AmountInput( props ){

    const onChange = (e) => {
        let { value } = e.target
        value = value.replace(/\D/g,"") //remove non-numeric chars
        props.onChange( parseInt( value ))
    }

    const formattedValue = formatCurrency( props.value )

    return (
        <div>
            <label htmlFor={ props.name }>{ props.label || "Quantia" }</label>
            <input { ...props } className={ styles.input } value={ formattedValue } onChange={onChange} name={ props.name } type="text" />
        </div>
    )
}