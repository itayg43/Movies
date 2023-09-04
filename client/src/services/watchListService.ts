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

const removeWatchList = async (id: number) => {
  await apiClient.delete(`/users/watch-list/${id}`);
};

export default {
  getWatchList,
  addWatchList,
  removeWatchList,
};
