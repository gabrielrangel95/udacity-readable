import axios from 'axios';

const url = 'http://localhost:8080/';

const api = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: 'UdacityIsAwesome',
  },
});

export default api;
