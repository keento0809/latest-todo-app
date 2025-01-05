import { signupSchema } from "@/app/_libs/zodSchema";
import { parseWithZod } from "@conform-to/zod";

export async function signup({ formData }: { formData: FormData }) {
  const result = parseWithZod(formData, { schema: signupSchema });

  if (result.status !== "success") {
    return result.reply();
  }
}
