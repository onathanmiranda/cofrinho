export default class Expense {
    constructor({ title, amount, id, date, account }){  
         
        let obj = {
            title,
            amount,
            account,
            id,
            date
        }
        
        if(!id) delete obj.id
        
        return obj
    }
}