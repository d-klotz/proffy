import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.201:3333'
});

export default api;