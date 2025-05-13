import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Common/Footer",
  component: Footer,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    handleClick: {
      action: "clicked",
      description: "Function to handle click event on the button.",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col justify-end">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Standard footer as shown on main pages.",
      },
    },
  },
  args: {
    handleClick: () => {
      console.log("Back button clicked");
    },
  },
};
