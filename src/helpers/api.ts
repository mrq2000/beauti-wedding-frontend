import axios from 'axios';
import { setToken as setTokenStorage, getToken as getTokenStorage, getRefreshToken, setRefreshToken } from './storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || `${window.location.protocol}//${window.location.host}/api`,
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const getNewToken = async () => {
  const response = await api.post('/auth/refresh', {
    refresh: getRefreshToken(),
  });

  return response.data;
};

let countRefreshRequest = 0;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      countRefreshRequest <= 3 &&
      error.response.status === 401 &&
      getRefreshToken() &&
      error.response.data?.message != 'refreshtoken.invalid'
    ) {
      countRefreshRequest++;
      const data = await getNewToken();
      const token = data?.accessToken?.token;
      setToken(token);
      error.config.headers['Authorization'] = `Bearer ${token}`;
      return api.request(error.config);
    }

    countRefreshRequest = 0;
    return Promise.reject(error);
  },
);

const set = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export function setToken(token: string) {
  setTokenStorage(token);
  set(token);
}

export const clearToken = () => {
  setToken('');
  setRefreshToken('');
};

set(getTokenStorage());
