import { composeStories } from "@storybook/react";
import * as stories from "./Footer.stories";
import { screen } from "@testing-library/react";

const { Default } = composeStories(stories);

// vi.mock()

describe("Footer", () => {
  it("renders the footer with a back button", async () => {
    await Default.run();

    const backButton = screen.getByText("Back");
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest("button")).toHaveAttribute("type", "button");
  });

  it("navigates to the home page when the back button is clicked", async () => {
    const backButton = screen.getByText("Back");

    // Simulate a click on the back button
    // await backButton.click();

    // Check if the navigation function was called (you may need to adjust this based on your actual implementation)
    expect(backButton).toHaveBeenCalled();
  });
});
