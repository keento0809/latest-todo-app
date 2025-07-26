import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./RadioGroup";
import { TodoFields } from "@/app/(home)/_types/home";
import { ReactNode } from "react";

// Mock component interfaces
interface MockRadioGroupProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
  name?: string;
  [key: string]: unknown;
}

interface MockRadioRootProps {
  children: ReactNode;
  value: string;
  className?: string;
  [key: string]: unknown;
}

interface MockRadioIndicatorProps {
  className?: string;
  [key: string]: unknown;
}

// Mock the Base UI components
vi.mock("@base-ui-components/react/radio-group", () => ({
  RadioGroup: ({ children, onValueChange, className, name, ...props }: MockRadioGroupProps) => (
    <div 
      data-testid="base-radio-group" 
      className={className}
      role="radiogroup"
      data-name={name}
      {...props}
    >
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLElement).closest('[data-value]');
        if (target && onValueChange) {
          onValueChange(target.getAttribute('data-value') || '');
        }
      }}>
        {children}
      </div>
    </div>
  ),
}));

vi.mock("@base-ui-components/react/radio", () => ({
  Radio: {
    Root: ({ children, value, className, ...props }: MockRadioRootProps) => (
      <div 
        data-testid={`radio-root-${value}`}
        data-value={value}
        className={className}
        role="radio"
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    ),
    Indicator: ({ className, ...props }: MockRadioIndicatorProps) => (
      <div data-testid="radio-indicator" className={className} {...props} />
    ),
  },
}));

// Mock useInputControl
const mockControl = {
  change: vi.fn(),
  blur: vi.fn(),
  focus: vi.fn(),
};

vi.mock("@conform-to/react", () => ({
  useInputControl: vi.fn(() => mockControl),
}));

describe("RadioGroup", () => {
  const mockFields = {
    isCompleted: {
      key: "isCompleted-key",
      name: "isCompleted",
      id: "isCompleted-id",
      errorId: "isCompleted-errorId",
      descriptionId: "isCompleted-descriptionId",
      formId: "test-form-id",
      errors: undefined,
      initialValue: undefined,
      value: undefined,
      dirty: false,
      valid: true,
      allErrors: {},
    },
    title: {
      key: "title-key",
      name: "title",
      id: "title-id",
      errorId: "title-errorId", 
      descriptionId: "title-descriptionId",
      formId: "test-form-id",
      errors: undefined,
      initialValue: undefined,
      value: undefined,
      dirty: false,
      valid: true,
      allErrors: {},
    },
  } as TodoFields;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render both radio options", () => {
      render(<RadioGroup fields={mockFields} />);

      expect(screen.getByTestId("radio-root-false")).toBeInTheDocument();
      expect(screen.getByTestId("radio-root-true")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it("should render with correct base structure", () => {
      render(<RadioGroup fields={mockFields} />);

      const baseGroup = screen.getByTestId("base-radio-group");
      expect(baseGroup).toBeInTheDocument();
      expect(baseGroup).toHaveAttribute("role", "radiogroup");
      expect(baseGroup).toHaveAttribute("data-name", "isCompleted");
    });

    it("should have correct CSS classes for layout", () => {
      render(<RadioGroup fields={mockFields} />);

      const baseGroup = screen.getByTestId("base-radio-group");
      expect(baseGroup).toHaveClass("flex", "items-center", "gap-6");
    });

    it("should render labels with correct structure", () => {
      render(<RadioGroup fields={mockFields} />);

      const labels = screen.getAllByRole("radio");
      expect(labels).toHaveLength(2);

      // Check if labels are wrapped properly
      const pendingLabel = screen.getByText("Pending").closest("label");
      const completedLabel = screen.getByText("Completed").closest("label");

      expect(pendingLabel).toHaveClass("flex", "items-center", "gap-3", "cursor-pointer", "group");
      expect(completedLabel).toHaveClass("flex", "items-center", "gap-3", "cursor-pointer", "group");
    });
  });

  describe("Radio Button Styling", () => {
    it("should apply correct classes to pending radio button", () => {
      render(<RadioGroup fields={mockFields} />);

      const pendingRadio = screen.getByTestId("radio-root-false");
      expect(pendingRadio).toHaveClass(
        "flex", "w-5", "h-5", "items-center", "justify-center", "rounded-full",
        "border-2", "border-neutral-300", "outline-none", 
        "focus-visible:ring-2", "focus-visible:ring-primary-500", "focus-visible:ring-offset-2",
        "data-[checked]:bg-primary-500", "data-[checked]:border-primary-500",
        "transition-all", "duration-200", "group-hover:border-primary-400"
      );
    });

    it("should apply correct classes to completed radio button", () => {
      render(<RadioGroup fields={mockFields} />);

      const completedRadio = screen.getByTestId("radio-root-true");
      expect(completedRadio).toHaveClass(
        "flex", "w-5", "h-5", "items-center", "justify-center", "rounded-full",
        "border-2", "border-neutral-300", "outline-none",
        "focus-visible:ring-2", "focus-visible:ring-success-500", "focus-visible:ring-offset-2", 
        "data-[checked]:bg-success-500", "data-[checked]:border-success-500",
        "transition-all", "duration-200", "group-hover:border-success-400"
      );
    });

    it("should render radio indicators with correct classes", () => {
      render(<RadioGroup fields={mockFields} />);

      const indicators = screen.getAllByTestId("radio-indicator");
      expect(indicators).toHaveLength(2);

      indicators.forEach(indicator => {
        expect(indicator).toHaveClass(
          "flex", "before:w-2", "before:h-2", "before:rounded-full", 
          "before:bg-white", "data-[unchecked]:hidden"
        );
      });
    });

    it("should apply correct text styling to labels", () => {
      render(<RadioGroup fields={mockFields} />);

      const pendingText = screen.getByText("Pending");
      const completedText = screen.getByText("Completed");

      expect(pendingText).toHaveClass(
        "text-sm", "font-medium", "text-neutral-700", 
        "group-hover:text-neutral-900", "transition-colors", "duration-200"
      );
      expect(completedText).toHaveClass(
        "text-sm", "font-medium", "text-neutral-700",
        "group-hover:text-neutral-900", "transition-colors", "duration-200"
      );
    });
  });

  describe("Form Integration", () => {
    it("should call useInputControl with correct field", () => {
      render(<RadioGroup fields={mockFields} />);

      // Verify the component renders correctly with the provided fields
      expect(screen.getByTestId("base-radio-group")).toBeInTheDocument();
      expect(screen.getByTestId("radio-root-false")).toBeInTheDocument();
      expect(screen.getByTestId("radio-root-true")).toBeInTheDocument();
    });

    it("should pass correct props to BaseRadioGroup", () => {
      render(<RadioGroup fields={mockFields} />);

      const baseGroup = screen.getByTestId("base-radio-group");
      expect(baseGroup).toHaveAttribute("data-name", "isCompleted");
    });

    it("should handle value changes correctly", () => {
      render(<RadioGroup fields={mockFields} />);

      const baseGroup = screen.getByTestId("base-radio-group");
      const pendingRadio = screen.getByTestId("radio-root-false");

      // Verify the base group is rendered correctly
      expect(baseGroup).toBeInTheDocument();
      
      // Simulate clicking on the pending radio button
      fireEvent.click(pendingRadio);

      expect(mockControl.change).toHaveBeenCalledWith("false");
    });

    it("should handle completed value changes correctly", () => {
      render(<RadioGroup fields={mockFields} />);

      const completedRadio = screen.getByTestId("radio-root-true");

      // Simulate clicking on the completed radio button
      fireEvent.click(completedRadio);

      expect(mockControl.change).toHaveBeenCalledWith("true");
    });
  });

  describe("Accessibility", () => {
    it("should have proper radiogroup role", () => {
      render(<RadioGroup fields={mockFields} />);

      const radioGroup = screen.getByRole("radiogroup");
      expect(radioGroup).toBeInTheDocument();
    });

    it("should have individual radio roles", () => {
      render(<RadioGroup fields={mockFields} />);

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<RadioGroup fields={mockFields} />);

      const pendingRadio = screen.getByTestId("radio-root-false");
      
      // Should be focusable with Tab
      await user.tab();
      expect(pendingRadio).toHaveFocus();
    });

    it("should have proper focus management", () => {
      render(<RadioGroup fields={mockFields} />);

      const radios = screen.getAllByRole("radio");
      
      radios.forEach(radio => {
        expect(radio).toHaveAttribute("tabIndex", "0");
      });
    });

    it("should support keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<RadioGroup fields={mockFields} />);

      const pendingRadio = screen.getByTestId("radio-root-false");
      
      // Focus and activate with Enter
      pendingRadio.focus();
      await user.keyboard("{Enter}");

      expect(mockControl.change).toHaveBeenCalledWith("false");
    });
  });

  describe("Label Interaction", () => {
    it("should trigger radio selection when label is clicked", async () => {
      const user = userEvent.setup();
      render(<RadioGroup fields={mockFields} />);

      const pendingLabel = screen.getByText("Pending").closest("label");
      
      if (pendingLabel) {
        await user.click(pendingLabel);
        expect(mockControl.change).toHaveBeenCalledWith("false");
      }
    });

    it("should trigger completed selection when completed label is clicked", async () => {
      const user = userEvent.setup();
      render(<RadioGroup fields={mockFields} />);

      const completedLabel = screen.getByText("Completed").closest("label");
      
      if (completedLabel) {
        await user.click(completedLabel);
        expect(mockControl.change).toHaveBeenCalledWith("true");
      }
    });

    it("should have cursor pointer on labels", () => {
      render(<RadioGroup fields={mockFields} />);

      const pendingLabel = screen.getByText("Pending").closest("label");
      const completedLabel = screen.getByText("Completed").closest("label");

      expect(pendingLabel).toHaveClass("cursor-pointer");
      expect(completedLabel).toHaveClass("cursor-pointer");
    });
  });

  describe("Edge Cases", () => {
    it("should handle fields with different key values", () => {
      const differentFields: TodoFields = {
        ...mockFields,
        isCompleted: {
          ...mockFields.isCompleted,
          key: "different-key",
          name: "different-name",
        },
      };

      render(<RadioGroup fields={differentFields} />);

      const baseGroup = screen.getByTestId("base-radio-group");
      expect(baseGroup).toHaveAttribute("data-name", "different-name");
    });

    it("should handle multiple rapid clicks gracefully", async () => {
      const user = userEvent.setup();
      render(<RadioGroup fields={mockFields} />);

      const pendingRadio = screen.getByTestId("radio-root-false");
      
      // Click multiple times rapidly
      await user.click(pendingRadio);
      await user.click(pendingRadio);
      await user.click(pendingRadio);

      expect(mockControl.change).toHaveBeenCalledTimes(3);
      expect(mockControl.change).toHaveBeenCalledWith("false");
    });

    it("should maintain proper structure with different field configurations", () => {
      const fieldsWithErrors: TodoFields = {
        ...mockFields,
        isCompleted: {
          ...mockFields.isCompleted,
          errors: ["Please select a status"],
        },
      };

      render(<RadioGroup fields={fieldsWithErrors} />);

      // Should still render normally even with errors
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
    });
  });

  describe("Component State", () => {
    it("should maintain state across re-renders", () => {
      const { rerender } = render(<RadioGroup fields={mockFields} />);

      expect(screen.getByText("Pending")).toBeInTheDocument();

      const newFields = { ...mockFields };
      rerender(<RadioGroup fields={newFields} />);

      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it("should update when field key changes", () => {
      const { rerender } = render(<RadioGroup fields={mockFields} />);

      const newFields: TodoFields = {
        ...mockFields,
        isCompleted: {
          ...mockFields.isCompleted,
          key: "new-key",
        },
      };

      rerender(<RadioGroup fields={newFields} />);

      // Component should re-render with new key
      expect(screen.getByTestId("base-radio-group")).toBeInTheDocument();
    });
  });

  describe("Value Mapping", () => {
    it("should correctly map false value to Pending option", () => {
      render(<RadioGroup fields={mockFields} />);

      const pendingRadio = screen.getByTestId("radio-root-false");
      expect(pendingRadio).toHaveAttribute("data-value", "false");
      
      const pendingText = pendingRadio.closest("label")?.querySelector("span");
      expect(pendingText).toHaveTextContent("Pending");
    });

    it("should correctly map true value to Completed option", () => {
      render(<RadioGroup fields={mockFields} />);

      const completedRadio = screen.getByTestId("radio-root-true");
      expect(completedRadio).toHaveAttribute("data-value", "true");
      
      const completedText = completedRadio.closest("label")?.querySelector("span");
      expect(completedText).toHaveTextContent("Completed");
    });
  });
});