import { AxiosError } from "axios";

import tmdbClient from "./tmdb-client";
import { Movie, MovieDetails } from "../movies-entities";

export enum MoviesCategory {
  nowPlaying = "now_playing",
  popular = "popular",
  topRated = "top_rated",
  upcoming = "upcoming",
}

const getMoviesByCategory = async (category: MoviesCategory) => {
  try {
    const { data } = await tmdbClient.get<GetMoviesResponseData>(
      `/movie/${category}?language=en-US&page=1`
    );

    return data.results.map((m) => new Movie(m));
  } catch (error) {
    console.error(error instanceof AxiosError ? error.response?.data : error);

    throw new Error(`Couldn't get movies for the category: ${category}`);
  }
};

const getMovieDetailsById = async (id: number | string) => {
  try {
    const { data } = await tmdbClient.get<MovieDetailsResponseData>(
      `/movie/${id}?language=en-US&append_to_response=videos,recommendations`
    );

    return new MovieDetails(data);
  } catch (error) {
    console.error(error instanceof AxiosError ? error.response?.data : error);

    throw new Error(`Couldn't get movie details for id: ${id}`);
  }
};

export default {
  getMoviesByCategory,
  getMovieDetailsById,
};

export type GetMoviesResponseData = {
  results: MovieResponseData[];
};

export type MovieResponseData = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type MovieDetailsResponseData = MovieResponseData & {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  videos: {
    results: VideoResponseData[];
  };
  recommendations: GetMoviesResponseData;
};

export type VideoResponseData = {
  key: string;
  site: "YouTube";
  type: "Trailer";
  official: boolean;
};
