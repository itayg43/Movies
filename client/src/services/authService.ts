import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import {
  LoginFormData,
  RegisterFormData,
  LoginRegisterResponseData,
} from '../types';
import tokenStorage from '../storage/tokenStorage';

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  await tokenStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    registerFormData,
  );

  await tokenStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

const logoutUser = async () => {
  await tokenStorage.remove();
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
