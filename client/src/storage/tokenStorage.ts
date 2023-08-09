import EncryptedStorage from 'react-native-encrypted-storage';

const set = async (key: 'access' | 'refresh', value: string) => {
  await EncryptedStorage.setItem(key, value);
};

const get = async (key: 'access' | 'refresh') => {
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
