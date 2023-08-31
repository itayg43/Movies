import { number, object, string, TypeOf } from "zod";

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

export const softDeleteUserWatchlistItemSchema = object({
  params: object({
    id: string({
      required_error: "Watchlist item id is required",
    }).regex(/^\d+$/, "Watchlist item id should include numbers only"),
  }),
});
export type SoftDeleteUserWatchlistItemInput = TypeOf<
  typeof softDeleteUserWatchlistItemSchema
>["params"];
