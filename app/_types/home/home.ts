export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface TodoObj {
  todos: Todo[];
}
