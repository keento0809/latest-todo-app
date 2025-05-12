import { TodoObj } from "@/app/(home)/_types/home";
import { ListItem } from "./_components/listItem/ListItem";
import { LoadingSpinner } from "@/app/_components/_ui/loaders/loadingSpinner/LoadingSpinner";

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
