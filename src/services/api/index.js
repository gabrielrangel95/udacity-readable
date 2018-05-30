import axios from 'axios';
const uuidv1 = require('uuid/v1');
const url = 'https://powerful-depths-95152.herokuapp.com/';


const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: uuidv1(),
  },
});

export default api;
