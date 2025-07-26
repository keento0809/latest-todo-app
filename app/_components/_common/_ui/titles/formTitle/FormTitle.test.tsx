import { describe, it } from "vitest";
import * as stories from "./FormTitle.stories";
import { createStoryFromArgs, runStoryAndTest, expectElementWithText } from "../../../../_test-utils/testHelpers";

const Default = createStoryFromArgs({ children: "Login to Your Account" }, stories);

describe("FormTitle", () => {
  it("renders the form title", () => 
    runStoryAndTest(Default, () => {
      expectElementWithText("Login to Your Account").toBeInDocument();
      expectElementWithText("Login to Your Account").toHaveClass("text-xl font-semibold text-center pb-8");
    })
  );
});
