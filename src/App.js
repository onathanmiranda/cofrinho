import { Provider } from 'react-redux'
import store from './store'

import Routes from './_routes'

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

export default App