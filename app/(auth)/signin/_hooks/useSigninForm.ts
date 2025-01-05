import { signinSchema } from "@/app/_libs/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

export const useSigninForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, action, isPending] = useActionState(async () => {}, null);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema });
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
