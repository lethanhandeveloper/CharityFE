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
      const token = localStorage.getItem('tokenAdmin');
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Accept'] = '*/*';
      config.headers['Content-Type'] = 'application/json';
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
        localStorage.removeItem('tokenAdmin');
        navigate('/login');
      }
      return Promise.reject(error);
    },
  );
  return (
    <>
      {isLoading && <></>}
      {props.children}
    </>
  );
};
export default JWTProvider;
