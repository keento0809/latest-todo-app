"use client";

import { TodoForm } from "./_components/todoForm/TodoForm";
import { TodoList } from "./_components/todoList/TodoList";
import { useHome } from "./_hooks/useHome";
import { Todo } from "@/app/(home)/_types/home";

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
