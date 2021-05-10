import { connect } from 'react-redux'
import { useState } from 'react'

import Button from '../../atoms/button'

import formatCurrency from '../../../helpers/formatCurrency'

import { deleteEarning } from '../../../store/slices/earnings'

const mapStateToProps = ( state, ownProps ) => {

    const earnings  = state.earnings.items
    const earningID = ownProps.id
    const earning   = earnings.find(( earning ) => earning.id === earningID )

    return({
        earning
    })
}

const mapDispatchToProps = ( dispatchEvent ) => {
    return ({
        deleteEarning: ( args ) => dispatchEvent(deleteEarning( args ))
    })
}

export default connect( mapStateToProps, mapDispatchToProps )(
    function EarningCard( props ){

        const [ isEditing, set_isEditing ] = useState(false)

        const deleteEarning = () => {
            props.deleteEarning( props.earning.id )
        }

        const editEarning = () => {
            set_isEditing(true)
        }

        return (
            <div className={`flex w-full p-8 shadow max-w-610 justify-between`}>
                {!isEditing && <>
                    <div>
                        { props.earning.title }
                    </div>
                    <div>
                        { formatCurrency(props.earning.amount) }
                    </div>
                    <Button type='button' onClick={ editEarning }>
                        EDITAR
                    </Button>
                    <Button type='button' onClick={ deleteEarning }>
                        APAGAR
                    </Button>
                </>}
                {isEditing && <>
                    <>Cu</>
                </>}
            </div>
        )
    }
)