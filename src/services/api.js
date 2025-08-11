import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  withCredentials: true,
  timeout: 20000
});

export default api;