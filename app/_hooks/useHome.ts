import { useActionState } from "react";
import { TodoObj } from "../Home";

export const useHome = () => {
  const [todoState, setStateAction, isPending] = useActionState(
    async (prevState: TodoObj, formData: FormData) => {
      switch (formData.get("actionType")) {
        case "ADD": {
          return {
            todos: [...prevState.todos, formData.get("title") as string],
          };
        }
        default: {
          return prevState;
        }
      }
    },
    { todos: [] }
  );

  return {
    todoState,
    setStateAction,
    isPending,
  };
};
