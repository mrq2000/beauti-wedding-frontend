import axios from 'axios';
import { setToken as setTokenStorage, getToken as getTokenStorage } from './storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || `${window.location.protocol}//${window.location.host}/api`,
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const set = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  api.defaults.headers.common.current_design_id = window.location.pathname.split('/')[2];
};

export function setToken(token: string) {
  setTokenStorage(token);
  set(token);
}

export const clearToken = () => {
  setToken('');
};

set(getTokenStorage());
