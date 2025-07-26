import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "./TodoForm";
import { TodoFields, TodoFormType } from "@/app/(home)/_types/home";

// Mock the child components
vi.mock("@/app/_components/_common/_ui/buttons/baseButton/BaseButton", () => ({
  BaseButton: ({ children, isPending, type, ...props }: any) => (
    <button 
      type={type}
      disabled={isPending}
      data-testid="submit-button"
      data-pending={isPending}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock("@/app/_components/_common/_ui/messages/errorMessage/ErrorMessage", () => ({
  ErrorMessage: ({ children }: any) => (
    children ? <div data-testid="error-message">{children}</div> : null
  ),
}));

vi.mock("@/app/_components/_common/_ui/radioGroups/radioGroup/RadioGroup", () => ({
  RadioGroup: ({ fields }: any) => (
    <div data-testid="radio-group">
      <input 
        type="radio" 
        name="isCompleted" 
        value="false" 
        id="pending"
        data-testid="radio-pending"
      />
      <label htmlFor="pending">Pending</label>
      <input 
        type="radio" 
        name="isCompleted" 
        value="true" 
        id="completed"
        data-testid="radio-completed"
      />
      <label htmlFor="completed">Completed</label>
    </div>
  ),
}));

describe("TodoForm", () => {
  const mockAction = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    action: mockAction,
    isPending: false,
    form: {
      id: "test-form",
      onSubmit: mockOnSubmit,
    } as TodoFormType,
    fields: {
      title: {
        key: "title-key",
        name: "title",
        errors: undefined,
      },
      isCompleted: {
        key: "isCompleted-key", 
        name: "isCompleted",
        errors: undefined,
      },
    } as TodoFields,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the form with all required elements", () => {
      render(<TodoForm {...defaultProps} />);

      expect(screen.getByText("Create New Task")).toBeInTheDocument();
      expect(screen.getByText("Add a new task to your todo list")).toBeInTheDocument();
      expect(screen.getByLabelText("Task Title")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByTestId("radio-group")).toBeInTheDocument();
      expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });

    it("should render with correct form attributes", () => {
      render(<TodoForm {...defaultProps} />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("id", "test-form");
      expect(form).toHaveAttribute("novalidate");
    });

    it("should render hidden actionType input with ADD value", () => {
      render(<TodoForm {...defaultProps} />);

      const hiddenInput = screen.getByDisplayValue("ADD");
      expect(hiddenInput).toHaveAttribute("type", "text");
      expect(hiddenInput).toHaveAttribute("name", "actionType");
      expect(hiddenInput).toHaveAttribute("hidden");
    });

    it("should render title input with correct attributes", () => {
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      expect(titleInput).toHaveAttribute("type", "text");
      expect(titleInput).toHaveAttribute("name", "title");
      expect(titleInput).toHaveAttribute("id", "title");
      expect(titleInput).toHaveAttribute("required");
      expect(titleInput).toHaveAttribute("maxLength", "200");
      expect(titleInput).toHaveAttribute("placeholder", "What needs to be done?");
    });
  });

  describe("Form Interaction", () => {
    it("should allow typing in the title input", async () => {
      const user = userEvent.setup();
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      await user.type(titleInput, "Test todo item");

      expect(titleInput).toHaveValue("Test todo item");
    });

    it("should call onSubmit when form is submitted", async () => {
      const user = userEvent.setup();
      render(<TodoForm {...defaultProps} />);

      const form = screen.getByRole("form");
      await user.click(screen.getByTestId("submit-button"));

      expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("should respect maxLength attribute", async () => {
      const user = userEvent.setup();
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      const longText = "a".repeat(250); // Exceeds maxLength of 200
      
      await user.type(titleInput, longText);
      
      // Browser should enforce maxLength
      expect(titleInput.value.length).toBeLessThanOrEqual(200);
    });
  });

  describe("Pending State", () => {
    it("should disable submit button when isPending is true", () => {
      render(<TodoForm {...defaultProps} isPending={true} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveAttribute("data-pending", "true");
      expect(submitButton).toBeDisabled();
    });

    it("should enable submit button when isPending is false", () => {
      render(<TodoForm {...defaultProps} isPending={false} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveAttribute("data-pending", "false");
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("Error Handling", () => {
    it("should display title error message when present", () => {
      const propsWithTitleError = {
        ...defaultProps,
        fields: {
          ...defaultProps.fields,
          title: {
            ...defaultProps.fields.title,
            errors: ["Title is required"],
          },
        },
      };

      render(<TodoForm {...propsWithTitleError} />);

      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });

    it("should display isCompleted error message when present", () => {
      const propsWithStatusError = {
        ...defaultProps,
        fields: {
          ...defaultProps.fields,
          isCompleted: {
            ...defaultProps.fields.isCompleted,
            errors: ["Please select a status"],
          },
        },
      };

      render(<TodoForm {...propsWithStatusError} />);

      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText("Please select a status")).toBeInTheDocument();
    });

    it("should set aria-describedby when title has errors", () => {
      const propsWithTitleError = {
        ...defaultProps,
        fields: {
          ...defaultProps.fields,
          title: {
            ...defaultProps.fields.title,
            errors: ["Title is required"],
          },
        },
      };

      render(<TodoForm {...propsWithTitleError} />);

      const titleInput = screen.getByLabelText("Task Title");
      expect(titleInput).toHaveAttribute("aria-describedby", "title-error");
    });

    it("should not set aria-describedby when title has no errors", () => {
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      expect(titleInput).not.toHaveAttribute("aria-describedby");
    });
  });

  describe("Accessibility", () => {
    it("should have proper form structure with fieldset and legend", () => {
      render(<TodoForm {...defaultProps} />);

      const fieldset = screen.getByRole("group", { name: "Status" });
      expect(fieldset).toBeInTheDocument();
      
      const legend = screen.getByText("Status");
      expect(legend.tagName).toBe("LEGEND");
    });

    it("should have proper label association", () => {
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      expect(titleInput).toHaveAttribute("id", "title");
    });

    it("should have required attribute for accessibility tools", () => {
      render(<TodoForm {...defaultProps} />);

      const titleInput = screen.getByLabelText("Task Title");
      expect(titleInput).toHaveAttribute("required");
    });
  });

  describe("Component Integration", () => {
    it("should pass correct props to BaseButton", () => {
      render(<TodoForm {...defaultProps} isPending={true} />);

      const submitButton = screen.getByTestId("submit-button");
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveAttribute("data-pending", "true");
      expect(screen.getByText("Add Task")).toBeInTheDocument();
    });

    it("should pass fields to RadioGroup", () => {
      render(<TodoForm {...defaultProps} />);

      expect(screen.getByTestId("radio-group")).toBeInTheDocument();
      expect(screen.getByTestId("radio-pending")).toBeInTheDocument();
      expect(screen.getByTestId("radio-completed")).toBeInTheDocument();
    });

    it("should render submit button with icon", () => {
      render(<TodoForm {...defaultProps} />);

      const svg = screen.getByTestId("submit-button").querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });
});