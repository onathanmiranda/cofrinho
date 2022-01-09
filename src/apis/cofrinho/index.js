import axios from 'axios';

class Cofrinho {
  constructor({ host = process.env.REACT_APP_BACKEND_URL } = {}) {
    this.host = host;
    this.register = '/register'
    this.login = '/login'
    this.http = axios.create({
      baseURL: this.host,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.user = {
      post: (data) => {
        return (
          this.http.post(this.register, data)
          .then(( data ) => {
            return Promise.resolve(data)
          })
          .catch(( error ) => {
            return Promise.reject({
              message: error.response.data.message,
              status: error.response.status
            })
          })
        )
      },
      login: (data) => {
        return (
          this.http.post(this.login, data)
          .then(( data ) => {
            return Promise.resolve(data)
          })
          .catch(( error ) => {
            console.log('onCofrinho', error.response)
            return Promise.reject({
              message: error.response.data.message,
              status: error.response.status
            })
          })
        )
      }
    }
  }
}

export default new Cofrinho()

export {
  Cofrinho
}