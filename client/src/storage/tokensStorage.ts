import EncryptedStorage from 'react-native-encrypted-storage';

import {UserTokens} from '../types';

type Key = 'accessToken' | 'refreshToken';

const set = async (key: Key, value: string) => {
  await EncryptedStorage.setItem(key, value);
};

const setBoth = async (values: UserTokens) => {
  await Promise.all([
    set('accessToken', values.accessToken),
    set('refreshToken', values.refreshToken),
  ]);
};

const get = async (key: Key) => {
  return await EncryptedStorage.getItem(key);
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
