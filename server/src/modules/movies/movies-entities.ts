import {
  TMDB_BACKDROP_BASE_URL,
  TMDB_POSTER_BASE_URL,
} from "./tmdb/tmdb-client";
import {
  MovieResponseData,
  MovieDetailsResponseData,
  VideoResponseData,
} from "./tmdb/tmdb-service";

export class Movie {
  id: number;
  title: string;
  backdropUrl: string | null;
  posterUrl: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;

  constructor(data: MovieResponseData) {
    this.id = data.id;
    this.title = data.title;

    this.backdropUrl = data.backdrop_path
      ? `${TMDB_BACKDROP_BASE_URL}${data.backdrop_path}`
      : null;

    this.posterUrl = `${TMDB_POSTER_BASE_URL}${data.poster_path}`;
    this.overview = data.overview;
    this.releaseDate = data.release_date;
    this.voteAverage = data.vote_average;
  }
}

export class MovieDetails extends Movie {
  genres: string[];
  youTubeTrailerUrl: string | null;
  recommendations: Movie[];

  constructor(data: MovieDetailsResponseData) {
    super(data);

    this.genres = data.genres.map((g) => g.name);
    this.youTubeTrailerUrl = this._initYouTubeTrailerUrl(data.videos.results);
    this.recommendations = data.recommendations.results.map(
      (r) => new Movie(r)
    );
  }

  _initYouTubeTrailerUrl(videos: VideoResponseData[]) {
    const trailerKey = videos
      .filter((v) => v.site === "YouTube" && v.type === "Trailer" && v.official)
      .at(0)?.key;

    return trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null;
  }
}
