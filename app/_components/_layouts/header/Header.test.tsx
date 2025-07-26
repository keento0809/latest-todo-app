import React from "react";
import { describe, it, vi } from "vitest";
import { composeStories } from "@storybook/react";
import * as stories from "./Header.stories";
import { runStoryAndTest, expectElementWithText } from "../../_test-utils/testHelpers";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => 
    React.createElement("a", { href }, children),
}));

const { LoggedIn, LoggedOut } = composeStories(stories);

describe("Header", () => {
  it("displays login link when user is not logged in", () => 
    runStoryAndTest(LoggedOut, () => 
      expectElementWithText("Login").toHaveAttribute("href", "/signin")
    )
  );

  it("displays logout link when user is logged in", () => 
    runStoryAndTest(LoggedIn, () => 
      expectElementWithText("Logout").toHaveAttribute("href", "/logout")
    )
  );
});
