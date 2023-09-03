import apiClient from '../clients/apiClient';
import {Movie, MovieDetails, MoviesCategory} from '../types';

const getMoviesByCategory = async (category: MoviesCategory) => {
  const {data} = await apiClient.get<Movie[]>(
    `/movies?category=${category.value}`,
  );

  return data;
};

const getMoviesBySearchQuery = async (searchQuery: string) => {
  const {data} = await apiClient.get<Movie[]>(
    `/movies/search?query=${searchQuery.trim().toLowerCase()}`,
  );

  return data;
};

const getMovieDetailsById = async (id: number) => {
  const {data} = await apiClient.get<MovieDetails>(`/movies/${id}`);

  return data;
};

export default {
  getMoviesByCategory,
  getMoviesBySearchQuery,
  getMovieDetailsById,
};
