import EncryptedStorage from 'react-native-encrypted-storage';

type TokenKey = 'access' | 'refresh';

const set = async (key: TokenKey, value: string) => {
  await EncryptedStorage.setItem(key, value);
};

const get = async (key: TokenKey) => {
  return await EncryptedStorage.getItem(key);
};

const clear = async () => {
  await EncryptedStorage.clear();
};

export default {
  set,
  get,
  clear,
};
