import { formatISOToCustomString } from "@/app/_utils/utils";
import { TodoData } from "./_types/todosId";

type TodosIdPresentationProps = {
  todo: TodoData;
};

export const TodosIdPresentation = ({ todo }: TodosIdPresentationProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p>{todo.title}</p>
      <p>{todo.updatedAt ? formatISOToCustomString(todo.updatedAt) : ""}</p>
    </div>
  );
};
