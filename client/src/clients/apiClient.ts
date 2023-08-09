import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';
import tokenStorage from '../storage/tokenStorage';

export enum ApiRoute {
  AUTH = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

apiClient.interceptors.request.use(
  config => {
    const token = tokenStorage.get('access');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default apiClient;
