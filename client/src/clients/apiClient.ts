import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';
import authService from '../services/authService';
import {ReissueTokenResponseData} from '../types';

export enum ApiRoute {
  Auth = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

// interceptors

// request
apiClient.interceptors.request.use(
  async config => {
    const token = await authService.getUserToken('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  },
);

// response
apiClient.interceptors.response.use(
  res => {
    return res;
  },

  async err => {
    const originalConfig = err.config;

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const {data} = await apiClient.post<ReissueTokenResponseData>(
          '/auth/reissue-access-token',
          {
            refreshToken: await authService.getUserToken('refreshToken'),
          },
        );

        await authService.setUserToken('accessToken', data.accessToken);

        return apiClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
