import axios from 'axios';
import { storage } from 'utils';

const instance = axios.create();
export const defaultHeaders = () => ({
  'Content-Type': 'application/json'
});

instance.interceptors.response.use(
  res => (res.data ? res.data : res),
  err => {
    const status = ((err || {}).response || {}).status || null;
    if (status === 401 || status === 403) {
      storage.removeItem('token');
      window.location.replace('/login');
    }
    return Promise.reject(err);
  }
);

instance.interceptors.request.use(
  pConfig => {
    const config = pConfig;
    const session = storage.getItem('token');
    if (session) {
      const { jwt } = session;
      if (!jwt) return Promise.reject();
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

export default instance;
