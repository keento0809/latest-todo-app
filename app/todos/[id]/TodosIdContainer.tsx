import { TodoData } from "./_types/todosId";
import { TodosIdPresentation } from "./TodosIdPresentation";

type TodosIdContainerProps = {
  todo: TodoData;
};

export const TodosIdContainer = ({ todo }: TodosIdContainerProps) => {
  return <TodosIdPresentation todo={todo} />;
};
