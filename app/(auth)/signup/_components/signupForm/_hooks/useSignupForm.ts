import { signup } from "@/app/_actions/signupActions";
import { signupSchema } from "@/app/_libs/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

export const useSignupForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, action, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      await signup({ formData });
      return;
    },
    null
  );

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return {
    form,
    fields,
    action,
    isPending,
  };
};
