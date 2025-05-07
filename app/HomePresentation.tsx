import { TodoForm } from "./_components/todoForm/TodoForm";
import { TodoList } from "./_components/todoList/TodoList";
import { TodoFields, TodoFormType, TodoObj } from "./_types/home/home";

type HomePresentationProps = {
  todoState: TodoObj;
  setStateAction: (payload: FormData) => void;
  isPending: boolean;
  form: TodoFormType;
  fields: TodoFields;
};

export const HomePresentation = ({
  todoState,
  setStateAction,
  isPending,
  form,
  fields,
}: HomePresentationProps) => {
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
