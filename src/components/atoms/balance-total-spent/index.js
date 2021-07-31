import { useSelector } from 'react-redux'

import formatCurrency from '../../../helpers/formatCurrency'

export default function BalanceTotalSpent(props){
    
    const expenses = useSelector(({ expenses }) => expenses.items)

    const totalSpent = expenses.reduce((accumulator, expense) => {
      return accumulator + expense.amount
    }, 0)

    return <>{formatCurrency(totalSpent)}</>
}