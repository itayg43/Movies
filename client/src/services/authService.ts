import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import tokensStorage from '../storage/tokensStorage';
import {LoginFormData, RegisterFormData, User, UserTokens} from '../types';

type LoginRegisterResponseData = User & {
  tokens: UserTokens;
};

const loginUser = async (loginFormData: LoginFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    loginFormData,
  );

  await tokensStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

const registerUser = async (registerFormData: RegisterFormData) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    _.omit(registerFormData, ['confirmPassword']),
  );

  await tokensStorage.setBoth(data.tokens);

  return _.omit(data, ['tokens']);
};

export default {
  loginUser,
  registerUser,
};
