import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./BaseButton.stories";

const { Default } = composeStories(stories);

describe("BaseButton", () => {
  it("should be defined", async () => {
    await Default.run();

    const defaultButtonText = screen.getByText("Click");
    expect(defaultButtonText).toBeInTheDocument();

    expect(Default).toBeDefined();
  });
});
