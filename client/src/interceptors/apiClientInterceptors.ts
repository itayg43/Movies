import apiClient from '../clients/apiClient';
import authActions from '../redux/auth/authActions';
import authService from '../services/authService';
import {AppDispatch} from '../redux/store';

const setup = (dispatch: AppDispatch) => {
  apiClient.interceptors.request.use(
    async config => {
      const token = await authService.getUserAccessToken();

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
          await authService.reissueUserAccessToken();

          return apiClient(originalConfig);
        } catch (error) {
          dispatch(authActions.logoutUser());
        }
      }

      return Promise.reject(err);
    },
  );
};

export default {
  setup,
};
