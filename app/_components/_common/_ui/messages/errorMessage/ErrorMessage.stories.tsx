import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./ErrorMessage";

const meta = {
  title: "UI/Messages/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This field is required",
  },
};

export const LongMessage: Story = {
  args: {
    children:
      "This password does not meet our security requirements. Please use at least 8 characters with one uppercase letter, one number, and one special character.",
  },
};

export const WithHtml: Story = {
  args: {
    children: (
      <>
        Please check your <strong>email</strong> and try again
      </>
    ),
  },
};
