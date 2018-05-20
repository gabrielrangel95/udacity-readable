import axios from 'axios';

const url = 'http://localhost:8080/';

const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: '-93824u2bnf349uh34-b34ubn',
  },
});

export default api;
