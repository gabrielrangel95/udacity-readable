import axios from 'axios';

const url = 'https://powerful-depths-95152.herokuapp.com/';

const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: '-93824u2bnf349uh34-b34ubn',
  },
});

export default api;
