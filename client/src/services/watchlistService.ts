import apiClient from '../clients/apiClient';
import {Watchlist} from '../types';

const getWatchlist = async () => {
  const {data} = await apiClient.get<Watchlist[]>('/users/watchlist');

  return data;
};

export default {
  getWatchlist,
};
