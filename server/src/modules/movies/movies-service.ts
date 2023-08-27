import tmdbService from "./tmdb/tmdb-service";
import moviesCacheAccess from "./movies-cache-access";

const getMovies = async () => {
  const movies = await tmdbService.getMoviesByCategory("popular");

  await moviesCacheAccess.setMovies(movies);

  return movies;
};

const getMovieDetailsById = async (id: string) => {
  const movieDetails = await tmdbService.getMovieDetailsById(id);

  await moviesCacheAccess.setMovieDetails(movieDetails);

  return movieDetails;
};

export default {
  getMovies,
  getMovieDetailsById,
};
