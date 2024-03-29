import * as z from 'zod';

import {loginFormSchema, registerFormSchema} from '../schemas';

export type RequestStatus = 'idle' | 'loading' | 'succeded' | 'failed';

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginUserResponseData = User & {
  tokens: UserTokens;
};

export type RegisterUserResponseData = User & {
  tokens: UserTokens;
};

export type ReissueUserAccessTokenResponseData = {
  accessToken: string;
};

export type Movie = {
  id: number;
  title: string;
  backdropUrl: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
};

export type MovieDetails = Movie & {
  posterUrl: string;
  genres: string[];
  youTubeTrailerUrl: string | null;
  recommendations: Movie[];
};

export type WatchList = {
  id: number;
  createdAt: string;
  movie: Movie;
};

export type WatchListEntities = {
  [id: number]: WatchList;
};

export type MoviesCategory = {
  id: string;
  key: 'Now Playing' | 'Popular' | 'Top Rated' | 'Upcoming';
  value: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
};
