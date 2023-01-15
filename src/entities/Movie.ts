import {v4 as uuid} from 'uuid';

import {GenreJSON, MovieJSON} from '../services/tmdbService';
import {Genre} from './Genre';

export class Movie {
  id: string = uuid();
  mid: number | null;
  posterURL: string | null;
  title: string | null;
  releaseDate: Date | null;
  genres: Genre[] | null;
  voteAvg: string;
  overview: string;

  constructor(movieJSON: MovieJSON) {
    this.mid = movieJSON.id || null;
    this.posterURL = movieJSON.backdrop_path || movieJSON.poster_path || null;
    this.title = movieJSON.title || movieJSON.original_title || null;
    this.releaseDate = this._initReleaseDate(movieJSON.release_date);
    this.genres = this._initGenres(movieJSON.genres);
    this.voteAvg = this._initVoteAvg(movieJSON.vote_average);
    this.overview = movieJSON.overview || '';
  }

  private _initReleaseDate(date: string | undefined) {
    return date ? new Date(date) : null;
  }

  private _initGenres(genres: GenreJSON[] | undefined) {
    return genres ? genres.map(genre => new Genre(genre)) : null;
  }

  private _initVoteAvg(avg: number | undefined) {
    return avg ? avg.toFixed(1) : '0';
  }

  getReleaseYear() {
    return this.releaseDate?.getFullYear();
  }
}
