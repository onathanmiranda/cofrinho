import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loading  from './screens/loading'
import Overview from './screens/overview'
import Setup    from './screens/setup'


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
      </Switch>
    </BrowserRouter>
  )
}