export default class Earning {
    constructor({ title, amount, id, createdAt }){

        let obj = {
            title,
            amount: parseInt(amount),
            id,
            createdAt
        }

        if(!id) delete obj.id
        if(!createdAt) obj.createdAt = new Date().getTime()
        
        return obj
    }
}