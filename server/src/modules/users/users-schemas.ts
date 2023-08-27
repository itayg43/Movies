import { number, object, string, TypeOf } from "zod";

export const addWatchListSchema = object({
  params: object({
    userId: string({
      required_error: "User id is required",
    }),
  }),

  body: object({
    movieId: number({
      required_error: "Movie id is required",
    }),
  }),
});
export type AddWatchListInput = TypeOf<typeof addWatchListSchema>;
