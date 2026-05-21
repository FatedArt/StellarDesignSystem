import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "doc",
      id: "getting-started",
      label: "Getting Started",
    },
    {
      type: "category",
      label: "Foundations",
      items: [
        "foundations/color",
        "foundations/typography",
        "foundations/spacing",
        "foundations/elevation",
        "foundations/accessibility",
      ],
    },
    {
      type: "category",
      label: "Components",
      items: [
        "components/button",
      ],
    },
    {
      type: "category",
      label: "Patterns",
      items: [],
    },
    {
      type: "doc",
      id: "tokens/overview",
      label: "Design Tokens",
    },
    {
      type: "doc",
      id: "contributing",
      label: "Contributing",
    },
  ],
};

export default sidebars;
