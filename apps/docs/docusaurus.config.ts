import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Stellar Design System",
  tagline: "Komponen, token, dan guidelines untuk produk Stellar",
  favicon: "img/favicon.svg",

  url: "https://stellar-ds.vercel.app",
  baseUrl: "/",

  organizationName: "FatedArt",
  projectName: "StellarDesignSystem",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/FatedArt/StellarDesignSystem/edit/main/apps/docs/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Stellar DS",
      logo: {
        alt: "Stellar Design System Logo",
        src: "img/logo.svg",
        href: "/docs/getting-started",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/FatedArt/StellarDesignSystem",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Getting Started", to: "/docs/getting-started" },
            { label: "Foundations", to: "/docs/foundations/color" },
            { label: "Components", to: "/docs/components/button" },
          ],
        },
        {
          title: "Links",
          items: [
            {
              label: "Storybook",
              href: "https://stellar-storybook.vercel.app",
            },
            {
              label: "GitHub",
              href: "https://github.com/FatedArt/StellarDesignSystem",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stellar Design System`,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
