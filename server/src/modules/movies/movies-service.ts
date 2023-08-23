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

export default {
  getMovies,
};
