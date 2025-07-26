import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { TodoList } from "./TodoList";
import { TodoObj } from "@/app/(home)/_types/home";

// Mock the child components
vi.mock("./_components/listItem/ListItem", () => ({
  ListItem: ({ todo, action }: any) => (
    <div data-testid={`list-item-${todo.id}`} data-todo-title={todo.title}>
      <span>Todo: {todo.title}</span>
      <button onClick={() => action(new FormData())}>Action</button>
    </div>
  ),
}));

vi.mock("@/app/_components/_common/_ui/loaders/loadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

vi.mock("@/app/(home)/_utils/todoHelpers", () => ({
  isCompleted: (value: boolean | "true" | "false") => value === true || value === "true",
}));

describe("TodoList", () => {
  const mockAction = vi.fn();

  const createTodoState = (todos: any[]): TodoObj => ({
    todos,
    error: null,
  });

  const mockTodos = [
    { id: 1, title: "Pending Task 1", isCompleted: false },
    { id: 2, title: "Pending Task 2", isCompleted: "false" },
    { id: 3, title: "Completed Task 1", isCompleted: true },
    { id: 4, title: "Completed Task 2", isCompleted: "true" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading State", () => {
    it("should render loading spinner when isPending is true", () => {
      const todoState = createTodoState([]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={true} />);

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render loading spinner with correct container styles", () => {
      const todoState = createTodoState([]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={true} />);

      const container = screen.getByTestId("loading-spinner").parentElement;
      expect(container).toHaveClass("flex", "justify-center", "items-center", "min-h-[400px]");
    });

    it("should not render todos when isPending is true", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={true} />);

      expect(screen.queryByText("Pending Tasks")).not.toBeInTheDocument();
      expect(screen.queryByText("Completed Tasks")).not.toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should render empty state when no todos exist", () => {
      const todoState = createTodoState([]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByText("No tasks yet")).toBeInTheDocument();
      expect(screen.getByText("Create your first task to get started!")).toBeInTheDocument();
    });

    it("should render empty state with icon", () => {
      const todoState = createTodoState([]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const svg = screen.getByRole("img", { hidden: true });
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("should not render loading spinner in empty state", () => {
      const todoState = createTodoState([]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  describe("Todo Rendering", () => {
    it("should render both pending and completed sections when todos exist", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByText("Pending Tasks")).toBeInTheDocument();
      expect(screen.getByText("Completed Tasks")).toBeInTheDocument();
    });

    it("should correctly separate pending and completed todos", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      // Check pending section
      const pendingSection = screen.getByLabelText("Pending tasks");
      expect(within(pendingSection).getByTestId("list-item-1")).toBeInTheDocument();
      expect(within(pendingSection).getByTestId("list-item-2")).toBeInTheDocument();

      // Check completed section
      const completedSection = screen.getByLabelText("Completed tasks");
      expect(within(completedSection).getByTestId("list-item-3")).toBeInTheDocument();
      expect(within(completedSection).getByTestId("list-item-4")).toBeInTheDocument();
    });

    it("should display correct counts for each section", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      // Check pending count
      const pendingSection = screen.getByText("Pending Tasks").closest("div");
      expect(within(pendingSection!).getByText("2")).toBeInTheDocument();

      // Check completed count
      const completedSection = screen.getByText("Completed Tasks").closest("div");
      expect(within(completedSection!).getByText("2")).toBeInTheDocument();
    });

    it("should pass correct props to ListItem components", () => {
      const todoState = createTodoState([mockTodos[0]]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const listItem = screen.getByTestId("list-item-1");
      expect(listItem).toHaveAttribute("data-todo-title", "Pending Task 1");
      expect(within(listItem).getByText("Todo: Pending Task 1")).toBeInTheDocument();
    });
  });

  describe("Section Visibility", () => {
    it("should only render pending section when no completed todos exist", () => {
      const pendingOnlyTodos = [
        { id: 1, title: "Pending Task 1", isCompleted: false },
        { id: 2, title: "Pending Task 2", isCompleted: false },
      ];
      const todoState = createTodoState(pendingOnlyTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByText("Pending Tasks")).toBeInTheDocument();
      expect(screen.queryByText("Completed Tasks")).not.toBeInTheDocument();
    });

    it("should only render completed section when no pending todos exist", () => {
      const completedOnlyTodos = [
        { id: 1, title: "Completed Task 1", isCompleted: true },
        { id: 2, title: "Completed Task 2", isCompleted: true },
      ];
      const todoState = createTodoState(completedOnlyTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByText("Completed Tasks")).toBeInTheDocument();
      expect(screen.queryByText("Pending Tasks")).not.toBeInTheDocument();
    });

    it("should handle mixed boolean and string completion values", () => {
      const mixedTodos = [
        { id: 1, title: "Boolean False", isCompleted: false },
        { id: 2, title: "String False", isCompleted: "false" },
        { id: 3, title: "Boolean True", isCompleted: true },
        { id: 4, title: "String True", isCompleted: "true" },
      ];
      const todoState = createTodoState(mixedTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      // Should have 2 pending and 2 completed
      const pendingSection = screen.getByText("Pending Tasks").closest("div");
      expect(within(pendingSection!).getByText("2")).toBeInTheDocument();

      const completedSection = screen.getByText("Completed Tasks").closest("div");
      expect(within(completedSection!).getByText("2")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels for list sections", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByLabelText("Pending tasks")).toBeInTheDocument();
      expect(screen.getByLabelText("Completed tasks")).toBeInTheDocument();
    });

    it("should have proper role attributes", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const pendingList = screen.getByLabelText("Pending tasks");
      expect(pendingList).toHaveAttribute("role", "list");

      const completedList = screen.getByLabelText("Completed tasks");
      expect(completedList).toHaveAttribute("role", "list");
    });

    it("should have listitem role for each todo", () => {
      const todoState = createTodoState([mockTodos[0]]);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(1);
    });

    it("should have proper heading structure", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const pendingHeading = screen.getByRole("heading", { name: "Pending Tasks" });
      expect(pendingHeading.tagName).toBe("H2");

      const completedHeading = screen.getByRole("heading", { name: "Completed Tasks" });
      expect(completedHeading.tagName).toBe("H2");
    });
  });

  describe("Animation and Styling", () => {
    it("should apply animation delay to list items", () => {
      const todoState = createTodoState(mockTodos.slice(0, 2)); // First 2 todos
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const firstItem = screen.getByTestId("list-item-1").parentElement;
      const secondItem = screen.getByTestId("list-item-2").parentElement;

      expect(firstItem).toHaveStyle({ animationDelay: "0s" });
      expect(secondItem).toHaveStyle({ animationDelay: "0.1s" });
    });

    it("should have correct CSS classes for styling", () => {
      const todoState = createTodoState(mockTodos);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      const container = screen.getByText("Pending Tasks").closest("div")?.parentElement?.parentElement;
      expect(container).toHaveClass("w-full", "max-w-4xl", "mx-auto", "space-y-8");
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined todos gracefully", () => {
      const todoState = { todos: [], error: null };
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      expect(screen.getByText("No tasks yet")).toBeInTheDocument();
    });

    it("should handle todos with undefined completion status", () => {
      const todosWithUndefined = [
        { id: 1, title: "Task 1", isCompleted: undefined as any },
      ];
      const todoState = createTodoState(todosWithUndefined);
      
      render(<TodoList todoState={todoState} action={mockAction} isPending={false} />);

      // Should treat undefined as pending (falsy)
      expect(screen.getByText("Pending Tasks")).toBeInTheDocument();
      expect(screen.queryByText("Completed Tasks")).not.toBeInTheDocument();
    });

    it("should re-render when todoState changes", () => {
      const initialState = createTodoState([]);
      const { rerender } = render(<TodoList todoState={initialState} action={mockAction} isPending={false} />);

      expect(screen.getByText("No tasks yet")).toBeInTheDocument();

      const newState = createTodoState([mockTodos[0]]);
      rerender(<TodoList todoState={newState} action={mockAction} isPending={false} />);

      expect(screen.queryByText("No tasks yet")).not.toBeInTheDocument();
      expect(screen.getByText("Pending Tasks")).toBeInTheDocument();
    });
  });
});