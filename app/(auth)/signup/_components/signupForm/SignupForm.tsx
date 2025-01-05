"use client";

import { Field } from "@base-ui-components/react/field";
import { Form } from "@base-ui-components/react/form";
import { useSignupForm } from "./_hooks/useSignupForm";
import { ErrorMessage } from "@/app/_components/_ui/messages/errorMessage/ErrorMessage";
import Link from "next/link";
import { FormTitle } from "@/app/_components/_ui/titles/formTitle/FormTitle";

export const SignupForm = () => {
  const { form, fields, isPending, action } = useSignupForm();

  return (
    <>
      <FormTitle>Signup</FormTitle>
      <Form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate
        className="flex flex-col gap-10 min-w-[400px] mx-auto"
      >
        <Field.Root name="username" className="flex flex-col items-start gap-1">
          <Field.Label className="text-sm font-medium text-gray-900">
            Username
          </Field.Label>
          <input
            type="text"
            key={fields.username.key}
            name={fields.username.name}
            id="username"
            required
            className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-purple-600"
          />
          <ErrorMessage>{fields.username.errors}</ErrorMessage>
        </Field.Root>
        <Field.Root name="email" className="flex flex-col items-start gap-1">
          <Field.Label className="text-sm font-medium text-gray-900">
            Email
          </Field.Label>
          <input
            type="email"
            key={fields.email.key}
            name={fields.email.name}
            required
            className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-purple-600"
          />
          <ErrorMessage>{fields.email.errors}</ErrorMessage>
        </Field.Root>
        <Field.Root name="password" className="flex flex-col items-start gap-1">
          <Field.Label className="text-sm font-medium text-gray-900">
            Password
          </Field.Label>
          <input
            type="password"
            key={fields.password.key}
            name={fields.password.name}
            id="password"
            required
            className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-purple-600"
          />
          <ErrorMessage>{fields.password.errors}</ErrorMessage>
        </Field.Root>
        <button
          type="submit"
          disabled={isPending}
          className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all disabled:opacity-50"
        >
          Submit
        </button>
      </Form>
      <div className="flex justify-center w-full items-center gap-1 text-center pt-10">
        Already have an account?{" "}
        <Link href="/signin" className="text-purple-500 hover:underline">
          Login
        </Link>
      </div>
    </>
  );
};
