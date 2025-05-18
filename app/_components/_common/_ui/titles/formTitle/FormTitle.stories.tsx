import { FormTitle } from "./FormTitle";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Common/UI/Titles/FormTitle",
  component: FormTitle,
  tags: ["autodocs"],
} satisfies Meta<typeof FormTitle>;

export default meta;
type Story = StoryObj<typeof FormTitle>;

export const Default: Story = {
  args: {
    children: "FormTitle",
  },
};
