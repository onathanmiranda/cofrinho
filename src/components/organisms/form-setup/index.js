import { useState } from 'react'
import { connect } from 'react-redux'

import InputText from '../../atoms/input-text'
import Button from '../../atoms/button'

import { postUser } from '../../../store/slices/user'

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatchEvent) => ({
    postUser: (args) => dispatchEvent(postUser(args))
})

export default connect(mapStateToProps, mapDispatchToProps)((props) => {

    const [ name, set_name ] = useState("")
    
    const onChange = (e) => set_name(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault()

        if(Boolean(name)) {
            Promise
            .all([ props.postUser({ name }) ])
            .then(() => { 
                if(props.onSubmit) props.onSubmit() 
            })
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Como você gostaria de ser chamado?</label>
                <InputText name="name" value={name} onChange={onChange} />
                <Button type="submit">Salvar</Button>
            </form>
        </>
    )
})