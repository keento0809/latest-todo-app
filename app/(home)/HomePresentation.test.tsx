import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePresentation, HomePresentationProps } from "./HomePresentation";
import { TodoObj, TodoFormType, TodoFields } from "@/app/(home)/_types/home";

// Mock child components
vi.mock("./_components/todoForm/TodoForm", () => ({
  TodoForm: ({ action, isPending, form, fields }: any) => (
    <div data-testid="todo-form">
      <div data-testid="form-action">{action ? "has-action" : "no-action"}</div>
      <div data-testid="form-pending">{isPending ? "pending" : "not-pending"}</div>
      <div data-testid="form-form">{form ? "has-form" : "no-form"}</div>
      <div data-testid="form-fields">{fields ? "has-fields" : "no-fields"}</div>
    </div>
  ),
}));

vi.mock("./_components/todoList/TodoList", () => ({
  TodoList: ({ todoState, action, isPending }: any) => (
    <div data-testid="todo-list">
      <div data-testid="list-state">{todoState ? "has-state" : "no-state"}</div>
      <div data-testid="list-action">{action ? "has-action" : "no-action"}</div>
      <div data-testid="list-pending">{isPending ? "pending" : "not-pending"}</div>
    </div>
  ),
}));

describe("HomePresentation", () => {
  const mockSetStateAction = vi.fn();
  const mockForm = {} as TodoFormType;
  const mockFields = {} as TodoFields;

  const baseTodoState: TodoObj = {
    todos: [],
    error: null,
    isLoading: false,
  };

  const baseProps: HomePresentationProps = {
    todoState: baseTodoState,
    setStateAction: mockSetStateAction,
    isPending: false,
    form: mockForm,
    fields: mockFields,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the main title", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByText("LatestTodo")).toBeInTheDocument();
    });

    it("should render the description text", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getAllByText(
        "Organize your tasks beautifully and boost your productivity with our modern todo application."
      )[0]).toBeInTheDocument();
    });

    it("should render TodoForm component", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByTestId("todo-form")).toBeInTheDocument();
    });

    it("should render TodoList component", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    });

    it("should have correct main container structure", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("w-full", "space-y-12");
    });
  });

  describe("Header Section", () => {
    it("should render header with correct styling", () => {
      render(<HomePresentation {...baseProps} />);

      const title = screen.getByText("LatestTodo");
      expect(title).toHaveClass("text-3xl", "lg:text-4xl", "font-bold", "text-gradient");
    });

    it("should have correct header layout classes", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const headerSection = container.querySelector(".text-center.space-y-4.mb-12");
      expect(headerSection).toBeInTheDocument();
    });

    it("should render description with correct styling", () => {
      render(<HomePresentation {...baseProps} />);

      const description = screen.getAllByText(/Organize your tasks beautifully/)[0];
      expect(description).toHaveClass("text-lg", "text-neutral-600", "max-w-2xl", "mx-auto");
    });
  });

  describe("Error Handling", () => {
    it("should not render error message when error is null", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.queryByRole("button", { name: /dismiss error/i })).not.toBeInTheDocument();
    });

    it("should render error message when error exists", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Something went wrong",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("should render dismiss button when error exists", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error message",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      expect(dismissButton).toBeInTheDocument();
      expect(dismissButton).toHaveTextContent("✕");
    });

    it("should call setStateAction with CLEAR_ERROR when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error message",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      await user.click(dismissButton);

      expect(mockSetStateAction).toHaveBeenCalledWith(expect.any(FormData));
      
      // Check FormData content
      const callArgs = mockSetStateAction.mock.calls[0][0] as FormData;
      expect(callArgs.get("actionType")).toBe("CLEAR_ERROR");
    });

    it("should have correct error styling", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const errorContainer = screen.getByText("Test error").closest("div");
      expect(errorContainer).toHaveClass(
        "bg-error-50", "border", "border-error-200", "text-error-700",
        "px-4", "py-3", "rounded-lg", "flex", "items-center", "justify-between"
      );
    });

    it("should have correct dismiss button styling", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      expect(dismissButton).toHaveClass(
        "text-error-500", "hover:text-error-700", "ml-4"
      );
    });
  });

  describe("Layout Grid", () => {
    it("should render grid container with correct classes", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const gridContainer = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-2.gap-8");
      expect(gridContainer).toBeInTheDocument();
    });

    it("should render TodoForm in first grid item with correct order", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const formContainer = screen.getByTestId("todo-form").closest("div");
      expect(formContainer).toHaveClass("order-2", "lg:order-1");
    });

    it("should render TodoList in second grid item with correct order", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const listContainer = screen.getByTestId("todo-list").closest("div");
      expect(listContainer).toHaveClass("order-1", "lg:order-2");
    });
  });

  describe("Component Props Passing", () => {
    it("should pass correct props to TodoForm", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByTestId("form-action")).toHaveTextContent("has-action");
      expect(screen.getByTestId("form-pending")).toHaveTextContent("not-pending");
      expect(screen.getByTestId("form-form")).toHaveTextContent("has-form");
      expect(screen.getByTestId("form-fields")).toHaveTextContent("has-fields");
    });

    it("should pass correct props to TodoList", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByTestId("list-state")).toHaveTextContent("has-state");
      expect(screen.getByTestId("list-action")).toHaveTextContent("has-action");
      expect(screen.getByTestId("list-pending")).toHaveTextContent("not-pending");
    });

    it("should pass isPending state correctly when true", () => {
      const pendingProps = {
        ...baseProps,
        isPending: true,
      };

      render(<HomePresentation {...pendingProps} />);

      expect(screen.getByTestId("form-pending")).toHaveTextContent("pending");
      expect(screen.getByTestId("list-pending")).toHaveTextContent("pending");
    });

    it("should pass todoState to TodoList correctly", () => {
      const stateWithTodos = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          todos: [{ id: 1, title: "Test todo", isCompleted: false }],
        },
      };

      render(<HomePresentation {...stateWithTodos} />);

      expect(screen.getByTestId("list-state")).toHaveTextContent("has-state");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(<HomePresentation {...baseProps} />);

      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent("LatestTodo");
    });

    it("should have accessible dismiss button when error exists", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      expect(dismissButton).toHaveAttribute("aria-label", "Dismiss error");
    });

    it("should have semantic structure", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer.tagName).toBe("DIV");
    });
  });

  describe("Error Message Functionality", () => {
    it("should handle dismiss action with proper FormData structure", () => {
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error message",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      fireEvent.click(dismissButton);

      expect(mockSetStateAction).toHaveBeenCalledTimes(1);
      const formData = mockSetStateAction.mock.calls[0][0] as FormData;
      expect(formData.get("actionType")).toBe("CLEAR_ERROR");
    });

    it("should handle multiple error dismissals", async () => {
      const user = userEvent.setup();
      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "Test error",
        },
      };

      render(<HomePresentation {...propsWithError} />);

      const dismissButton = screen.getByRole("button", { name: /dismiss error/i });
      
      await user.click(dismissButton);
      await user.click(dismissButton);

      expect(mockSetStateAction).toHaveBeenCalledTimes(2);
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive grid classes", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const gridContainer = container.querySelector(".grid-cols-1.lg\\:grid-cols-2");
      expect(gridContainer).toBeInTheDocument();
    });

    it("should have responsive order classes for form", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const formContainer = screen.getByTestId("todo-form").closest("div");
      expect(formContainer).toHaveClass("order-2", "lg:order-1");
    });

    it("should have responsive order classes for list", () => {
      const { container } = render(<HomePresentation {...baseProps} />);

      const listContainer = screen.getByTestId("todo-list").closest("div");
      expect(listContainer).toHaveClass("order-1", "lg:order-2");
    });

    it("should have responsive title classes", () => {
      render(<HomePresentation {...baseProps} />);

      const title = screen.getByText("LatestTodo");
      expect(title).toHaveClass("text-3xl", "lg:text-4xl");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty error string", () => {
      const propsWithEmptyError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "",
        },
      };

      render(<HomePresentation {...propsWithEmptyError} />);

      expect(screen.queryByRole("button", { name: /dismiss error/i })).not.toBeInTheDocument();
    });

    it("should handle long error messages", () => {
      const longError = "This is a very long error message that should still be displayed properly in the error container without breaking the layout";
      const propsWithLongError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: longError,
        },
      };

      render(<HomePresentation {...propsWithLongError} />);

      expect(screen.getByText(longError)).toBeInTheDocument();
    });

    it("should handle null props gracefully", () => {
      const propsWithNulls = {
        ...baseProps,
        form: null as any,
        fields: null as any,
      };

      expect(() => render(<HomePresentation {...propsWithNulls} />)).not.toThrow();
    });
  });

  describe("Component State", () => {
    it("should maintain component structure across re-renders", () => {
      const { rerender } = render(<HomePresentation {...baseProps} />);

      expect(screen.getByText("LatestTodo")).toBeInTheDocument();
      expect(screen.getByTestId("todo-form")).toBeInTheDocument();
      expect(screen.getByTestId("todo-list")).toBeInTheDocument();

      const newProps = {
        ...baseProps,
        isPending: true,
      };

      rerender(<HomePresentation {...newProps} />);

      expect(screen.getByText("LatestTodo")).toBeInTheDocument();
      expect(screen.getByTestId("todo-form")).toBeInTheDocument();
      expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    });

    it("should update error display when error state changes", () => {
      const { rerender } = render(<HomePresentation {...baseProps} />);

      expect(screen.queryByText("New error")).not.toBeInTheDocument();

      const propsWithError = {
        ...baseProps,
        todoState: {
          ...baseTodoState,
          error: "New error",
        },
      };

      rerender(<HomePresentation {...propsWithError} />);

      expect(screen.getByText("New error")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should integrate TodoForm and TodoList components properly", () => {
      render(<HomePresentation {...baseProps} />);

      const form = screen.getByTestId("todo-form");
      const list = screen.getByTestId("todo-list");

      expect(form).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      
      // Both should be in the same grid container
      const gridContainer = form.closest(".grid");
      expect(gridContainer).toContain(list.parentElement);
    });

    it("should pass the same setStateAction to both child components", () => {
      render(<HomePresentation {...baseProps} />);

      expect(screen.getByTestId("form-action")).toHaveTextContent("has-action");
      expect(screen.getByTestId("list-action")).toHaveTextContent("has-action");
    });

    it("should coordinate pending state between components", () => {
      const pendingProps = {
        ...baseProps,
        isPending: true,
      };

      render(<HomePresentation {...pendingProps} />);

      expect(screen.getByTestId("form-pending")).toHaveTextContent("pending");
      expect(screen.getByTestId("list-pending")).toHaveTextContent("pending");
    });
  });
});