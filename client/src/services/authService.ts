import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import tokenStorage from '../storage/tokenStorage';
import {LoginFormData} from '../components/LoginForm';
import {RegisterFormData} from '../components/RegisterForm';

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

type LoginRegisterResponseData = User & {
  tokens: UserTokens;
};

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  await Promise.all([
    tokenStorage.set('access', data.tokens.accessToken),
    tokenStorage.set('refresh', data.tokens.refreshToken),
  ]);

  return _.omit(data, ['tokens']);
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    _.omit(registerFormData, ['confirmPassword']),
  );

  await Promise.all([
    tokenStorage.set('access', data.tokens.accessToken),
    tokenStorage.set('refresh', data.tokens.refreshToken),
  ]);

  return _.omit(data, ['tokens']);
};

const logoutUser = async () => {
  await tokenStorage.clear();
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
