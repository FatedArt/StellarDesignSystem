import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@fatedart/ui";
import "./Button.stories.css";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iFjIDFJF5bYC7uyHJAY7Ae/Analyst-CRV---Stellar-Design-System-1.0?node-id=155-1594&t=8uLowJl5asuIeht3-4",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "tonal",
        "text",
        "destruction",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
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

export const Outline: Story = {
  args: { variant: "outline", children: "Button" },
};

export const Tonal: Story = {
  render: ({ children, ...args }) => (
    <div className="darkSurface">
      <Button {...args}>{children}</Button>
    </div>
  ),
  args: { variant: "tonal", children: "Button" },
};

export const Text: Story = {
  render: ({ children, ...args }) => (
    <div className="darkSurface">
      <Button {...args}>{children}</Button>
    </div>
  ),
  args: { variant: "text", children: "Button" },
};

export const Destruction: Story = {
  args: { variant: "destruction", children: "Button" },
};

export const Loading: Story = {
  args: { variant: "primary", loading: true, children: "Button" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Button" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destruction">Destruction</Button>
      </div>
      <div className="darkSurface" style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <Button variant="tonal">Tonal</Button>
        <Button variant="text">Text</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
      <Button size="xl">Button</Button>
    </div>
  ),
};
