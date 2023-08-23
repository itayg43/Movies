import apiClient from '../clients/apiClient';
import {MoviesResponseData} from '../types';

const getMovies = async () => {
  const {data} = await apiClient.get<MoviesResponseData>('/movies');

  return data;
};

export default {
  getMovies,
};
