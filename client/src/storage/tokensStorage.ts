import EncryptedStorage from 'react-native-encrypted-storage';

import {UserTokens, UserTokenType} from '../types';

const set = async (type: UserTokenType, value: string) => {
  await EncryptedStorage.setItem(type, value);
};

const setBoth = async (values: UserTokens) => {
  await Promise.all([
    set('accessToken', values.accessToken),
    set('refreshToken', values.refreshToken),
  ]);
};

const get = async (type: UserTokenType) => {
  return await EncryptedStorage.getItem(type);
};

const clearBoth = async () => {
  await EncryptedStorage.clear();
};

export default {
  set,
  setBoth,
  get,
  clearBoth,
};
