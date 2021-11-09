export default class Account {
    constructor({ title, quota, id, createdAt }){
      
      function missingArgErrorMessage(missing){ 
        return `Missing ${missing} on Account creation`
      }
      
      if(!title) throw new Error( missingArgErrorMessage('title') );
      if(!quota) throw new Error( missingArgErrorMessage('quota') );

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