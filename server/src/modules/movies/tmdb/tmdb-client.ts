import axios from "axios";

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
});

export default tmdbClient;
