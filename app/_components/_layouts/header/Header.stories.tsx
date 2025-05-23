import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    isLoggedIn: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};
