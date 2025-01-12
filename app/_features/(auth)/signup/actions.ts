"use server";

import { db } from "@/app/_db/drizzle";
import { users } from "@/app/_db/schema";
import { signupSchema } from "@/app/_libs/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function signup({ formData }: { formData: FormData }) {
  const result = parseWithZod(formData, { schema: signupSchema });

  if (result.status !== "success") {
    return result.reply();
  }

  // check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, result.value.email),
  });

  if (existingUser) {
    return {
      isSuccess: false,
      error: { message: "User already exists" },
    };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(result.value.password, 12);

  const [newUser] = await db
    .insert(users)
    .values({
      name: result.value.username,
      email: result.value.email,
      hashedPassword,
      image: "",
    })
    .returning();

  return {
    isSuccess: true,
    data: { email: newUser.email, password: result.value.password },
  };
}
