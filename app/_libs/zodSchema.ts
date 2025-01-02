import { z } from "zod";

export const todoSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
});
