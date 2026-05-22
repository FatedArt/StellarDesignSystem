import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@storybook/addon-designs",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },

  async viteFinal(config) {
    const aliases = {
      "@fatedart/ui": path.resolve(configDir, "../../../packages/ui/src"),
      "@fatedart/icons": path.resolve(configDir, "../../../packages/icons/src"),
    };
    const existing = config.resolve?.alias;
    if (Array.isArray(existing)) {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: [
            ...existing,
            ...Object.entries(aliases).map(([find, replacement]) => ({
              find,
              replacement,
            })),
          ],
        },
      };
    }
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(existing &&
          typeof existing === "object"
            ? (existing as Record<string, string | string[]>)
            : {}),
          ...aliases,
        },
      },
    };
  },
};

export default config;
