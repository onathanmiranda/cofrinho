import { connect } from 'react-redux'

import FormatCurrency from '../format-currency'

const mapDispatchToProps = null

const mapStateToProps = (state) => {

    const { earnings } = state
    
    return ({ earnings })
}

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const earnings = props.earnings.items

    const totalSpent = earnings.reduce((accumulator, expense) => { 
        return accumulator + expense.value
    }, 0)
    
    return <FormatCurrency>{totalSpent}</FormatCurrency>
})