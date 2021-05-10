import { connect } from 'react-redux'

import FormatPercent from '../../atoms/format-percent'
import formatCurrency from '../../../helpers/formatCurrency'

const mapStateToProps = ( state, ownProps ) => {

    const accounts  = state.accounts.items
    const accountID = ownProps.id
    const account   = accounts.find(( account ) => account.id === accountID )

    const { totalEarned }   = state.earnings
    const accountQuota      = account.quota
    const accountBudget     = totalEarned * accountQuota

    return ({
        account,
        accountBudget
    })
}

const mapDispatchToProps = null 

export default connect( mapStateToProps, mapDispatchToProps )(({ account, accountBudget }) => {
    
    const { title, quota, id } = account

    return (
        <a className={`flex w-full p-8 shadow max-w-610`} href={`accounts/${id}`}>
            <div>
                <FormatPercent>
                    {quota}
                </FormatPercent>
            </div>
            <div>
                <h3>{title}</h3>
                <p>{formatCurrency( accountBudget )}</p>
            </div>
        </a>
    )
})