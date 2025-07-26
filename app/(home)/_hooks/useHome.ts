import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { generateRandomDigits } from "@/app/_utils/utils";
import { Todo, TodoObj } from "@/app/(home)/_types/home";
import { addTodo, deleteTodo, updateTodo, toggleTodo } from "@/app/(home)/_actions/actions";
import { todoSchema } from "@/app/_libs/zodSchema";
import { isCompleted } from "@/app/(home)/_utils/todoHelpers";

type UseHomeProps = {
  todos: Todo[];
};

export const useHome = ({ todos }: UseHomeProps) => {
  const [todoState, setStateAction, isPending] = useActionState(
    async (prevState: TodoObj, formData: FormData) => {
      try {
        switch (formData.get("actionType")) {
        case "ADD": {
          const newTodo: Todo = {
            id: generateRandomDigits(),
            title: formData.get("title") as string,
            isCompleted: formData.get("isCompleted") as "true" | "false",
          };

          // Call server action and handle response
          const result = await addTodo({ 
            formData,
            optimisticId: newTodo.id 
          });

          // If server action returned error, return it in state
          if (result && result.error) {
            return {
              ...prevState,
              error: result.error
            };
          }

          // Success: add todo to state
          return {
            todos: [...prevState.todos, newTodo],
            error: null
          };
        }
        case "UPDATE": {
          const updateTodoId = Number(formData.get("todoId")) as number;
          const updateTodoTitle = formData.get("title") as string;
          const updateTodoIsCompleted = isCompleted(formData.get("isCompleted") as "true" | "false");

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
                const currentIsCompleted = isCompleted(todo.isCompleted);
                return {
                  ...todo,
                  isCompleted: !currentIsCompleted,
                };
              }
              return todo;
            }),
          };
        }
        case "CLEAR_ERROR": {
          return {
            ...prevState,
            error: null
          };
        }
        default: {
          return prevState;
        }
        }
      } catch (error) {
        console.error('Error handling todo action:', error);
        return prevState;
      }
    },
    { todos, error: null }
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
