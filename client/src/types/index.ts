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

export type LoginRegisterResponseData = User & {
  tokens: UserTokens;
};

export type ReissueAccessTokenResponseData = {
  accessToken: string;
};

export type Movie = {
  id: number;
  title: string;
  backdropUrl: string | null;
  posterUrl: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
};

export type MovieDetails = Movie & {
  genres: string[];
  youTubeTrailerUrl: string | null;
  recommendations: Movie[];
};
