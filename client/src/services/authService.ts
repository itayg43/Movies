import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import tokenStorage from '../storage/tokenStorage';

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

const loginUser = async (email: string, password: string) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/login`,
    {
      email,
      password,
    },
  );

  await Promise.all([
    tokenStorage.set('access', data.tokens.accessToken),
    tokenStorage.set('refresh', data.tokens.refreshToken),
  ]);

  return _.omit(data, ['tokens']);
};

const registerUser = async (name: string, email: string, password: string) => {
  const {data} = await apiClient.post<LoginRegisterResponseData>(
    `${ApiRoute.Auth}/register`,
    {
      name,
      email,
      password,
    },
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
