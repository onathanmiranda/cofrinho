export default class Expense {
    constructor({ title, amount, id, date, account }){   
        return({
            title,
            amount,
            account,
            id,
            date
        })
    }
}