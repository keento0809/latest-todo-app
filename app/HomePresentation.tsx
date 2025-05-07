import { TodoForm } from "./(home)/_components/todoForm/TodoForm";
import { TodoList } from "./(home)/_components/todoList/TodoList";
import { useHome } from "./(home)/_hooks/useHome";
import { Todo } from "./_types/home/home";

type HomePresentationProps = {
  todos: Todo[];
};

export const HomePresentation = ({ todos }: HomePresentationProps) => {
  const { todoState, setStateAction, isPending, form, fields } = useHome({
    todos,
  });

  return (
    <div className="flex flex-col gap-16">
      <TodoForm
        action={setStateAction}
        isPending={isPending}
        form={form}
        fields={fields}
      />
      <TodoList
        todoState={todoState}
        action={setStateAction}
        isPending={isPending}
      />
    </div>
  );
};
