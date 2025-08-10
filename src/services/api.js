import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.10:9002',
  // baseURL: process.env.REACT_APP_BACKEND,
  withCredentials: true,
  timeout: 20000
});

export default api;