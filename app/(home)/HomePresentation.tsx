"use client";

import { TodoForm } from "./_components/todoForm/TodoForm";
import { TodoList } from "./_components/todoList/TodoList";
import { TodoFields, TodoFormType, TodoObj } from "@/app/(home)/_types/home";

export type HomePresentationProps = {
  todoState: TodoObj;
  setStateAction: (payload: FormData) => void;
  isPending: boolean;
  form: TodoFormType;
  fields: TodoFields;
};

export const HomePresentation = ({
  todoState,
  setStateAction,
  isPending,
  form,
  fields,
}: HomePresentationProps) => {
  return (
    <div className="w-full space-y-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl lg:text-6xl font-bold text-gradient">
          LatestTodo
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Organize your tasks beautifully and boost your productivity with our modern todo application.
        </p>
      </div>
      
      <TodoForm
        action={setStateAction}
        isPending={isPending}
        form={form}
        fields={fields}
      />
      
      <TodoList
        todoState={todoState}
        action={setStateAction}
        isPending={isPending}
      />
    </div>
  );
};
