import { useHome } from "./_hooks/useHome";
import { Todo } from "./_types/home";
import { HomePresentation, HomePresentationProps } from "./HomePresentation";

type HomeContainerProps = {
  todos: Todo[];
};

export const HomeContainer = ({ todos }: HomeContainerProps) => {
  const { todoState, setStateAction, isPending, form, fields } = useHome({
    todos,
  });

  const props: HomePresentationProps = {
    todoState,
    setStateAction,
    isPending,
    form,
    fields,
  };

  return <HomePresentation {...props} />;
};
