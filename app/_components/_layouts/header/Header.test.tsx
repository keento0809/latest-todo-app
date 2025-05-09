import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Header.stories";

// Compose the stories to apply decorators from the meta object
const { LoggedIn, LoggedOut } = composeStories(stories);

describe("Header", () => {
  it("displays login link when user is not logged in", async () => {
    await LoggedOut.run();
    // render(<LoggedOut />);

    const loginLink = screen.getByText("Login");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest("a")).toHaveAttribute("href", "/signin");

    // Should not show logout
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("displays logout link when user is logged in", async () => {
    await LoggedIn.run();
    // render(<LoggedIn />);

    const logoutLink = screen.getByText("Logout");
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.closest("a")).toHaveAttribute("href", "/logout");

    // Should not show login
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });
});
