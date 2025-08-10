import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:9002',
  // baseURL: process.env.REACT_APP_BACKEND,
  withCredentials: true,
  timeout: 20000
});

export default api;