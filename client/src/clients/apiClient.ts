import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';
import tokenStorage from '../storage/tokenStorage';
import {ReissueTokenResponseData} from '../types';

export enum ApiRoute {
  Auth = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

export const setApiClientAuthorizationHeader = (token: string) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeApiClientAuthorizationHeader = () => {
  delete apiClient.defaults.headers.common.Authorization;
};

apiClient.interceptors.response.use(
  res => {
    return res;
  },

  async err => {
    const originalConfig = err.config;

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const token = await reissueUserAccessToken();

        setApiClientAuthorizationHeader(token);

        return apiClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(err);
  },
);

async function reissueUserAccessToken() {
  const {data} = await apiClient.post<ReissueTokenResponseData>(
    `${ApiRoute.Auth}/reissue-access-token`,
    {refreshToken: await tokenStorage.get('refreshToken')},
  );

  return data.accessToken;
}

export default apiClient;
