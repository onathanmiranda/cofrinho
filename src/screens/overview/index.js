import { connect } from 'react-redux'

import EarningCard  from '../../components/molecule/card-earnings'
import FormEarning  from '../../components/molecule/form-earning-create'
import Timeline     from '../../components/organism/timeline'
import Summary      from '../../components/organism/summary'
import FloatingCreateExpense from '../../components/organism/floating-create-expense'
import AccountsCarousel from '../../components/organism/carousel-accounts'

const mapStateToProps = (state) => ({
    user:       state.user.data,
    earnings:   state.earnings
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)((props) => { 

  const earnings = props.earnings.items
  
  return (
    <>
      <h1>Bem-vindo, {props.user.name}</h1>

      <Summary />

      <AccountsCarousel />
      
      <FormEarning />
      
      {earnings.map((earning) => (
          <EarningCard id={ earning.id } key={ earning.id } />
      ))}

      <Timeline />

      <FloatingCreateExpense />
    </>
  )
})