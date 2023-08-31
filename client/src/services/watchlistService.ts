import apiClient from '../clients/apiClient';
import {Watchlist} from '../types';

const getWatchlist = async () => {
  const {data} = await apiClient.get<Watchlist[]>('/users/watchlist');

  return data;
};

const addToWatchlist = async (movieId: number) => {
  const {data} = await apiClient.post<Watchlist>('/users/watchlist', {
    movieId,
  });

  return data;
};

export default {
  getWatchlist,
  addToWatchlist,
};
