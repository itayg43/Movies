import z, { number, object, string, TypeOf } from "zod";

export const addWatchListSchema = object({
  body: object({
    movieId: number({
      required_error: "Movie id is required",
    }),
  }),
});
export type AddWatchListInput = TypeOf<typeof addWatchListSchema>;

export const softDeleteWatchListSchema = object({
  params: object({
    id: string({
      required_error: "Watch list id is required",
    }).regex(/^\d+$/, "Watch list id should include numbers only"),
  }),
});
export type SoftDeleteWatchListInput = TypeOf<typeof softDeleteWatchListSchema>;
