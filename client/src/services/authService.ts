import _ from 'lodash';

import apiClient, {
  ApiRoute,
  setApiClientAuthorizationHeader,
  removeApiClientAuthorizationHeader,
} from '../clients/apiClient';
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

  const {tokens} = data;
  await tokenStorage.setBoth(tokens);
  setApiClientAuthorizationHeader(tokens.accessToken);

  return _.omit(data, ['tokens']);
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    registerFormData,
  );

  const {tokens} = data;
  await tokenStorage.setBoth(tokens);
  setApiClientAuthorizationHeader(tokens.accessToken);

  return _.omit(data, ['tokens']);
};

const logoutUser = async () => {
  await tokenStorage.remove();
  removeApiClientAuthorizationHeader();
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
