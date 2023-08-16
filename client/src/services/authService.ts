import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import userStorage from '../storage/userStorage';
import tokensStorage from '../storage/tokensStorage';
import {LoginFormData, RegisterFormData, User, UserTokens} from '../types';

type LoginRegisterResponseData = {
  user: User;
  userTokens: UserTokens;
};

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

export default {
  loginUser,
  registerUser,
  logoutUser,
};
