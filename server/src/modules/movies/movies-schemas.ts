import z, { object, string, TypeOf } from "zod";
import { MoviesCategory } from "./tmdb/tmdb-service";

export const getMoviesByCategorySchema = object({
  query: object({
    category: z.nativeEnum(MoviesCategory),
  }),
});
export type GetMoviesByCategoryInput = TypeOf<
  typeof getMoviesByCategorySchema
>["query"];

export const getMovieDetailsByIdSchema = object({
  params: object({
    id: string({
      required_error: "Movie id is required",
    }).regex(/^\d+$/, "Movie id should include numbers only"),
  }),
});
export type GetMovieDetailsByIdInput = TypeOf<
  typeof getMovieDetailsByIdSchema
>["params"];
