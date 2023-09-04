import { MovieResponseData } from "./tmdb-service";

const filterMoviesWithoutData = (movie: MovieResponseData) => {
  return (
    movie.backdrop_path !== null &&
    movie.overview !== "" &&
    movie.release_date !== "" &&
    movie.vote_count > 0
  );
};

export default {
  filterMoviesWithoutData,
};
