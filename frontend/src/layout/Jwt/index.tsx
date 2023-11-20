import apiService from '@services/api/config';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface JWTProviderProps {
  children: React.ReactNode;
}
const JWTProvider = (props: JWTProviderProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  apiService.interceptors.request.use(
    (config) => {
      setLoading(true);
      const token = localStorage.getItem('token');
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers['Access-Control-Allow-Origin'] = '*';

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
        navigate('/login');
      }
      return Promise.reject(error);
    },
  );
  return (
    <>
      {isLoading && <p>zxcxzcz</p>}
      {props.children}
    </>
  );
};
export default JWTProvider;
