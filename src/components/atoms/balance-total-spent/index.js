import { connect } from 'react-redux'

const mapDispatchToProps = null

const mapStateToProps = (state) => {

    const { timeline, expenses } = state
    
    return ({
        timeline,
        expenses
    })
}

export default connect(mapStateToProps, mapDispatchToProps)((props) => {
    const expenses = props.expenses.items
    const currentMonth = new Date(props.timeline.current).getMonth()
    const monthExpenses = expenses.filter((expense) => true)
    return <span>{currentMonth}</span>
})