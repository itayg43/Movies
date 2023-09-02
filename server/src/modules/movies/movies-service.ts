import tmdbService, { MoviesCategory } from "./tmdb/tmdb-service";
import moviesCacheAccess from "./movies-cache-access";

const getMoviesByCategory = async (category: MoviesCategory) => {
  const cachedMovies = await moviesCacheAccess.getMoviesByCategory(category);

  if (cachedMovies) {
    return cachedMovies;
  }

  const movies = await tmdbService.getMoviesByCategory(category);

  await moviesCacheAccess.setMoviesForCategory(category, movies);

  return movies;
};

const getMovieDetailsById = async (id: number | string) => {
  const cachedMovieDetails = await moviesCacheAccess.getMovieDetailsById(id);

  if (cachedMovieDetails) {
    return cachedMovieDetails;
  }

  const movieDetails = await tmdbService.getMovieDetailsById(id);

  await moviesCacheAccess.setMovieDetails(movieDetails);

  return movieDetails;
};

export default {
  getMoviesByCategory,
  getMovieDetailsById,
};
