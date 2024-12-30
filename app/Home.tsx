"use client";

import { TodoForm } from "./_components/todoForm/TodoForm";
import { TodoList } from "./_components/todoList/TodoList";
import { useHome } from "./_hooks/useHome";
import { Todo } from "./_types/home/home";

type HomeContainerProps = {
  todos: Todo[];
};

export const HomeContainer = ({ todos }: HomeContainerProps) => {
  const { todoState, setStateAction, isPending } = useHome({ todos });

  return (
    <div className="flex flex-col gap-16">
      <TodoForm action={setStateAction} isPending={isPending} />
      <TodoList
        todoState={todoState}
        action={setStateAction}
        isPending={isPending}
      />
    </div>
  );
};
