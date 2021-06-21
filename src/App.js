import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'

import store            from './store'
import { getUser }      from './store/slices/user'
import { getAccounts }  from './store/slices/accounts'
import { getEarnings }  from './store/slices/earnings'
import { getExpenses }  from './store/slices/expenses'

import Routes from './_routes'

function AppContainer(){

  const dispatchEvent = useDispatch()

  useEffect(() => {
    dispatchEvent(getUser())
    dispatchEvent(getAccounts())
    dispatchEvent(getEarnings())
    dispatchEvent(getExpenses())
  }, [ dispatchEvent ])

  return (
    <Routes />
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App