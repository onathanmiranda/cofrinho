export default class Timeline {
    constructor(timestamp){
        
        timestamp = timestamp ? timestamp : new Date().getTime()
        const date  = new Date(timestamp)

        const day   = date.getDay()
        const year  = date.getFullYear()
        const month = {}
            month.id        = date.getMonth()
            month.firstDay  = new Date(year, month.id, 1)
            month.lastDay   = new Date(year, month.id + 1, 0)
            month.name      = date.toLocaleString('default', { month: 'long' })
    
        return ({
            day,
            month,
            year,
            timestamp
        })
    }
}