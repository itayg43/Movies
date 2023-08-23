import _ from "lodash";

import tmdbClient from "./tmdb-client";

export type Movie = {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: false;
  voteAverage: number;
  voteCount: number;
};

type ResponseData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const getMoviesByCategory = async (category: "popular" | "top_rated") => {
  const { data } = await tmdbClient.get<ResponseData>(
    `/movie/${category}?language=en-US&page=1`
  );

  return data.results.map(
    (item) => _.mapKeys(item, (v, key) => _.camelCase(key)) as Movie
  );
};

export default {
  getMoviesByCategory,
};
