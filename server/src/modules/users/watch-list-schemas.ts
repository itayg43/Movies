import { number, object, TypeOf } from "zod";

export const addWatchListSchema = object({
  body: object({
    movieId: number({
      required_error: "Movie id is required",
    }),
  }),
});
export type AddWatchListInput = TypeOf<typeof addWatchListSchema>;
