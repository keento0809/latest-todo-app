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
        <h1 className="text-3xl lg:text-4xl font-bold text-gradient">
          LatestTodo
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Organize your tasks beautifully and boost your productivity with our modern todo application.
        </p>
      </div>
      
      {todoState.error && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{todoState.error}</span>
            <button
              onClick={() => {
                const formData = new FormData();
                formData.append('actionType', 'CLEAR_ERROR');
                setStateAction(formData);
              }}
              className="text-error-500 hover:text-error-700 ml-4"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1">
          <TodoForm
            action={setStateAction}
            isPending={isPending}
            form={form}
            fields={fields}
          />
        </div>
        
        <div className="order-1 lg:order-2">
          <TodoList
            todoState={todoState}
            action={setStateAction}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
};
