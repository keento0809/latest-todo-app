import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { todoSchema } from "@/app/_libs/zodSchema";
import { db } from "@/app/_db/drizzle";
import { todo } from "@/app/_db/schema";
import { revalidatePath } from "next/cache";

const app = new Hono().post(
  "/todos",
  zValidator("form", todoSchema),
  async (c) => {
    const { title, isCompleted } = c.req.valid("form");
    await db.insert(todo).values({
      id: Math.floor(Math.random() * 1000),
      title,
      isCompleted,
    });
    revalidatePath("/");

    return c.json({ ok: true, message: "Todo created" }, 201);
  }
);

export default app;
