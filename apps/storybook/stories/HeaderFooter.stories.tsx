import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Footer, Header, MobileFooter, MobileHeader } from "@fatedart/ui";
import "./HeaderFooter.stories.css";

const meta: Meta<typeof Header> = {
  title: "Components/HeaderFooter",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/iFjIDFJF5bYC7uyHJAY7Ae/Analyst-CRV---Stellar-Design-System-1.0?node-id=178-46032&t=8uLowJl5asuIeht3-4",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopHeader: Story = {
  render: () => (
    <div className="headerFooterPage">
      <Header />
    </div>
  ),
};

export const DesktopFooter: Story = {
  render: () => (
    <div className="headerFooterPage">
      <Footer />
    </div>
  ),
};

export const DesktopLayout: Story = {
  render: () => (
    <div className="headerFooterPage">
      <Header />
      <div className="headerFooterSpacer" />
      <Footer />
    </div>
  ),
};

export const MobileLayout: Story = {
  render: () => (
    <div className="headerFooterPage headerFooterPageMobile">
      <div className="headerFooterMobileStack">
        <MobileHeader />
        <MobileFooter />
      </div>
    </div>
  ),
};
