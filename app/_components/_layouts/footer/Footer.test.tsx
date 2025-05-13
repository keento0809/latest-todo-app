import { composeStory } from "@storybook/react";
import * as stories from "./Footer.stories";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
}));

const mockHandleNavigateToHome = vi.fn();
const Default = composeStory(
  {
    args: {
      handleClick: mockHandleNavigateToHome,
    },
  },
  stories.default
);

describe("Footer", () => {
  it("renders the footer with a back button", async () => {
    await Default.run();

    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("button")).toHaveAttribute("type", "button");
  });

  it("should call mockHandleNavigationToHome function when the back button is clicked", async () => {
    // Arrange
    await Default.run();

    // Act
    await userEvent.click(screen.getByText("Back"));

    // Assert
    expect(mockHandleNavigateToHome).toHaveBeenCalledTimes(1);
  });
});
