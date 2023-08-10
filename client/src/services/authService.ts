import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';
import tokenStorage from '../storage/tokenStorage';

interface LoginUserResponse {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

const loginUser = async (email: string, password: string) => {
  const {data} = await apiClient.post<LoginUserResponse>(
    `${ApiRoute.AUTH}/login`,
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

export default {
  loginUser,
};
