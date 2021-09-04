import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import store            from './store'
import { getUser }      from './store/slices/user'
import { getAccounts }  from './store/slices/accounts'
import { getEarnings }  from './store/slices/earnings'
import { getExpenses }  from './store/slices/expenses'
import { getLeftOvers } from './store/slices/leftovers'

import Routes from './_routes'

function AppContainer(){

  const dispatchEvent = useDispatch()

  const timeline = useSelector(({ timeline }) => timeline)

  useEffect(() => {
    dispatchEvent(getUser())
  }, [ dispatchEvent ])

  useEffect(() => {
    dispatchEvent(getAccounts())
    dispatchEvent(getEarnings())
    dispatchEvent(getExpenses())
    dispatchEvent(getLeftOvers())
  }, [ dispatchEvent, timeline ])

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