import type { Meta, StoryObj } from "@storybook/react";
import { BaseButton } from "./BaseButton";

const meta: Meta<typeof BaseButton> = {
  title: "Common/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {
  args: {
    children: "Click",
  },
};

export const Pending: Story = {
  args: {
    children: "Loading...",
    isPending: true,
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom Color",
    className: "bg-yellow-400 text-white border-none",
  },
};
