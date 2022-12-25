export const USER_TOKEN = 'USER_TOKEN';
export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';

export const setItem = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value === null ? '' : value;
};

export const setCookieItem = (key: string, value: string, exdays: number) => {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = key + '=' + value + ';' + expires + ';path=/';
};

export const getCoookieItem = (key: string) => {
  const name = key + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const setToken = (value: string) => {
  setItem(USER_TOKEN, value);
};

export const setRefreshToken = (value: string) => {
  setItem(USER_REFRESH_TOKEN, value);
};

export const getToken = () => getItem(USER_TOKEN);
export const getRefreshToken = () => getItem(USER_REFRESH_TOKEN);
