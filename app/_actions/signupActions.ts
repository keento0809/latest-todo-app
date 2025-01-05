import { parseWithZod } from "@conform-to/zod";
import { signupSchema } from "../_libs/zodSchema";

export async function signup({ formData }: { formData: FormData }) {
  const result = parseWithZod(formData, { schema: signupSchema });

  if (result.status !== "success") {
    return result.reply();
  }
}
