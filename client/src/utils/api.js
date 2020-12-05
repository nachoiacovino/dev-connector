import axios from 'axios';

import { store } from '../redux/store';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  config.headers['x-auth-token'] = token;

  return config;
});

export default api;
