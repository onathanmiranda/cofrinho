export default class Earning {
    constructor({ title, amount, id, date }){

        let obj = {
            title,
            amount,
            id,
            date
        }

        if(!id) delete obj.id
        
        return obj
    }
}