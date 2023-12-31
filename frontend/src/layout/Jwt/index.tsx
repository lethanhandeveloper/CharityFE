import apiService from '@services/api/config';
import { useAppDispatch } from '@store/hook';
import { setInfoAlert } from '@store/redux/alert';
import { useState } from 'react';

interface JWTProviderProps {
  children: React.ReactNode;
}
const JWTProvider = (props: JWTProviderProps) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  apiService.interceptors.request.use(
    (config) => {
      setLoading(true);
      const token = localStorage.getItem('token');
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
        localStorage.removeItem('token');
        dispatch(setInfoAlert({ open: true, title: 'Yêu cầu đăng nhập', type: 'error' }));
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
