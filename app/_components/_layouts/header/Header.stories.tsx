import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { NextAuthProvider } from "@/app/_providers/nextauthProvider/NextAuthProvider";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <NextAuthProvider>
        <Story />
      </NextAuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  parameters: {
    nextauth: {
      session: null,
    },
  },
};

export const LoggedIn: Story = {
  parameters: {
    nextauth: {
      session: { user: { name: "Test User", email: "test@example.com" } },
    },
  },
};
