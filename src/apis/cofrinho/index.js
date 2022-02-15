import axios from "axios";

function Cofrinho({ host = process.env.REACT_APP_BACKEND_URL } = {}) {
  const endpoints = {
    register: "/register",
    login: "/login",
    accounts: "/accounts",
  };

  const client = axios.create({
    baseURL: host,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = {
    post: (data) => {
      return client
        .post(endpoints.register, data)
        .then((data) => {
          return Promise.resolve(data);
        })
        .catch((error) => {
          return Promise.reject({
            message: error.response.data.message,
            status: error.response.status,
          });
        });
    },
    login: (data) => {
      return client
        .post(endpoints.login, data)
        .then((data) => {
          return Promise.resolve(data);
        })
        .catch((error) => {
          return Promise.reject({
            message: error.response.data.message,
            status: error.response.status,
          });
        });
    },
  };

  const accounts = {
    getAll: ({ token }) => {
      return client
        .get(endpoints.accounts, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          return Promise.resolve(data);
        })
        .catch((error) => {
          return Promise.reject({
            message: error.response.data.message,
            status: error.response.status,
          });
        });
    },
  };

  return {
    accounts,
    user,
  };
}

const CofrinhoClient = Cofrinho();

export default CofrinhoClient;

export { Cofrinho };
