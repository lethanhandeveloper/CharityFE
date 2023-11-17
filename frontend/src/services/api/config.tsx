import axios from 'axios';
const token = localStorage.getItem('token');
const apiService = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
});
apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
apiService.defaults.timeout = 2500;
apiService.defaults.headers['Access-Control-Allow-Origin'] = '*';
apiService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // navigate('/login');
      console.log('');
    }
    return Promise.reject(error);
  },
);
export default apiService;
