import apiClient from '../clients/apiClient';
import {Movie, MovieDetails} from '../types';

const getMovies = async () => {
  const {data} = await apiClient.get<Movie[]>('/movies');

  return data;
};

const getMovieDetailsById = async (id: number) => {
  const {data} = await apiClient.get<MovieDetails>(`/movies/${id}`);

  return data;
};

export default {
  getMovies,
  getMovieDetailsById,
};
