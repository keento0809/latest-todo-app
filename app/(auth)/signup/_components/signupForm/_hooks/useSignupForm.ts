import { signup } from "@/app/_features/(auth)/signup/actions";
import { signupSchema } from "@/app/_libs/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { signIn } from "next-auth/react";
import { useActionState } from "react";

type SignupResultType = {
  isSuccess: boolean;
  data: {
    email: string | null;
    password: string;
  };
};

function checkIsSignupResultType(result: unknown): result is SignupResultType {
  return (result as SignupResultType).data !== undefined;
}

export const useSignupForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [result, action, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const signupResult = await signup({ formData });

      if (signupResult.error) {
        throw new Error(`Failed to signup: ${signupResult.error}`);
      }

      // ensure the result is of the correct type
      const isSignupResultType = checkIsSignupResultType(signupResult);

      if (!isSignupResultType) {
        throw new Error("Invalid signup result type");
      }

      // implement signin after completing signup
      await signIn("credentials", {
        email: signupResult.data.email,
        password: signupResult.data.password,
        redirectTo: "/",
      });
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
