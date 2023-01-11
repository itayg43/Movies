import {v4 as uuid} from 'uuid';

import {GenreJSON, MovieJSON} from '../services/tmdbService';

export class Movie {
  id: string = uuid();
  mid: number | null;
  posterURL: string | null;
  title: string | null;
  releaseDate: Date | null;
  genres: string[] | null;
  voteAvg: number;
  overview: string;

  constructor(movieJSON: MovieJSON) {
    this.mid = movieJSON.id || null;
    this.posterURL = movieJSON.backdrop_path || movieJSON.poster_path || null;
    this.title = movieJSON.title || movieJSON.original_title || null;
    this.releaseDate = this._initReleaseDate(movieJSON.release_date);
    this.genres = this._initGenres(movieJSON.genres);
    this.voteAvg = movieJSON.vote_average || 0;
    this.overview = movieJSON.overview || '';
  }

  private _initReleaseDate(date: string | undefined) {
    return date ? new Date(date) : null;
  }

  private _initGenres(genres: GenreJSON[] | undefined) {
    return genres ? genres.map(genre => genre.name) : null;
  }

  getReleaseYear() {
    return this.releaseDate?.getFullYear();
  }
}
