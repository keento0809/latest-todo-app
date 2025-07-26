import { FieldMetadata, FormMetadata } from "@conform-to/react";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean | "true" | "false";
};

export type TodoObj = {
  todos: Todo[];
  error?: string | null;
};

export type TodoFormType = FormMetadata<
  {
    title: string;
    isCompleted: "true" | "false";
  },
  string[]
>;

export type TodoFields = Required<{
  isCompleted: FieldMetadata<
    boolean | "true" | "false",
    {
      isCompleted: "true" | "false";
      title: string;
    },
    string[]
  >;
  title: FieldMetadata<
    string,
    {
      isCompleted: "true" | "false";
      title: string;
    },
    string[]
  >;
}>;
