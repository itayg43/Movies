import apiClient from '../clients/apiClient';
import {Movie, MovieDetails} from '../types';

const getMovies = async () => {
  const {data} = await apiClient.get<Movie[]>('/movies');

  return data;
};

const getMovieDetailsById = async (id: number, signal?: AbortSignal) => {
  const {data} = await apiClient.get<MovieDetails>(`/movies/${id}`, {
    signal,
  });

  return data;
};

export default {
  getMovies,
  getMovieDetailsById,
};
