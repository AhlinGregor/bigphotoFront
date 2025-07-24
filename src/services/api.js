import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://88.200.63.148:9002',
  baseURL: process.env.REACT_APP_BACKEND,
  withCredentials: true,
  timeout: 20000
});

export default api;