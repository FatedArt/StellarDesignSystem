import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@stellar/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // Ganti dengan link Figma node komponen Button Anda
      url: "https://www.figma.com/file/XXXXX/StellarDesignSystem?node-id=0%3A1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Button" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Button" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Button" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Loading..." },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
