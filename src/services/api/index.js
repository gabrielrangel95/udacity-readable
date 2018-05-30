import axios from 'axios';
const url = 'https://powerful-depths-95152.herokuapp.com/';

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: token,
  },
});

export default api;
