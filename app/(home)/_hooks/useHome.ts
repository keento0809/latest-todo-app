import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { generateRandomDigits } from "@/app/_utils/utils";
import { Todo, TodoObj } from "@/app/(home)/_types/home";
import { addTodo, deleteTodo, updateTodo, toggleTodo } from "@/app/(home)/_actions/actions";
import { todoSchema } from "@/app/_libs/zodSchema";

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
            isCompleted: formData.get("isCompleted") as "true" | "false",
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
        case "TOGGLE": {
          const toggleTodoId = Number(formData.get("todoId")) as number;

          await toggleTodo({ id: toggleTodoId });

          return {
            todos: prevState.todos.map((todo) => {
              if (todo.id === toggleTodoId) {
                const currentIsCompleted = todo.isCompleted === "true" || todo.isCompleted === true;
                return {
                  ...todo,
                  isCompleted: !currentIsCompleted,
                };
              }
              return todo;
            }),
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
