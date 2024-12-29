import { TodoObj } from "@/app/Home";

type TodoListProps = {
  todoState: TodoObj;
};

export const TodoList = ({ todoState }: TodoListProps) => {
  return (
    <ul className="min-h-[400px]">
      {todoState.todos.map((todo, index) => (
        <li
          key={todo + index}
          className="text-slate-800 py-2 border-b border-purple-500"
        >
          {todo}
        </li>
      ))}
    </ul>
  );
};
