import { AxiosError } from "axios";

import tmdbClient from "./tmdb-client";
import { Movie, MovieDetails } from "../movies-entities";

const getMoviesByCategory = async (category: "popular" | "top_rated") => {
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

const getMovieDetailsById = async (id: number) => {
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
  page: number;
  results: MovieResponseData[];
  total_pages: number;
  total_results: number;
};

export type MovieResponseData = {
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
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetailsResponseData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideoResponseData[];
  };
  recommendations: GetMoviesResponseData;
};

export type VideoResponseData = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube";
  size: number;
  type: "Trailer";
  official: boolean;
  published_at: string;
  id: string;
};
