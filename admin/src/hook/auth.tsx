import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router';

const AuthContext = createContext<any>('');
export const AuthProvider = (children: React.ReactNode) => {
  const user = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  const logIn = async (data: string) => {
    localStorage.setItem('userInfo', data);
  };
  const logOut = async () => {
    localStorage.removeItem('userInfo');
    navigate('/', { replace: true });
  };

  const value = useMemo(() => ({ user, logIn, logOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};
