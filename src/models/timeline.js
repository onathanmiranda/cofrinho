export default class Timeline {
  constructor(timestamp = new Date().getTime()){

    function generateMonthData(date){
      const _timestamp = date.getTime()

      const day   = date.getDate()
      const year  = date.getFullYear()

      const month = {}
            month.id        = date.getMonth()
            month.firstDay  = new Date(year, month.id, 1, 0, 0, 0, 0).getTime()
            month.lastDay   = new Date(year, month.id + 1, 0, 23, 59, 59, 999).getTime()
            month.name      = date.toLocaleString('default', { month: 'long' })
      
      return ({ 
        day,
        month,
        year,
        timestamp: _timestamp
      })
    }

    const currentDate = new Date( timestamp )
    const current = generateMonthData( currentDate )

    currentDate.setDate(0)
    const previous = generateMonthData( currentDate )
    
    const currentDateMonth = currentDate.getMonth()
    currentDate.setMonth( currentDateMonth + 2 )
    const next = generateMonthData( currentDate )

    const returnValue = {
      current,
      next,
      previous
    }

    return returnValue
  }
}