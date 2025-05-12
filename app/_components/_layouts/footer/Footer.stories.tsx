import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import { action } from "@storybook/addon-actions";
import { BaseButton } from "../../_common/baseButton/BaseButton";

// Mock handleNavigateToHome function
const FooterWithMockHook = () => {
  const mockHandleNavigateToHome = action("handleNavigateToHome");

  return (
    <footer className="w-full max-w-[200px] mx-auto flex justify-center items-center py-12">
      <BaseButton onClick={mockHandleNavigateToHome}>Back</BaseButton>
    </footer>
  );
};

const meta: Meta<typeof Footer> = {
  title: "Common/Footer",
  component: Footer,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
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
  render: () => <FooterWithMockHook />,
  parameters: {
    docs: {
      description: {
        story: "Standard footer as shown on main pages.",
      },
    },
  },
};
