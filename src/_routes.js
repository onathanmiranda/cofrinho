import { useEffect } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading  from './screens/loading'
import Overview from './screens/overview'
import Setup    from './screens/setup'

import { getUser }      from './store/slices/user'
import { getAccounts }  from './store/slices/accounts'
import { getEarnings }  from './store/slices/earnings'
import { getExpenses }  from './store/slices/expenses'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatchEvent) => ({
    getUser: () => dispatchEvent(getUser()),
    getAccounts: () => dispatchEvent(getAccounts()),
    getEarnings: () => dispatchEvent(getEarnings()),
    getExpenses: () => dispatchEvent(getExpenses())
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    
    const { getUser, getAccounts, getEarnings, getExpenses } = props
    
    useEffect(() => {
        getUser()
        getAccounts()
        getEarnings()
        getExpenses()
    }, [ getUser, getAccounts, getEarnings, getExpenses ])

    const is_loading  = props.user.requesting
    const is_new_user = !is_loading && !props.user.data
    const is_old_user = !is_loading && props.user.data
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {is_loading   && <Loading />}
                    {is_new_user  && <Redirect to="/setup" />}
                    {is_old_user  && <Redirect to="/overview" />}
                </Route>
                <Route path="/setup"    exact component={Setup} />
                <Route path="/overview" exact>
                    {is_new_user  && <Redirect to="/setup" />}
                    {is_old_user  && <Overview />}
                </Route>
            </Switch>
        </BrowserRouter>
    )
})