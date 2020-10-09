import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from 'utils';
import { API } from 'services';

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const login = async ({ jwt }) => {
    storage.setItem('token', { jwt });
    const response = await API.getUser();
    setUser(response);
  };

  const logout = () => {
    storage.removeItem('token');
    if (window.location.pathname !== '/login')
      window.location.replace('/login');
  };

  useEffect(() => {
    const session = storage.getItem('token');
    if (session) login({ jwt: session.jwt });
  }, []);

  const value = {
    login,
    logout,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, useAuthContext };
