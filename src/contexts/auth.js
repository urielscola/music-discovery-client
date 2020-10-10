import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from 'utils';
import { withRouter } from 'react-router-dom';
import { API } from 'services';

const AuthContext = createContext({});
const useAuthContext = () => useContext(AuthContext);

const AuthProvider = withRouter(({ children, history }) => {
  const [user, setUser] = useState('');

  const login = async ({ jwt }) => {
    storage.setItem('token', { jwt });
    const response = await API.getUser();
    setUser(response);
    history.push('/');
  };

  const logout = () => {
    storage.removeItem('token');
    if (window.location.pathname !== '/login') history.push('/login');
  };

  useEffect(() => {
    const session = storage.getItem('token');
    if (session) login({ jwt: session.jwt });
    // if (window.location.pathname === '/login') window.location.replace('/');
  }, []);

  const value = {
    login,
    logout,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export { AuthProvider, AuthContext, useAuthContext };
