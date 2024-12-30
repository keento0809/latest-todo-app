import { TodoObj } from "@/app/_types/home/home";
import { ListItem } from "../listItem/ListItem";
import { LoadingSpinner } from "../_ui/loaders/loadingSpinner/LoadingSpinner";

type TodoListProps = {
  todoState: TodoObj;
  action: (payload: FormData) => void;
  isPending: boolean;
};

export const TodoList = ({ todoState, action, isPending }: TodoListProps) => {
  return (
    <ul className="min-h-[400px]">
      {!isPending ? (
        todoState.todos.map((todo) => (
          <ListItem key={todo.id} todo={todo} action={action} />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </ul>
  );
};
