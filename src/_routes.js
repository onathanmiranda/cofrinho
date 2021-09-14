import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Accounts from './components/screens/accounts'
import Loading  from './components/screens/loading'
import Overview from './components/screens/overview'
import Setup    from './components/screens/setup'

export default function Routes(props){
    
  const user = useSelector(({ user }) => user )

  const is_loading  = user.requesting
  const is_new_user = !is_loading && !user.data
  const is_old_user = !is_loading && user.data
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {is_loading   && <Loading />}
          {is_new_user  && <Redirect to="/setup" />}
          {is_old_user  && <Redirect to="/overview" />}
        </Route>

        <Route path="/setup" exact component={Setup} />
        
        <Route path="/overview" exact>
          {is_new_user  && <Redirect to="/setup" />}
          {is_old_user  && <Overview />}
        </Route>

        <Route path="/accounts/:id" exact>
          {is_new_user && <Redirect to="/setup" />}
          {is_old_user && <Accounts />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}