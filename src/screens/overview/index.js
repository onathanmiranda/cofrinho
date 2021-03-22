import { connect } from 'react-redux'

import TotalSpent from '../../components/atoms/balance-total-spent'
import TotalEarned from '../../components/atoms/balance-total-earned'
import FormatPercent from '../../components/atoms/format-percent'

const mapStateToProps = (state) => ({
    user:       state.user.data,
    earnings:   state.earnings,
    accounts:   state.accounts,
    expenses:   state.expenses
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)((props) => { 
    return (
        <>
            <h1>Bem-vindo, {props.user.name}</h1>
            <p>Total Gasto no Mês <TotalSpent /></p>
            <p>Total Recebido no Mês <TotalEarned /></p>
            {props.accounts.items.map(account => <p key={account.id}>{account.title} | <FormatPercent>{account.quota}</FormatPercent></p>)}
        </>
    )
})