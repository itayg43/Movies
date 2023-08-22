import tmdbClient from "./tmdb-client";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const getPopularMovies = async () => {
  const { data } = await tmdbClient.get<ResponseData>(
    "/movie/popular?language=en-US&page=1"
  );

  return data.results;
};

export default {
  getPopularMovies,
};
