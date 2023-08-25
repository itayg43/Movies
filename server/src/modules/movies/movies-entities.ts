import {
  TMDB_BACKDROP_BASE_URL,
  TMDB_POSTER_BASE_URL,
} from "./tmdb/tmdb-client";
import {
  MovieResponseData,
  MovieDetailsResponseData,
} from "./tmdb/tmdb-service";

export class Movie {
  id: number;
  title: string;
  backdropUrl: string;
  posterUrl: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;

  constructor(data: MovieResponseData) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.backdropUrl = `${TMDB_BACKDROP_BASE_URL}${data.backdrop_path}`;
    this.posterUrl = `${TMDB_POSTER_BASE_URL}${data.poster_path}`;
    this.releaseDate = data.release_date;
    this.voteAverage = data.vote_average;
  }
}

export class MovieDetails {
  id: number;
  title: string;
  backdropUrl: string;
  posterUrl: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  voteAverage: number;
  youTubeTrailerKey: string | undefined;
  recommendations: Movie[];

  constructor(data: MovieDetailsResponseData) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview;
    this.backdropUrl = `${TMDB_BACKDROP_BASE_URL}${data.backdrop_path}`;
    this.posterUrl = `${TMDB_POSTER_BASE_URL}${data.poster_path}`;
    this.genres = data.genres.map((g) => g.name);
    this.releaseDate = data.release_date;
    this.voteAverage = data.vote_average;

    this.youTubeTrailerKey = data.videos.results
      .filter((v) => v.site === "YouTube" && v.type === "Trailer" && v.official)
      .at(0)?.key;

    this.recommendations = data.recommendations.results.map(
      (r) => new Movie(r)
    );
  }
}
