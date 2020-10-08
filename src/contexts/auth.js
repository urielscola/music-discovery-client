import React, { createContext, useContext, useState } from 'react';
import { storage } from 'utils';

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const login = ({ jwt }) => {
    storage.setItem('token', { jwt });
  };

  const logout = () => {
    storage.removeItem('token');
    if (window.location.pathname !== '/login')
      window.location.replace('/login');
  };

  const value = {
    login,
    logout,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext, useAuthContext };
