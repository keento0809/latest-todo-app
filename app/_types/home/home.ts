import { FieldMetadata, FormMetadata } from "@conform-to/react";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type TodoObj = {
  todos: Todo[];
};

export type TodoFormType = FormMetadata<
  {
    title: string;
    isCompleted: boolean;
  },
  string[]
>;

export type TodoFields = Required<{
  isCompleted: FieldMetadata<
    boolean,
    {
      isCompleted: boolean;
      title: string;
    },
    string[]
  >;
  title: FieldMetadata<
    string,
    {
      isCompleted: boolean;
      title: string;
    },
    string[]
  >;
}>;
