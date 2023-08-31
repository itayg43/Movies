import { number, object, TypeOf } from "zod";

export const addToUserWatchlistSchema = object({
  body: object({
    movieId: number({
      required_error: "Movie id is required",
    }),
  }),
});
export type AddToUserWatchlistInput = TypeOf<
  typeof addToUserWatchlistSchema
>["body"];
