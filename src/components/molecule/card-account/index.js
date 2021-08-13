import { useSelector } from 'react-redux'

import FormatPercent from '../../atoms/format-percent'
import formatCurrency from '../../../helpers/formatCurrency'

import styles from './styles.module.scss'

export default function CardAccount({ id, className, style }){

    const account = useSelector(({ accounts }) => accounts.items.find(( account ) => account.id === id ))
    const accountBudget = useSelector(({ earnings }) => earnings.totalEarned * account.quota)
    const expenses = useSelector(({ expenses }) => expenses.items.filter(( expense ) => expense.account === account.id ))
    const totalSpent = expenses.reduce((accumulator, expense) => {
      return accumulator + expense.amount
    }, 0)

    const remainingTotal = accountBudget - totalSpent
    
    return (
        <a style={style} className={`${styles.card} ${className || ''}`} href={`accounts/${account.id}`}>
            <div>
                <FormatPercent>
                    {account.quota}
                </FormatPercent>
            </div>
            <div>
                <h3>{account.title}</h3>
                <p>{formatCurrency( remainingTotal )}</p>
            </div>
        </a>
    )
}