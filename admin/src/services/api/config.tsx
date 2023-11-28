import axios from 'axios';
const apiService = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
});

export default apiService;
