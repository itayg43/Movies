import { object, string, TypeOf } from "zod";

export const getMovieDetailsSchema = object({
  params: object({
    id: string({
      required_error: "Movie id is required",
    }).regex(/^\d+$/),
  }),
});
export type GetMovieDetailsInput = TypeOf<
  typeof getMovieDetailsSchema
>["params"];
