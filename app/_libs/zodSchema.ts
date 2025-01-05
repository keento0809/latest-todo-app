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
