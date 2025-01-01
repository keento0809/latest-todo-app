import { db } from "@/app/_db/drizzle";
import { todo } from "@/app/_db/schema";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    const todos = await db.select().from(todo).orderBy(desc(todo.updatedAt));

    return c.json({ todos }, 200);
  })
  .get("/:todoId", async (c) => {
    const { todoId } = c.req.param();
    const todoItem = await db.query.todo.findFirst({
      where: eq(todo.id, Number(todoId)),
    });

    return c.json({ todo: todoItem }, 200);
  });

export default app;
