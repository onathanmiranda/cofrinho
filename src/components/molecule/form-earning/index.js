import { useState } from 'react'
import { connect } from 'react-redux'

import { createEarning } from '../../../store/slices/earnings'

import InputText    from '../../atoms/input-text'
import InputAmount  from '../../atoms/input-amount'
import Button       from '../../atoms/button'

const mapStateToProps = null

const mapDispatchToProps = ( dispatchEvent ) => ({
    createEarning: (args) => dispatchEvent(createEarning(args))
})

export default connect( mapStateToProps, mapDispatchToProps )(

    function FormEarning(props){

        const [ title, set_title ]      = useState(props.title || "")
        const [ amount, set_amount ]    = useState(props.amount || "")

        const onSubmit = (e) => {
            e.preventDefault()

            props.createEarning({ title, amount })

            set_title("")
            set_amount("")

            if(props.onSubmit) props.onSubmit()
        }

        return (
            <form onSubmit={onSubmit} className={`p-13 bg-gray-200`}>
                <div className={`p-13`}>
                    <label htmlFor="title">Título</label>
                    <InputText placeholder="Salário" name="title" value={title} onChange={(e) => set_title(e.target.value)} />
                </div>
                <div className={`p-13`}>
                    <InputAmount placeholder="R$ 1.500,00" name="amount" value={amount} onChange={set_amount} />
                </div>
                <Button type="submit">Adicionar</Button>
            </form>
        )
    }
)