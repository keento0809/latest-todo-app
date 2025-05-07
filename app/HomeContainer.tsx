"use client";

import { Todo } from "./_types/home/home";
import { HomePresentation } from "./HomePresentation";

type HomeContainerProps = {
  todos: Todo[];
};

export const HomeContainer = ({ todos }: HomeContainerProps) => {
  return <HomePresentation todos={todos} />;
};
