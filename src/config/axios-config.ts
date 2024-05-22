import axios from 'axios';
import { APP_CONFIG } from './app-config';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN, deleteAllKeys, getKey, setKey } from '@store/MMKV';
import { rootNavigationRef } from '@utils/navigationUtils';

const publicAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authAxios = axios.create({
  baseURL: `${APP_CONFIG.BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getKey(USER_ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getKey(USER_REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const response = await axios.post(`${APP_CONFIG.BASE_URL}${APP_CONFIG.REFRESH_TOKEN_API}`, { refreshToken });
          const newAccessToken = response.data.accessToken;
          setKey(USER_ACCESS_TOKEN, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // LOGOUT
          deleteAllKeys();
          rootNavigationRef.navigate('Login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export {
  authAxios,
  publicAxios,
};