import _ from 'lodash';

import apiClient, {apiReissueClient} from '../clients/apiClient';
import {
  LoginFormData,
  RegisterFormData,
  LoginUserResponseData,
  RegisterUserResponseData,
  ReissueUserAccessTokenResponseData,
} from '../types';
import tokenStorage from '../storage/tokenStorage';

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginUserResponseData>(
    '/auth/login',
    loginFormData,
  );

  await tokenStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<RegisterUserResponseData>(
    '/auth/register',
    registerFormData,
  );

  await tokenStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

const logoutUser = async () => {
  await tokenStorage.remove();
};

const reissueUserAccessToken = async () => {
  const {data} =
    await apiReissueClient.post<ReissueUserAccessTokenResponseData>(
      '/auth/reissue-access-token',
      {refreshToken: await tokenStorage.get('refreshToken')},
    );

  await tokenStorage.set('accessToken', data.accessToken);
};

const getUserAccessToken = async () => {
  return await tokenStorage.get('accessToken');
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  reissueUserAccessToken,
  getUserAccessToken,
};
