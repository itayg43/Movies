import {tmdbApiKey, tmdbClient, ContentCategory} from '../clients/tmdbClient';
import {Movie} from '../entities/Movie';

export interface GenreJSON {
  id: number;
  name: string;
}

export interface MovieJSON {
  id?: number;
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  original_title?: string;
  release_date?: string;
  genres?: GenreJSON[];
  vote_average?: number;
  overview?: string;
}

export interface MoviesJSON {
  results: MovieJSON[];
}

const getMoviesByCategory = async (
  category: ContentCategory,
  page: string = '1',
) => {
  const {data} = await tmdbClient.get<MoviesJSON>(
    `/movie/${category}?api_key=${tmdbApiKey}&language=en-US&page=${page}`,
  );
  return data.results.map(movieJSON => new Movie(movieJSON));
};

const getMoviesByQuery = async (query: string) => {
  const {data} = await tmdbClient.get<MoviesJSON>(
    `/search/movie?api_key=${tmdbApiKey}&query=${query}&language=en-US&page=1`,
  );
  return data.results.map(movieJSON => new Movie(movieJSON));
};

const getMovieDetailsById = async (id: number) => {
  const {data} = await tmdbClient.get<MovieJSON>(
    `/movie/${id}?api_key=${tmdbApiKey}&language=en-US`,
  );
  return new Movie(data);
};

const getMovieRecommendationsById = async (id: number) => {
  const {data} = await tmdbClient.get<MoviesJSON>(
    `/movie/${id}/recommendations?api_key=${tmdbApiKey}&language=en-US&page=1`,
  );
  return data.results.map(movieJSON => new Movie(movieJSON));
};

export default {
  getMoviesByCategory,
  getMoviesByQuery,
  getMovieDetailsById,
  getMovieRecommendationsById,
};
