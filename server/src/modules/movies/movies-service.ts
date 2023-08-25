import tmdbService from "./tmdb/tmdb-service";
import moviesCacheAccess from "./movies-cache-access";

const getMovies = async () => {
  const cachedMovies = await moviesCacheAccess.getMovies();

  if (cachedMovies) {
    return cachedMovies;
  }

  const movies = await tmdbService.getMoviesByCategory("popular");

  await moviesCacheAccess.setMovies(movies);

  return movies;
};

const getMovieDetailsById = async (id: number) => {
  const cachedMovieDetails = await moviesCacheAccess.getMovieDetailsById(id);

  if (cachedMovieDetails) {
    return cachedMovieDetails;
  }

  const movieDetails = await tmdbService.getMovieDetailsById(id);

  await moviesCacheAccess.setMovieDetails(movieDetails);

  return movieDetails;
};

export default {
  getMovies,
  getMovieDetailsById,
};
