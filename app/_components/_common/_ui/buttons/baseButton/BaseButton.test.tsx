import { describe, it, expect } from "vitest";
import { composeStories } from "@storybook/react";
import * as stories from "./BaseButton.stories";
import { runStoryAndTest, expectElementWithText } from "../../../../_test-utils/testHelpers";

const { Default } = composeStories(stories);

describe("BaseButton", () => {
  it("should be defined", () => 
    runStoryAndTest(Default, () => {
      expectElementWithText("Click").toBeInDocument();
      expect(Default).toBeDefined();
    })
  );
});
