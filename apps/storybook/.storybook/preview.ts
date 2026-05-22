import type { Preview } from "@storybook/react";

// Import design tokens CSS
import "@fatedart/tokens/dist/tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      element: "#storybook-root",
      config: {},
      options: {},
      manual: false,
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        showName: true,
      },
    },
  },
};

export default preview;
