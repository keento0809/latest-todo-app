"use server";

import { desc, eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_db/drizzle";
import { todo } from "@/app/_db/schema";
import { Todo } from "../_types/home/home";

export const getTodos = async (): Promise<Todo[]> => {
  const data = await db.select().from(todo).orderBy(desc(todo.updatedAt));
  return data;
};

export const addTodo = async ({ id, title }: { id: number; title: string }) => {
  await db.insert(todo).values({
    id,
    title,
    isCompleted: false,
  });
};

export const deleteTodo = async ({ id }: { id: number }) => {
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
};

export const toggleTodo = async ({ id }: { id: number }) => {
  await db
    .update(todo)
    .set({
      isCompleted: not(todo.isCompleted),
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
};

export const updateTodo = async ({
  id,
  title,
  isCompleted,
}: {
  id: number;
  title: string;
  isCompleted: boolean;
}) => {
  await db
    .update(todo)
    .set({
      title: title,
      isCompleted: isCompleted,
    })
    .where(eq(todo.id, id));
  revalidatePath("/");
};
