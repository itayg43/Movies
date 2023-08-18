import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import tokensStorage from '../storage/tokensStorage';
import {
  LoginFormData,
  RegisterFormData,
  LoginRegisterResponseData,
} from '../types';

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  await tokensStorage.setBoth(data.userTokens);

  return data.user;
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    _.omit(registerFormData, ['confirmPassword']),
  );

  await tokensStorage.setBoth(data.userTokens);

  return data.user;
};

const logoutUser = async () => {
  await tokensStorage.clearBoth();
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
