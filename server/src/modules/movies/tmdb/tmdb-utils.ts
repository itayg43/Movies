import { MovieResponseData } from "./tmdb-service";

const filterMoviesWithoutBackdropOrReleaseDateOrVoteCount = (
  movie: MovieResponseData
) => {
  return (
    movie.backdrop_path !== null &&
    movie.release_date !== "" &&
    movie.vote_count > 0
  );
};

export default {
  filterMoviesWithoutBackdropOrReleaseDateOrVoteCount,
};
