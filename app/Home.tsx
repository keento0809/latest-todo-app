"use client";

import { TodoForm } from "./_components/todoForm/TodoForm";
import { TodoList } from "./_components/todoList/TodoList";
import { useHome } from "./_hooks/useHome";

export const HomeContainer = () => {
  const { todoState, setStateAction, isPending } = useHome();

  return (
    <div className="flex flex-col gap-16">
      <TodoForm action={setStateAction} isPending={isPending} />
      <TodoList todoState={todoState} action={setStateAction} />
    </div>
  );
};
