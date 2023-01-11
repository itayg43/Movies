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

const getMoviesByCategory = async (category: ContentCategory) => {
  const {data} = await tmdbClient.get<MoviesJSON>(
    `/movie/${category}?api_key=${tmdbApiKey}&language=en-US&page=1`,
  );
  return data.results?.map(movieJSON => new Movie(movieJSON));
};

const getMoviesByQuery = async (query: string) => {
  const {data} = await tmdbClient.get<MoviesJSON>(
    `/search/movie?api_key=${tmdbApiKey}&query=${query}&language=en-US&page=1`,
  );
  return data.results?.map(movieJSON => new Movie(movieJSON));
};

export default {
  getMoviesByCategory,
  getMoviesByQuery,
};
