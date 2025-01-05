import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .trim()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),
  isCompleted: z.union([z.literal("true"), z.literal("false")], {
    errorMap: () => ({ message: "isCompleted is required" }),
  }),
});

export const signupSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(1, { message: "Username is required" })
    .max(100, { message: "Username is too long" }),
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, { message: "Password is too short" }),
});

export const signinSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .trim()
    .min(1, { message: "Username is required" })
    .max(100, { message: "Username is too long" }),
  email: z.string({ message: "Email is required" }).email(),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, { message: "Password is too short" }),
});
