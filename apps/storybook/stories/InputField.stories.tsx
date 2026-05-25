import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "@fatedart/ui";
import "./InputField.stories.css";

const withCanvas = (Story: React.ComponentType) => (
  <div className="inputFieldCanvas">
    <Story />
  </div>
);

const meta: Meta<typeof InputField> = {
  title: "Components/Input Field",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iFjIDFJF5bYC7uyHJAY7Ae/Analyst-CRV---Stellar-Design-System-1.0?node-id=178-46032&t=8uLowJl5asuIeht3-4",
    },
  },
  args: {
    label: "Email",
    placeholder: "name@company.com",
    helperText: "Use your work email",
    size: "md",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
  decorators: [withCanvas],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search threat intel...",
    startAdornment: "🔎",
  },
};

export const WithEndText: Story = {
  args: {
    label: "Domain",
    placeholder: "example",
    endAdornment: ".com",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    value: "invalid-email",
    errorText: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "API Key",
    value: "****************",
    disabled: true,
    helperText: "Read-only for your role",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="inputFieldSizes">
      <InputField label="Small" size="sm" placeholder="Small input" />
      <InputField label="Medium" size="md" placeholder="Medium input" />
      <InputField label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};
