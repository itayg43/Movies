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
import refreshTokenStorage from '../storage/refreshTokenStorage';
import userStorage from '../storage/userStorage';

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  const {tokens} = data;
  await refreshTokenStorage.set(tokens.refreshToken);
  setApiClientAuthorizationHeader(tokens.accessToken);

  const user = _.omit(data, ['tokens']);
  // await userStorage.set(user);

  return user;
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    registerFormData,
  );

  const {tokens} = data;
  await refreshTokenStorage.set(tokens.refreshToken);
  setApiClientAuthorizationHeader(tokens.accessToken);

  const user = _.omit(data, ['tokens']);
  // await userStorage.set(user);

  return user;
};

const logoutUser = async () => {
  await refreshTokenStorage.remove();
  removeApiClientAuthorizationHeader();
  // await userStorage.remove();
};

export default {
  loginUser,
  registerUser,
  logoutUser,
};
