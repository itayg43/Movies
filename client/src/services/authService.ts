import _ from 'lodash';

import apiClient, {ApiRoute} from '../clients/apiClient';

interface LoginUserResponse {
  id: number;
  email: string;
  createdAt: string;
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
  return _.omit(data, ['tokens']);
};

export default {
  loginUser,
};
