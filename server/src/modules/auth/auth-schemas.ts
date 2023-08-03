import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email address"),

    password: string({
      required_error: "Password is required",
    }).min(4, "Password should be at least 4 characters long"),
  }),
});
export type RegisterUserInput = TypeOf<typeof registerUserSchema>["body"];

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email address"),

    password: string({
      required_error: "Password is required",
    }).min(4, "Password should be at least 4 characters long"),
  }),
});
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
