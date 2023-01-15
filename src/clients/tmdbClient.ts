import axios from 'axios';

import {TMDB_API_KEY} from '@env';

export enum ContentCategory {
  nowPlaying = 'now_playing',
  popular = 'popular',
  topRated = 'top_rated',
}

export enum BaseURL {
  api = 'https://api.themoviedb.org/3',
  originalImage = 'https://image.tmdb.org/t/p/original',
  resizedImage = 'https://image.tmdb.org/t/p/w500',
}

export const tmdbApiKey = TMDB_API_KEY;

export const tmdbClient = axios.create({
  baseURL: BaseURL.api,
});
