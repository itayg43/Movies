import EncryptedStorage from 'react-native-encrypted-storage';

const key = 'refreshToken';

const set = async (value: string) => {
  await EncryptedStorage.setItem(key, value);
};

const get = async () => {
  return await EncryptedStorage.getItem(key);
};

const remove = async () => {
  await EncryptedStorage.removeItem(key);
};

export default {
  set,
  get,
  remove,
};
