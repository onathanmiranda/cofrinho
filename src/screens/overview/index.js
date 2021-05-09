import { connect } from 'react-redux'

import TotalSpent from '../../components/atoms/balance-total-spent'
import FormatCurrency from '../../components/atoms/format-currency'
import AccountCard from '../../components/molecule/card-account'

const mapStateToProps = (state) => ({
    user:       state.user.data,
    earnings:   state.earnings,
    accounts:   state.accounts,
    expenses:   state.expenses
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)((props) => { 

    const accounts = props.accounts.items
    const { totalEarned } = props.earnings
    
    return (
        <>
            <h1>Bem-vindo, {props.user.name}</h1>

            {accounts.map((account) => (
                <AccountCard id={account.id} key={account.id} />
            ))}

            <p>Total Gasto no Mês <TotalSpent /></p>
            <p>Total Recebido no Mês <FormatCurrency>{totalEarned}</FormatCurrency></p>
        </>
    )
})