import { composeStory } from "@storybook/react";
import * as stories from "./ErrorMessage.stories";
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

const Default = composeStory(
  {
    args: {
      children: "This field is required",
    },
  },
  stories.default
);

describe("ErrorMessage", () => {
  it("renders the error message", async () => {
    await Default.run();

    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500 font-semibold text-xs py-1");
  });
});
