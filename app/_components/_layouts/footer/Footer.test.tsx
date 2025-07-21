import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as stories from "./Footer.stories";
import { createStoryFromArgs, runStoryAndTest, expectElementWithText } from "../../_test-utils/testHelpers";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
}));

const mockHandleNavigateToHome = vi.fn();
const Default = createStoryFromArgs({ handleClick: mockHandleNavigateToHome }, stories);

describe("Footer", () => {
  it("renders the footer with a back button", () => 
    runStoryAndTest(Default, () => {
      expectElementWithText("Back to Home").toBeInDocument();
      expectElementWithText("Back to Home").toHaveAttribute("type", "button");
    })
  );

  it("should call mockHandleNavigationToHome function when the back button is clicked", () => 
    runStoryAndTest(Default, async () => {
      await userEvent.click(screen.getByText("Back to Home"));
      expect(mockHandleNavigateToHome).toHaveBeenCalledTimes(1);
    })
  );
});
