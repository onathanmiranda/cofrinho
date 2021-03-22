import { connect } from 'react-redux'

import FormatCurrency from '../format-currency'

const mapDispatchToProps = null

const mapStateToProps = (state) => {

    const { expenses } = state
    
    return ({ expenses })
}

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const expenses = props.expenses.items

    const totalSpent = expenses.reduce((accumulator, expense) => { 
        return accumulator + expense.value
    }, 0)

    return <FormatCurrency>{totalSpent}</FormatCurrency>
})