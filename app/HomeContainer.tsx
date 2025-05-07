"use client";

import { Todo } from "./(home)/_types/home";
import { HomePresentation } from "./HomePresentation";

type HomeContainerProps = {
  todos: Todo[];
};

export const HomeContainer = ({ todos }: HomeContainerProps) => {
  return <HomePresentation todos={todos} />;
};
