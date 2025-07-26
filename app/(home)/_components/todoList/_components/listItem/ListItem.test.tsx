import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ListItem } from "./ListItem";
import { Todo } from "@/app/(home)/_types/home";
import { ReactNode } from "react";

// Mock component interfaces
interface MockPlusIconProps {
  className?: string;
}

interface MockEditableTitleProps {
  todo: Todo;
  action: (payload: FormData) => void;
}

interface MockDeleteDialogProps {
  todo: Todo;
  action: (payload: FormData) => void;
}

interface MockAlertDialogRootProps {
  children: ReactNode;
}

interface MockAlertDialogTriggerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Mock the child components
vi.mock("@/app/_components/_icons/plusIcon/PlusIcon", () => ({
  PlusIcon: ({ className }: MockPlusIconProps) => (
    <div data-testid="plus-icon" className={className}>+</div>
  ),
}));

vi.mock("@/app/_components/_common/_ui/titles/editableTitle/EditableTitle", () => ({
  EditableTitle: ({ todo, action }: MockEditableTitleProps) => (
    <div data-testid="editable-title" data-todo-id={todo.id}>
      <span>{todo.title}</span>
      <button onClick={() => action(new FormData())}>Edit</button>
    </div>
  ),
}));

vi.mock("@/app/_components/_common/_ui/dialogs/deleteDialog/DeleteDialog", () => ({
  DeleteDialog: ({ todo }: MockDeleteDialogProps) => (
    <div data-testid="delete-dialog" data-todo-id={todo.id}>
      Delete Dialog for {todo.title}
    </div>
  ),
}));

vi.mock("@base-ui-components/react/alert-dialog", () => ({
  AlertDialog: {
    Root: ({ children }: MockAlertDialogRootProps) => <div data-testid="alert-dialog-root">{children}</div>,
    Trigger: ({ children, className, ...props }: MockAlertDialogTriggerProps) => (
      <button data-testid="alert-dialog-trigger" className={className} {...props}>
        {children}
      </button>
    ),
  },
}));

vi.mock("@/app/(home)/_utils/todoHelpers", () => ({
  isCompleted: (value: boolean | "true" | "false") => value === true || value === "true",
}));

// Mock startTransition
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    startTransition: (callback: () => void) => callback(),
  };
});

describe("ListItem", () => {
  const mockAction = vi.fn();

  const pendingTodo: Todo = {
    id: 1,
    title: "Test Pending Todo",
    isCompleted: false as const,
  };

  const completedTodo: Todo = {
    id: 2,
    title: "Test Completed Todo", 
    isCompleted: true as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all required elements", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      expect(screen.getByRole("button", { name: "Mark as complete" })).toBeInTheDocument();
      expect(screen.getByTestId("editable-title")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByTestId("alert-dialog-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("delete-dialog")).toBeInTheDocument();
    });

    it("should render todo title through EditableTitle", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const editableTitle = screen.getByTestId("editable-title");
      expect(editableTitle).toHaveAttribute("data-todo-id", "1");
      expect(screen.getByText("Test Pending Todo")).toBeInTheDocument();
    });

    it("should render delete dialog with correct props", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const deleteDialog = screen.getByTestId("delete-dialog");
      expect(deleteDialog).toHaveAttribute("data-todo-id", "1");
      expect(screen.getByText("Delete Dialog for Test Pending Todo")).toBeInTheDocument();
    });
  });

  describe("Completion Status", () => {
    it("should render pending todo correctly", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      expect(toggleButton).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument(); // No checkmark
    });

    it("should render completed todo correctly", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as pending" });
      expect(toggleButton).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
      
      // Should have checkmark icon
      const checkmark = toggleButton.querySelector("svg");
      expect(checkmark).toBeInTheDocument();
      expect(checkmark).toHaveAttribute("viewBox", "0 0 20 20");
    });

    it("should handle string completion values", () => {
      const stringCompletedTodo: Todo = {
        id: 3,
        title: "String Completed",
        isCompleted: "true",
      };

      render(<ListItem todo={stringCompletedTodo} action={mockAction} />);

      expect(screen.getByRole("button", { name: "Mark as pending" })).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it("should handle string pending values", () => {
      const stringPendingTodo: Todo = {
        id: 4,
        title: "String Pending",
        isCompleted: "false",
      };

      render(<ListItem todo={stringPendingTodo} action={mockAction} />);

      expect(screen.getByRole("button", { name: "Mark as complete" })).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });
  });

  describe("Toggle Functionality", () => {
    it("should call action with correct FormData when toggling pending todo", async () => {
      const user = userEvent.setup();
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      await user.click(toggleButton);

      expect(mockAction).toHaveBeenCalledTimes(1);
      
      const formData = mockAction.mock.calls[0][0];
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get("actionType")).toBe("TOGGLE");
      expect(formData.get("todoId")).toBe("1");
    });

    it("should call action with correct FormData when toggling completed todo", async () => {
      const user = userEvent.setup();
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as pending" });
      await user.click(toggleButton);

      expect(mockAction).toHaveBeenCalledTimes(1);
      
      const formData = mockAction.mock.calls[0][0];
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get("actionType")).toBe("TOGGLE");
      expect(formData.get("todoId")).toBe("2");
    });

    it("should handle rapid clicking gracefully", async () => {
      const user = userEvent.setup();
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      
      // Click multiple times rapidly
      await user.click(toggleButton);
      await user.click(toggleButton);
      await user.click(toggleButton);

      expect(mockAction).toHaveBeenCalledTimes(3);
    });
  });

  describe("Styling and CSS Classes", () => {
    it("should apply correct classes for pending todo", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const container = screen.getByText("Test Pending Todo").closest(".card");
      expect(container).toHaveClass("card", "group", "transition-all", "duration-300");
      expect(container).not.toHaveClass("opacity-75", "bg-neutral-50");
    });

    it("should apply correct classes for completed todo", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const container = screen.getByText("Test Completed Todo").closest(".card");
      expect(container).toHaveClass("card", "group", "transition-all", "duration-300", "opacity-75", "bg-neutral-50");
    });

    it("should apply correct button classes for pending todo", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      expect(toggleButton).toHaveClass(
        "flex-shrink-0", "w-5", "h-5", "rounded-full", "border-2",
        "border-neutral-300", "hover:border-primary-400", "focus:ring-primary-500"
      );
    });

    it("should apply correct button classes for completed todo", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as pending" });
      expect(toggleButton).toHaveClass(
        "flex-shrink-0", "w-5", "h-5", "rounded-full", "border-2",
        "bg-success-500", "border-success-500", "focus:ring-success-500"
      );
    });

    it("should apply correct status badge classes", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const statusBadge = screen.getByText("Pending");
      expect(statusBadge).toHaveClass(
        "px-3", "py-1", "text-xs", "font-medium", "rounded-full",
        "bg-warning-100", "text-warning-700"
      );
    });

    it("should apply correct completed status badge classes", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const statusBadge = screen.getByText("Completed");
      expect(statusBadge).toHaveClass(
        "px-3", "py-1", "text-xs", "font-medium", "rounded-full",
        "bg-success-100", "text-success-700"
      );
    });
  });

  describe("Delete Dialog Integration", () => {
    it("should render delete trigger button with correct styling", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const deleteTrigger = screen.getByTestId("alert-dialog-trigger");
      expect(deleteTrigger).toHaveClass(
        "p-2", "rounded-lg", "text-neutral-400", "hover:text-error-500",
        "hover:bg-error-50", "transition-all", "duration-200", "opacity-0", "group-hover:opacity-100"
      );
    });

    it("should render plus icon with correct rotation", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const plusIcon = screen.getByTestId("plus-icon");
      expect(plusIcon).toHaveClass("w-4", "h-4", "rotate-45");
    });

    it("should wrap delete components in AlertDialog.Root", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      expect(screen.getByTestId("alert-dialog-root")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have correct aria-label for pending todo", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      expect(toggleButton).toHaveAttribute("aria-label", "Mark as complete");
    });

    it("should have correct aria-label for completed todo", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as pending" });
      expect(toggleButton).toHaveAttribute("aria-label", "Mark as pending");
    });

    it("should have proper focus management", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      expect(toggleButton).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-offset-2");
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      
      await user.tab();
      expect(toggleButton).toHaveFocus();
      
      await user.keyboard("{Enter}");
      expect(mockAction).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle string false completion status", () => {
      const stringFalseTodo: Todo = {
        id: 5,
        title: "String False Status",
        isCompleted: "false" as const,
      };

      render(<ListItem todo={stringFalseTodo} action={mockAction} />);

      // Should treat "false" string as pending
      expect(screen.getByRole("button", { name: "Mark as complete" })).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("should handle very long todo titles", () => {
      const longTitleTodo: Todo = {
        id: 6,
        title: "This is a very long todo title that should be handled properly by the component without breaking the layout",
        isCompleted: false,
      };

      render(<ListItem todo={longTitleTodo} action={mockAction} />);

      expect(screen.getByText(longTitleTodo.title)).toBeInTheDocument();
      
      // Check that the title container has proper overflow handling
      const titleContainer = screen.getByTestId("editable-title").parentElement;
      expect(titleContainer).toHaveClass("flex-1", "min-w-0");
    });

    it("should handle numeric string IDs correctly", () => {
      const numericStringTodo: Todo = {
        id: 999,
        title: "Numeric ID Todo",
        isCompleted: false,
      };

      render(<ListItem todo={numericStringTodo} action={mockAction} />);

      const toggleButton = screen.getByRole("button", { name: "Mark as complete" });
      fireEvent.click(toggleButton);

      const formData = mockAction.mock.calls[0][0];
      expect(formData.get("todoId")).toBe("999");
    });
  });

  describe("Component Integration", () => {
    it("should pass correct props to EditableTitle", () => {
      render(<ListItem todo={pendingTodo} action={mockAction} />);

      const editableTitle = screen.getByTestId("editable-title");
      expect(editableTitle).toHaveAttribute("data-todo-id", "1");
    });

    it("should pass correct props to DeleteDialog", () => {
      render(<ListItem todo={completedTodo} action={mockAction} />);

      const deleteDialog = screen.getByTestId("delete-dialog");
      expect(deleteDialog).toHaveAttribute("data-todo-id", "2");
      expect(screen.getByText("Delete Dialog for Test Completed Todo")).toBeInTheDocument();
    });

    it("should maintain component state after re-renders", () => {
      const { rerender } = render(<ListItem todo={pendingTodo} action={mockAction} />);

      expect(screen.getByText("Pending")).toBeInTheDocument();

      rerender(<ListItem todo={completedTodo} action={mockAction} />);

      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.queryByText("Pending")).not.toBeInTheDocument();
    });
  });
});