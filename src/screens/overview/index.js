import { connect } from 'react-redux'

import TotalSpent from '../../components/atoms/balance-total-spent'

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
            <p>Mês <TotalSpent /></p>
            {props.accounts.items.map(account => <p key={account.id}>{account.title} | {account.quota}</p>)}
        </>
    )
})