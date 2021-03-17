export default class Account {
    constructor({ title, quota, id }){   

        let obj = {
            title,
            quota,
            id
        }

        if(!id) delete obj.id
        
        return obj
    }
}