import axios from 'axios';

import {BACKEND_BASE_URL} from '@env';
import tokenStorage from '../storage/tokenStorage';
import {ReissueAccessTokenResponseData} from '../types';
import authActions from '../redux/auth/authActions';

export enum ApiRoute {
  Auth = '/auth',
}

const apiClient = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
});

let dispatch: any;
export const injectStoreDispatch = (_dispatch: any) => {
  dispatch = _dispatch;
};

apiClient.interceptors.request.use(
  async config => {
    const token = await tokenStorage.get('accessToken');

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

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const token = await reissueUserAccessToken();

        await tokenStorage.set('accessToken', token);

        return apiClient(originalConfig);
      } catch (error) {
        dispatch(authActions.logoutUser());
      }
    }

    return Promise.reject(err);
  },
);

async function reissueUserAccessToken() {
  const {data} = await axios.post<ReissueAccessTokenResponseData>(
    `${BACKEND_BASE_URL}/api/auth/reissue-access-token`,
    {refreshToken: await tokenStorage.get('refreshToken')},
  );

  return data.accessToken;
}

export default apiClient;
