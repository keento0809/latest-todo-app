"use client";

import { useHome } from "./_hooks/useHome";
import { Todo } from "./_types/home/home";
import { HomePresentation } from "./HomePresentation";

type HomeContainerProps = {
  todos: Todo[];
};

export const HomeContainer = ({ todos }: HomeContainerProps) => {
  const { todoState, setStateAction, isPending, form, fields } = useHome({
    todos,
  });

  return (
    <HomePresentation
      todoState={todoState}
      setStateAction={setStateAction}
      isPending={isPending}
      form={form}
      fields={fields}
    />
  );
};
