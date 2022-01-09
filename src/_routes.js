import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Accounts from './components/screens/accounts'
import Loading  from './components/screens/loading'
import Overview from './components/screens/overview'
import Register from './components/screens/register'
import Login    from './components/screens/login'

export default function Routes(){
    
  const user = useSelector(({ user }) => user )

  const { hasRegisteredOnce } = user
  const isLoading             = user.requesting
  const isNotUser             = !isLoading && !user.data && !hasRegisteredOnce
  const isUnauthenticatedUser = !isLoading && !user.data && hasRegisteredOnce
  const isAuthenticatedUser   = !isLoading && user.data
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {isLoading              && <Loading />}
          {isUnauthenticatedUser  && <Redirect to="/login" />}
          {isNotUser              && <Redirect to="/register" />}
          {isAuthenticatedUser    && <Redirect to="/overview" />}
        </Route>

        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        
        <Route path="/overview" exact>
          {isUnauthenticatedUser  && <Redirect to="/login" />}
          {isNotUser              && <Redirect to="/register" />}
          {isAuthenticatedUser    && <Overview />}
        </Route>

        <Route path="/accounts/:id" exact>
          {isUnauthenticatedUser  && <Redirect to="/login" />}
          {isNotUser              && <Redirect to="/register" />}
          {isAuthenticatedUser    && <Accounts />}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}