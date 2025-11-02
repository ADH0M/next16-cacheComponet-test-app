import * as z from "zod";

export const userSchema = z.object({
  username: z
    .string("username is required")
    .min(3, "too short")
    .max(15, "the max length is 15 char"),
  email: z.email("invalid formate "),
  password: z
    .string("password is required")
    .min(6, "too short")
    .max(18, "the max range is 18"),
});

export const signInSchema = z.object({
  email: z.email("you email is invalid"),
  password: z
    .string("your password is required")
    .max(18, "the max length is 18 char")
    .min(5, "the min length are 5 chars"),
});
