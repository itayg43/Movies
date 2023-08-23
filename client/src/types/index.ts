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

export type MoviesResponseData = Movie[];
