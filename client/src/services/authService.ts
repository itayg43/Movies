import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import userStorage from '../storage/userStorage';
import tokensStorage from '../storage/tokensStorage';
import {
  LoginFormData,
  RegisterFormData,
  LoginRegisterResponseData,
  ReissueTokenResponseData,
} from '../types';

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  await Promise.all([
    userStorage.set(data.user),
    tokensStorage.setBoth(data.userTokens),
  ]);

  return data.user;
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    _.omit(registerFormData, ['confirmPassword']),
  );

  await Promise.all([
    userStorage.set(data.user),
    tokensStorage.setBoth(data.userTokens),
  ]);

  return data.user;
};

const logoutUser = async () => {
  await Promise.all([userStorage.remove(), tokensStorage.clearBoth()]);
};

const reissueUserAccessToken = async () => {
  const {data} = await apiClient.post<ReissueTokenResponseData>(
    `${ApiRoute.Auth}/reissue-access-token`,
    {
      refreshToken: await tokensStorage.get('refreshToken'),
    },
  );

  await tokensStorage.set('accessToken', data.accessToken);
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  reissueUserAccessToken,
};
