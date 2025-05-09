import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { MockSessionProvider } from "./_mocks/mockSessionProvider/MockSessionProvider";

const meta: Meta<typeof Header> = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <MockSessionProvider session={context.parameters.nextauth.session}>
        <Story />
      </MockSessionProvider>
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
