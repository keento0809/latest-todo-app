import { useActionState } from "react";
import { Todo, TodoObj } from "../_types/home/home";

export const useHome = () => {
  const [todoState, setStateAction, isPending] = useActionState(
    async (prevState: TodoObj, formData: FormData) => {
      switch (formData.get("actionType")) {
        case "ADD": {
          const newTodo: Todo = {
            id: Math.random().toString(36),
            title: formData.get("title") as string,
            isCompleted: false,
          };
          return {
            todos: [...prevState.todos, newTodo],
          };
        }
        case "UPDATE": {
          const updateTodoId = formData.get("todoId") as string;
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
          const deleteTodoId = formData.get("todoId") as string;
          return {
            todos: prevState.todos.filter((todo) => todo.id !== deleteTodoId),
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
