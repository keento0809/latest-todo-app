import { signinSchema } from "@/app/_libs/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { signIn } from "next-auth/react";

export async function signin({ formData }: { formData: FormData }) {
  const result = parseWithZod(formData, { schema: signinSchema });

  if (result.status !== "success") {
    return result.reply();
  }

  await signIn("credentials", {
    name: result.value.username,
    email: result.value.email,
    password: result.value.password,
    redirectTo: "/",
  });
}
