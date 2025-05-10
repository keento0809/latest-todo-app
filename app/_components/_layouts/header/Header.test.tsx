import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./Header.stories";
import { ReactNode } from "react";

// Compose the stories to apply decorators from the meta object
const { LoggedIn, LoggedOut } = composeStories(stories);

// Mock Next.js's Link
vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ href, children }: { href: string; children: ReactNode }) => (
      <a href={href}>{children}</a>
    ),
  };
});

describe("Header", () => {
  it("displays login link when user is not logged in", async () => {
    await LoggedOut.run();

    const loginLink = screen.getByText("Login");
    expect(loginLink.closest("a")).toHaveAttribute("href", "/signin");
  });

  it("displays logout link when user is logged in", async () => {
    await LoggedIn.run();

    const logoutLink = screen.getByText("Logout");
    expect(logoutLink.closest("a")).toHaveAttribute("href", "/logout");
  });
});
