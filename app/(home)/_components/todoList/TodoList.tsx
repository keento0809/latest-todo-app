import { useMemo } from "react";
import { TodoObj } from "@/app/(home)/_types/home";
import { ListItem } from "./_components/listItem/ListItem";
import { LoadingSpinner } from "@/app/_components/_common/_ui/loaders/loadingSpinner/LoadingSpinner";
import { isCompleted } from "@/app/(home)/_utils/todoHelpers";

type TodoListProps = {
  todoState: TodoObj;
  action: (payload: FormData) => void;
  isPending: boolean;
};

export const TodoList = ({ todoState, action, isPending }: TodoListProps) => {
  const { completedTodos, pendingTodos } = useMemo(() => {
    const completed = todoState.todos.filter(todo => isCompleted(todo.isCompleted));
    const pending = todoState.todos.filter(todo => !isCompleted(todo.isCompleted));
    return { completedTodos: completed, pendingTodos: pending };
  }, [todoState.todos]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (todoState.todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-600 mb-2">No tasks yet</h3>
        <p className="text-neutral-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {pendingTodos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-neutral-800">
              Pending Tasks
            </h2>
            <span className="bg-warning-100 text-warning-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {pendingTodos.length}
            </span>
          </div>
          <div className="grid gap-3" role="list" aria-label="Pending tasks">
            {pendingTodos.map((todo, index) => (
              <div key={todo.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }} role="listitem">
                <ListItem todo={todo} action={action} />
              </div>
            ))}
          </div>
        </section>
      )}

      {completedTodos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-neutral-800">
              Completed Tasks
            </h2>
            <span className="bg-success-100 text-success-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {completedTodos.length}
            </span>
          </div>
          <div className="grid gap-3" role="list" aria-label="Completed tasks">
            {completedTodos.map((todo, index) => (
              <div key={todo.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }} role="listitem">
                <ListItem todo={todo} action={action} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
