import { useState } from "react"
import { Redirect, withRouter } from "react-router-dom"

import FormSetup from "../../components/organisms/form-setup"

export default withRouter((props) => {
    
    const [ registered, set_registered ] = useState(false)
    
    const onSubmit = () => set_registered(true)

    if(!registered) {
        return (
            <>
                <h1>Parece que é a primeira vez que você acessa desse dispositivo.</h1>
                <h2>Vamos começar a organizar suas finanças.</h2>
                <FormSetup onSubmit={onSubmit} />
            </>
        )
    } else {
        return <Redirect to="/" />
    }
})