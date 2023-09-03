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
  backdropUrl: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;

  constructor(data: MovieResponseData) {
    this.id = data.id;
    this.title = data.title;
    this.backdropUrl = `${TMDB_BACKDROP_BASE_URL}${data.backdrop_path}`;
    this.overview = data.overview;
    this.releaseDate = data.release_date;
    this.voteAverage = data.vote_average;
    this.voteCount = data.vote_count;
  }
}

export class MovieDetails extends Movie {
  posterUrl: string;
  genres: string[];
  youTubeTrailerUrl: string | null;
  recommendations: Movie[];

  constructor(data: MovieDetailsResponseData) {
    super(data);
    this.posterUrl = `${TMDB_POSTER_BASE_URL}${data.poster_path}`;
    this.genres = data.genres.map((g) => g.name);
    this.youTubeTrailerUrl = this.initYouTubeTrailerUrl(data.videos.results);
    this.recommendations = data.recommendations.results.map(
      (r) => new Movie(r)
    );
  }

  private initYouTubeTrailerUrl(videos: VideoResponseData[]) {
    const trailerKey = videos
      .filter((v) => v.site === "YouTube" && v.type === "Trailer" && v.official)
      .at(0)?.key;

    return trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null;
  }
}
