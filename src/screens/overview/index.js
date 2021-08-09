import { connect } from 'react-redux'

import TotalSpent   from '../../components/atoms/balance-total-spent'
import AccountCard  from '../../components/molecule/card-account'
import EarningCard  from '../../components/molecule/card-earnings'
import FormEarning  from '../../components/molecule/form-earning-create'
import Timeline     from '../../components/organism/timeline'
import FloatingCreateExpense from '../../components/organism/floating-create-expense'

import formatCurrency from '../../helpers/formatCurrency'

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

  const earnings = props.earnings.items
  
  return (
    <>
      <h1>Bem-vindo, {props.user.name}</h1>

      <p><TotalSpent /></p>
      <p>Total Recebido no Mês {formatCurrency( totalEarned )}</p>

      {accounts.map((account) => (
          <AccountCard id={account.id} key={account.id} />
      ))}
      
      <FormEarning />
      <p>Total Gasto no Mês <TotalSpent /></p>
      
      {earnings.map((earning) => (
          <EarningCard id={ earning.id } key={ earning.id } />
      ))}

      <Timeline />

      <FloatingCreateExpense />
    </>
  )
})