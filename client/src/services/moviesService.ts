import apiClient from '../clients/apiClient';
import {Movie} from '../types';

const getMovies = async () => {
  const {data} = await apiClient.get<Movie[]>('/movies');

  return data;
};

export default {
  getMovies,
};
