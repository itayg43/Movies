import apiClient from '../clients/apiClient';
import {WatchList} from '../types';

const getWatchList = async () => {
  const {data} = await apiClient.get<WatchList[]>('/users/watch-list');

  return data;
};

const addWatchList = async (movieId: number) => {
  const {data} = await apiClient.post<WatchList>('/users/watch-list', {
    movieId,
  });

  return data;
};

export default {
  getWatchList,
  addWatchList,
};
