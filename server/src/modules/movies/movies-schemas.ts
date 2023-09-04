import z, { object, string, TypeOf } from "zod";
import { MoviesCategory } from "./tmdb/tmdb-service";

export const getMoviesByCategorySchema = object({
  query: object({
    category: z.nativeEnum(MoviesCategory, {
      required_error: "Category is required",
    }),
  }),
});
export type GetMoviesByCategoryInput = TypeOf<typeof getMoviesByCategorySchema>;

export const getMoviesBySearchQuerySchema = object({
  query: object({
    query: z
      .string({
        required_error: "Query is required",
      })
      .min(3, "Query should be at least 3 characters long"),
  }),
});
export type GetMoviesBySearchQueryInput = TypeOf<
  typeof getMoviesBySearchQuerySchema
>;

export const getMovieDetailsByIdSchema = object({
  params: object({
    id: string({
      required_error: "Movie id is required",
    }).regex(/^\d+$/, "Movie id should include numbers only"),
  }),
});
export type GetMovieDetailsByIdInput = TypeOf<typeof getMovieDetailsByIdSchema>;
