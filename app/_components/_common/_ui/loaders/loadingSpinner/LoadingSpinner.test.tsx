import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  describe("Rendering", () => {
    it("should render the loading spinner", () => {
      render(<LoadingSpinner />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should render with correct structure", () => {
      render(<LoadingSpinner />);

      const container = screen.getByText("Loading...").closest("div");
      expect(container).toBeInTheDocument();
    });

    it("should render spinner elements", () => {
      const { container } = render(<LoadingSpinner />);

      // Should have two spinner divs for the loading animation
      const spinnerDivs = container.querySelectorAll("div[class*='animate-spin']");
      expect(spinnerDivs).toHaveLength(2);
    });

    it("should render loading text", () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toBeInTheDocument();
      expect(loadingText.tagName).toBe("P");
    });
  });

  describe("Styling and CSS Classes", () => {
    it("should have correct container classes", () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        "flex", "flex-col", "items-center", "justify-center", "py-12"
      );
    });

    it("should have correct spinner container classes", () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerContainer = container.querySelector(".relative");
      expect(spinnerContainer).toBeInTheDocument();
      expect(spinnerContainer).toHaveClass("relative");
    });

    it("should have correct outer spinner classes", () => {
      const { container } = render(<LoadingSpinner />);

      const outerSpinner = container.querySelector("div[class*='border-primary-200']");
      expect(outerSpinner).toBeInTheDocument();
      expect(outerSpinner).toHaveClass(
        "w-12", "h-12", "border-4", "border-primary-200", 
        "rounded-full", "animate-spin"
      );
    });

    it("should have correct inner spinner classes", () => {
      const { container } = render(<LoadingSpinner />);

      const innerSpinner = container.querySelector("div[class*='border-t-primary-500']");
      expect(innerSpinner).toBeInTheDocument();
      expect(innerSpinner).toHaveClass(
        "absolute", "top-0", "left-0", "w-12", "h-12", "border-4",
        "border-transparent", "border-t-primary-500", "rounded-full", "animate-spin"
      );
    });

    it("should have correct loading text classes", () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toHaveClass(
        "mt-4", "text-sm", "text-neutral-600", "animate-pulse-soft"
      );
    });
  });

  describe("Accessibility", () => {
    it("should be accessible to screen readers", () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toBeInTheDocument();
    });

    it("should provide appropriate loading indication", () => {
      render(<LoadingSpinner />);

      // The text "Loading..." should be readable by screen readers
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should have semantic structure", () => {
      const { container } = render(<LoadingSpinner />);

      // Should have a proper container structure
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer.tagName).toBe("DIV");
    });
  });

  describe("Animation", () => {
    it("should have spinning animation classes", () => {
      const { container } = render(<LoadingSpinner />);

      const spinningElements = container.querySelectorAll(".animate-spin");
      expect(spinningElements).toHaveLength(2);
    });

    it("should have pulse animation on text", () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toHaveClass("animate-pulse-soft");
    });

    it("should render both spinner layers for visual effect", () => {
      const { container } = render(<LoadingSpinner />);

      // Base spinner layer
      const baseSpinner = container.querySelector(".border-primary-200");
      expect(baseSpinner).toBeInTheDocument();

      // Accent spinner layer
      const accentSpinner = container.querySelector(".border-t-primary-500");
      expect(accentSpinner).toBeInTheDocument();
    });
  });

  describe("Visual Structure", () => {
    it("should position spinner elements correctly", () => {
      const { container } = render(<LoadingSpinner />);

      const relativeContainer = container.querySelector(".relative");
      const absoluteSpinner = container.querySelector(".absolute");

      expect(relativeContainer).toBeInTheDocument();
      expect(absoluteSpinner).toBeInTheDocument();
      expect(absoluteSpinner).toHaveClass("top-0", "left-0");
    });

    it("should have consistent sizing for both spinner elements", () => {
      const { container } = render(<LoadingSpinner />);

      const spinners = container.querySelectorAll("div[class*='w-12 h-12']");
      expect(spinners).toHaveLength(2);

      spinners.forEach(spinner => {
        expect(spinner).toHaveClass("w-12", "h-12");
      });
    });

    it("should have proper border styling", () => {
      const { container } = render(<LoadingSpinner />);

      // Base spinner should have border-4 and primary-200 color
      const baseSpinner = container.querySelector(".border-primary-200");
      expect(baseSpinner).toHaveClass("border-4", "border-primary-200");

      // Accent spinner should have border-4 and specific gradient effect
      const accentSpinner = container.querySelector(".border-t-primary-500");
      expect(accentSpinner).toHaveClass("border-4", "border-transparent", "border-t-primary-500");
    });
  });

  describe("Component State", () => {
    it("should render consistently on multiple renders", () => {
      const { rerender } = render(<LoadingSpinner />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      rerender(<LoadingSpinner />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should maintain structure across re-renders", () => {
      const { container, rerender } = render(<LoadingSpinner />);

      const initialSpinners = container.querySelectorAll(".animate-spin");
      expect(initialSpinners).toHaveLength(2);

      rerender(<LoadingSpinner />);

      const rerenderedSpinners = container.querySelectorAll(".animate-spin");
      expect(rerenderedSpinners).toHaveLength(2);
    });
  });

  describe("Edge Cases", () => {
    it("should render without props", () => {
      // Component doesn't take any props, so this should work
      expect(() => render(<LoadingSpinner />)).not.toThrow();
    });

    it("should be self-contained", () => {
      const { container } = render(<LoadingSpinner />);

      // Should have exactly one root element
      expect(container.children).toHaveLength(1);
    });

    it("should not interfere with other components", () => {
      const { container } = render(
        <div>
          <LoadingSpinner />
          <div data-testid="other-content">Other content</div>
        </div>
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByTestId("other-content")).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should be vertically centered", () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("justify-center", "items-center");
    });

    it("should have proper spacing", () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("py-12");

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toHaveClass("mt-4");
    });

    it("should use flexbox layout", () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass("flex", "flex-col");
    });
  });

  describe("Color Scheme", () => {
    it("should use consistent primary colors", () => {
      const { container } = render(<LoadingSpinner />);

      const baseSpinner = container.querySelector(".border-primary-200");
      const accentSpinner = container.querySelector(".border-t-primary-500");

      expect(baseSpinner).toBeInTheDocument();
      expect(accentSpinner).toBeInTheDocument();
    });

    it("should use neutral text color", () => {
      render(<LoadingSpinner />);

      const loadingText = screen.getByText("Loading...");
      expect(loadingText).toHaveClass("text-neutral-600");
    });

    it("should have transparent borders on accent spinner", () => {
      const { container } = render(<LoadingSpinner />);

      const accentSpinner = container.querySelector(".border-transparent");
      expect(accentSpinner).toBeInTheDocument();
      expect(accentSpinner).toHaveClass("border-transparent");
    });
  });

  describe("Performance", () => {
    it("should render quickly without expensive operations", () => {
      const startTime = performance.now();
      render(<LoadingSpinner />);
      const endTime = performance.now();

      // Should render very quickly (less than 50ms is reasonable)
      expect(endTime - startTime).toBeLessThan(50);
    });

    it("should not cause memory leaks on unmount", () => {
      const { unmount } = render(<LoadingSpinner />);

      expect(() => unmount()).not.toThrow();
    });
  });
});