import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';
import tokensStorage from '../storage/tokensStorage';

export enum ApiRoute {
  Auth = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

apiClient.interceptors.request.use(
  async config => {
    const token = await tokensStorage.get('access');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/login' && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const {data} = await apiClient.post<{accessToken: string}>(
            '/auth/reissue-access-token',
            {
              refreshToken: await tokensStorage.get('refresh'),
            },
          );

          await tokensStorage.set('access', data.accessToken);

          return apiClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
