import { Todo } from "@/app/_types/home/home";

export type TodoData = Todo & {
  createdAt: string;
  updatedAt: string | null;
};
