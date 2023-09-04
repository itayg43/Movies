import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }).min(2, "Name should be at least 2 characters long"),

    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email address"),

    password: string({
      required_error: "Password is required",
    }).min(4, "Password should be at least 4 characters long"),

    confirmPassword: string({
      required_error: "Confirm password is required",
    }),
  }).refine((formData) => formData.password === formData.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password dont match",
  }),
});
export type RegisterUserInput = TypeOf<typeof registerUserSchema>;

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
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export const reissueUserAccessTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: "Refresh token is required",
    }),
  }),
});
export type ReissueUserAccessTokenInput = TypeOf<
  typeof reissueUserAccessTokenSchema
>;
