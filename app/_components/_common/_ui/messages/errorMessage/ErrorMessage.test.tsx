import { describe, it } from "vitest";
import * as stories from "./ErrorMessage.stories";
import { createStoryFromArgs, runStoryAndTest, expectElementWithText } from "../../../../_test-utils/testHelpers";

const Default = createStoryFromArgs({ children: "This field is required" }, stories);

describe("ErrorMessage", () => {
  it("renders the error message", () => 
    runStoryAndTest(Default, () => {
      expectElementWithText("This field is required").toBeInDocument();
      expectElementWithText("This field is required").toHaveClass("text-red-500 font-semibold text-xs py-1");
    })
  );
});
