"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_db/drizzle";
import { todo } from "@/app/_db/schema";
import { parseWithZod } from "@conform-to/zod";
import { todoSchema } from "../_libs/zodSchema";

export const addTodo = async ({ formData }: { formData: FormData }) => {
  const submission = parseWithZod(formData, { schema: todoSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const id = Math.floor(Math.random() * 100000);
  const title = submission.value.title;

  await db.insert(todo).values({
    id,
    title,
    isCompleted: false,
  });
  revalidatePath("/");
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
