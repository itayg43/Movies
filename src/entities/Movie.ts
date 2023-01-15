import {v4 as uuid} from 'uuid';

import {GenreJSON, MovieJSON, VideosJSON} from '../services/tmdbService';
import {Genre} from './Genre';

export class Movie {
  id: string = uuid();
  mid: number | null;
  posterURL: string | null;
  title: string | null;
  releaseDate: Date | null;
  genres: Genre[] | null;
  rating: string;
  overview: string;
  trailerKey: string | null;

  constructor(movieJSON: MovieJSON) {
    this.mid = movieJSON.id || null;
    this.posterURL = movieJSON.backdrop_path || movieJSON.poster_path || null;
    this.title = movieJSON.title || movieJSON.original_title || null;
    this.releaseDate = this._initReleaseDate(movieJSON.release_date);
    this.genres = this._initGenres(movieJSON.genres);
    this.rating = this._initRating(movieJSON.vote_average);
    this.overview = movieJSON.overview || '';
    this.trailerKey = this._initTrailerKey(movieJSON.videos);
  }

  private _initReleaseDate(date: string | undefined) {
    return date ? new Date(date) : null;
  }

  private _initGenres(genres: GenreJSON[] | undefined) {
    return genres ? genres.map(genre => new Genre(genre)) : null;
  }

  private _initRating(rating: number | undefined) {
    return rating ? rating.toFixed(1) : '0';
  }

  private _initTrailerKey(videos: VideosJSON | undefined) {
    const trailer = videos?.results.find(video => video.type === 'Trailer');
    return trailer ? trailer.key : null;
  }

  getReleaseYear() {
    return this.releaseDate?.getFullYear();
  }
}
