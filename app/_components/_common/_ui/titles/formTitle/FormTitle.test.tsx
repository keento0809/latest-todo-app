import { composeStory } from "@storybook/react";
import * as stories from "./FormTitle.stories";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const Default = composeStory(
  {
    args: {
      children: "Login to Your Account",
    },
  },
  stories.default
);

describe("FormTitle", () => {
  it("renders the form title", async () => {
    await Default.run();

    const formTitle = screen.getByText("Login to Your Account");
    expect(formTitle).toBeInTheDocument();
    expect(formTitle).toHaveClass(
      "text-2xl font-bold text-gray-900 dark:text-white"
    );
  });
});
