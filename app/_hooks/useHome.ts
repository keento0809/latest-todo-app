import { useActionState } from "react";
import { Todo, TodoObj } from "../_types/home/home";
import { addTodo } from "../_actions/todoActions";
import { generateRandomDigits } from "../_utils/utils";

type UseHomeProps = {
  todos: Todo[];
};

export const useHome = ({ todos }: UseHomeProps) => {
  const [todoState, setStateAction, isPending] = useActionState(
    async (prevState: TodoObj, formData: FormData) => {
      switch (formData.get("actionType")) {
        case "ADD": {
          const newTodo: Todo = {
            id: generateRandomDigits(),
            title: formData.get("title") as string,
            isCompleted: false,
          };
          await addTodo({ id: newTodo.id, title: newTodo.title });
          return {
            todos: [...prevState.todos, newTodo],
          };
        }
        case "UPDATE": {
          const updateTodoId = Number(formData.get("todoId")) as number;
          return {
            todos: prevState.todos.map((todo) => {
              if (todo.id === updateTodoId) {
                return {
                  ...todo,
                  title: formData.get("title") as string,
                  isCompleted: formData.get("isCompleted") === "true",
                };
              }
              return todo;
            }),
          };
        }
        case "DELETE": {
          const deleteTodoId = Number(formData.get("todoId")) as number;
          return {
            todos: prevState.todos.filter((todo) => todo.id !== deleteTodoId),
          };
        }
        default: {
          return prevState;
        }
      }
    },
    { todos }
  );

  return {
    todoState,
    setStateAction,
    isPending,
  };
};
