import { TodoObj } from "@/app/_types/home/home";
import { ListItem } from "../listItem/ListItem";

type TodoListProps = {
  todoState: TodoObj;
  action: (payload: FormData) => void;
};

export const TodoList = ({ todoState, action }: TodoListProps) => {
  return (
    <ul className="min-h-[400px] overflow-y-scroll">
      {todoState.todos.map((todo) => (
        <ListItem key={todo.id} todo={todo} action={action} />
      ))}
    </ul>
  );
};
