export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface TodoObj {
  todos: Todo[];
}
