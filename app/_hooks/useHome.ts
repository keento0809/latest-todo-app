import { useActionState } from "react";
import { Todo, TodoObj } from "../_types/home/home";
import { addTodo, deleteTodo, updateTodo } from "../_actions/todoActions";
import { generateRandomDigits } from "../_utils/utils";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { todoSchema } from "../_libs/zodSchema";

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
            isCompleted: "false",
          };

          await addTodo({ formData });

          return {
            todos: [...prevState.todos, newTodo],
          };
        }
        case "UPDATE": {
          const updateTodoId = Number(formData.get("todoId")) as number;
          const updateTodoTitle = formData.get("title") as string;
          const updateTodoIsCompleted = formData.get("isCompleted") === "true";

          await updateTodo({
            id: updateTodoId,
            title: updateTodoTitle,
            isCompleted: updateTodoIsCompleted,
          });

          return {
            todos: prevState.todos.map((todo) => {
              if (todo.id === updateTodoId) {
                return {
                  ...todo,
                  title: updateTodoTitle,
                  isCompleted: updateTodoIsCompleted,
                };
              }
              return todo;
            }),
          };
        }
        case "DELETE": {
          const deleteTodoId = Number(formData.get("todoId")) as number;

          await deleteTodo({ id: deleteTodoId });

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

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: todoSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return {
    todoState,
    setStateAction,
    isPending,
    form,
    fields,
  };
};
