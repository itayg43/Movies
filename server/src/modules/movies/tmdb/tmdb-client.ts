import axios from "axios";

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
});

export const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/original";

export default tmdbClient;
