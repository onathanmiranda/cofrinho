export default class Account {
    constructor({ title, quota, id, createdAt }){   

        let obj = {
            title,
            quota,
            id,
            createdAt
        }

        if(!id) delete obj.id
        if(!createdAt) obj.createdAt = new Date().getTime()
        
        return obj
    }
}