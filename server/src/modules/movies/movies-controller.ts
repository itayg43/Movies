import { AxiosError } from "axios";
import { Request, Response } from "express";

import { statusCode } from "../../constants";
import moviesService from "./movies-service";

const getMovies = async (_: Request, res: Response) => {
  try {
    const movies = await moviesService.getMovies();

    res.status(statusCode.ok).json(movies);
  } catch (error) {
    console.error(error instanceof AxiosError ? error.response?.data : error);

    res
      .status(statusCode.internal)
      .json({ message: "Could not get movies data" });
  }
};

export default {
  getMovies,
};
