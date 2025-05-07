import { Todo } from "@/app/(home)/_types/home";

export type TodoData = Todo & {
  createdAt: string;
  updatedAt: string | null;
};
