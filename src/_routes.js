import { useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUser } from './store/slices/user'

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = (dispatchEvent) => ({
    getUser: () => dispatchEvent(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {

    useEffect(() => props.getUser(), [])
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {(props.user.request === "pending") && "Carregando..."}
                    {((props.user.request === "idle") && (props.user.data)) && "Usuário criado."}
                    {((props.user.request === "idle") && (!props.user.data)) && "Nenhum usuário cadastrado."}
                </Route>
            </Switch>
        </BrowserRouter>
    )
})