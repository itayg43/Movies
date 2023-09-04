import apiClient from '../clients/apiClient';
import {WatchList} from '../types';

const getWatchList = async () => {
  const {data} = await apiClient.get<WatchList[]>('/users/watch-list');

  return data;
};

export default {
  getWatchList,
};
