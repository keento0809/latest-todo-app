import { composeStory } from "@storybook/react";
import { screen } from "@testing-library/react";
import { expect } from "vitest";

export const createStoryFromArgs = (args: Record<string, unknown>, stories: { default: unknown }) => 
  composeStory({ args }, stories.default);

export const expectElementWithText = (text: string) => {
  const element = screen.getByText(text);
  return {
    toBeInDocument: () => expect(element).toBeInTheDocument(),
    toHaveClass: (className: string) => expect(element).toHaveClass(className),
    toHaveAttribute: (attr: string, value: string) => 
      expect(element.closest("a") || element.closest("button")).toHaveAttribute(attr, value),
  };
};

export const runStoryAndTest = async (story: { run: () => Promise<void> }, testFn: () => void | Promise<void>) => {
  await story.run();
  await testFn();
};