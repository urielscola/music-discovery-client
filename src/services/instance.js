import axios from 'axios';

const instance = axios.create();
export const defaultHeaders = () => ({
  'Content-Type': 'application/json'
});

export default instance;
