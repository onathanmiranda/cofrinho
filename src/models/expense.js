export default class Expense {
  constructor({ title, amount, id, createdAt, account }){  
    let obj = {
      title,
      amount,
      account,
      id,
      createdAt
    }

    if(!id) delete obj.id
    if(!createdAt) obj.createdAt = new Date().getTime()
    
    return obj
  }
}