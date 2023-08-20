import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from '../types';

const key = 'user';

const set = async (value: User) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

const get = async () => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue ? JSON.parse(jsonValue) : null;
};

const remove = async () => {
  await AsyncStorage.removeItem(key);
};

export default {
  set,
  get,
  remove,
};
