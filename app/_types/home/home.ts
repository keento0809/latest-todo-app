import { FieldMetadata, FormMetadata } from "@conform-to/react";

export type Todo = {
  id: number;
  title: string;
  isCompleted: "true" | "false";
};

export type TodoObj = {
  todos: Todo[];
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
    boolean,
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
