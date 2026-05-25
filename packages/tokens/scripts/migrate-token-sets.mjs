/**
 * One-time migration: crv/Typhography → core/semantic/typography/components
 * Run: node scripts/migrate-token-sets.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(__dirname, "..", "tokens.json");

const raw = readFileSync(tokensPath, "utf8");
const tokens = JSON.parse(raw);

function replaceRefs(obj) {
  if (typeof obj === "string") {
    return obj.replace(/\{crv\./g, "{core.");
  }
  if (Array.isArray(obj)) {
    return obj.map(replaceRefs);
  }
  if (obj && typeof obj === "object") {
    const next = {};
    for (const [key, value] of Object.entries(obj)) {
      next[key] = replaceRefs(value);
    }
    return next;
  }
  return obj;
}

const core = replaceRefs(tokens.crv);
const typography = replaceRefs(tokens.Typhography);

const semantic = {
  color: {
    action: {
      primary: { value: "{core.brColors.primary.6}", type: "color" },
      primaryHover: { value: "{core.brColors.primary.7}", type: "color" },
      primarySubtle: { value: "{core.brColors.primary.0}", type: "color" },
      primaryStrong: { value: "{core.brColors.primary.5}", type: "color" },
      secondary: { value: "{core.dfColors.onyx.0}", type: "color" },
      secondaryHover: { value: "{core.dfColors.onyx.1}", type: "color" },
      danger: { value: "{core.brColors.secondary.5}", type: "color" },
      dangerHover: { value: "{core.brColors.secondary.6}", type: "color" },
      dangerSubtle: { value: "{core.brColors.secondary.0}", type: "color" },
      dangerStrong: { value: "{core.brColors.secondary.4}", type: "color" },
    },
    text: {
      onPrimary: { value: "{core.dfColors.onyx.1}", type: "color" },
      primary: { value: "{core.brColors.primary.6}", type: "color" },
      tertiary: { value: "{core.brColors.primary.5}", type: "color" },
      base: { value: "{core.dfColors.onyx.7}", type: "color" },
      muted: { value: "{core.dfColors.onyx.4}", type: "color" },
      subtle: { value: "{core.dfColors.onyx.3}", type: "color" },
      onSurface: { value: "{core.dfColors.onyx.0}", type: "color" },
      disabled: { value: "{core.dfColors.onyx.5}", type: "color" },
    },
    background: {
      default: { value: "{core.dfColors.onyx.0}", type: "color" },
      subtle: { value: "{core.dfColors.dark.5}", type: "color" },
      strong: { value: "{core.dfColors.dark.6}", type: "color" },
      surface: { value: "{core.dfColors.dark.8}", type: "color" },
      elevated: { value: "{core.dfColors.dark.7}", type: "color" },
      inverse: { value: "{core.dfColors.dark.9}", type: "color" },
    },
    border: {
      default: { value: "{core.dfColors.dark.4}", type: "color" },
      subtle: { value: "{core.dfColors.dark.5}", type: "color" },
      focus: { value: "{core.brColors.primary.5}", type: "color" },
      error: { value: "{core.brColors.secondary.5}", type: "color" },
      errorFocus: { value: "{core.brColors.secondary.6}", type: "color" },
    },
    icon: {
      primary: { value: "{semantic.color.action.primary}", type: "color" },
      onPrimary: { value: "{semantic.color.text.onPrimary}", type: "color" },
      muted: { value: "{semantic.color.text.muted}", type: "color" },
    },
  },
  opacity: {
    disabled: { value: "0.45", type: "number" },
    fieldDisabled: { value: "0.75", type: "number" },
  },
};

const colorToken = (value) => ({ value, type: "color" });
const spacingToken = (value) => ({ value, type: "spacing" });
const dimensionToken = (value) => ({ value, type: "dimension" });
const borderRadiusToken = (value) => ({ value, type: "borderRadius" });
const typographyRef = (path) => ({ value: `{typography.crv.${path}}`, type: "typography" });

const components = {
  button: {
    radius: borderRadiusToken("{core.radius.sm}"),
    radiusLg: borderRadiusToken("{core.radius.md}"),
    gap: spacingToken("{core.spacing.xs}"),
    gapLg: spacingToken("{core.spacing.sm}"),
    opacity: {
      disabled: { value: "{semantic.opacity.disabled}", type: "number" },
    },
    size: {
      xs: {
        paddingX: spacingToken("{core.spacing.sm}"),
        paddingY: spacingToken("{core.spacing.xs}"),
        gap: spacingToken("{core.spacing.xs}"),
        radius: borderRadiusToken("{components.button.radius}"),
        typography: typographyRef("body-medium.xxsmall"),
      },
      sm: {
        paddingX: spacingToken("{core.spacing.md}"),
        paddingY: spacingToken("{core.spacing.sm}"),
        gap: spacingToken("{core.spacing.xs}"),
        radius: borderRadiusToken("{components.button.radius}"),
        typography: typographyRef("body-medium.xxsmall"),
      },
      md: {
        paddingX: spacingToken("{core.spacing.lg}"),
        paddingY: spacingToken("{core.spacing.md}"),
        gap: spacingToken("{core.spacing.xs}"),
        radius: borderRadiusToken("{components.button.radius}"),
        typography: typographyRef("body-medium.small"),
      },
      lg: {
        paddingX: spacingToken("{core.spacing.xl}"),
        paddingY: spacingToken("{core.spacing.md}"),
        gap: spacingToken("{components.button.gapLg}"),
        radius: borderRadiusToken("{components.button.radiusLg}"),
        typography: typographyRef("body-semibold.medium"),
      },
      xl: {
        paddingX: spacingToken("{core.spacing.2xl}"),
        paddingY: spacingToken("{core.spacing.md}"),
        gap: spacingToken("{components.button.gapLg}"),
        radius: borderRadiusToken("{components.button.radiusLg}"),
        typography: typographyRef("body-semibold.xlarge"),
      },
    },
    variant: {
      primary: {
        background: {
          default: colorToken("{semantic.color.action.primary}"),
          hover: colorToken("{semantic.color.action.primaryHover}"),
        },
        color: {
          default: colorToken("{semantic.color.text.onPrimary}"),
          hover: colorToken("{semantic.color.text.onPrimary}"),
        },
      },
      secondary: {
        background: {
          default: colorToken("{semantic.color.action.secondary}"),
          hover: colorToken("{semantic.color.action.secondaryHover}"),
        },
        color: {
          default: colorToken("{semantic.color.action.primary}"),
          hover: colorToken("{semantic.color.action.primaryHover}"),
        },
      },
      outline: {
        background: {
          default: colorToken("transparent"),
          hover: colorToken("{semantic.color.action.primary}"),
        },
        border: {
          default: colorToken("{semantic.color.action.primaryStrong}"),
        },
        color: {
          default: colorToken("{semantic.color.action.primaryStrong}"),
          hover: colorToken("{semantic.color.action.primarySubtle}"),
        },
      },
      tonal: {
        background: {
          default: colorToken("{semantic.color.background.subtle}"),
          hover: colorToken("{semantic.color.background.strong}"),
        },
        color: {
          default: colorToken("{semantic.color.text.onPrimary}"),
          hover: colorToken("{semantic.color.action.primaryStrong}"),
        },
      },
      text: {
        background: {
          default: colorToken("transparent"),
          hover: colorToken("{semantic.color.background.strong}"),
        },
        color: {
          default: colorToken("{semantic.color.text.onPrimary}"),
          hover: colorToken("{semantic.color.action.primary}"),
        },
      },
      destruction: {
        background: {
          default: colorToken("{semantic.color.action.danger}"),
          hover: colorToken("{semantic.color.action.dangerHover}"),
        },
        color: {
          default: colorToken("{semantic.color.text.subtle}"),
          hover: colorToken("{semantic.color.action.dangerSubtle}"),
        },
      },
    },
  },
  inputField: {
    gap: spacingToken("{core.spacing.xs}"),
    radius: borderRadiusToken("{core.radius.sm}"),
    focusRing: dimensionToken("2px"),
    size: {
      sm: {
        minHeight: dimensionToken("36px"),
        paddingX: spacingToken("{core.spacing.md}"),
        paddingY: spacingToken("{core.spacing.sm}"),
        typography: typographyRef("body-regular.xxsmall"),
      },
      md: {
        minHeight: dimensionToken("45px"),
        paddingX: spacingToken("{core.spacing.lg}"),
        paddingY: spacingToken("{core.spacing.md}"),
        typography: typographyRef("body-regular.small"),
      },
      lg: {
        minHeight: dimensionToken("52px"),
        paddingX: spacingToken("{core.spacing.lg}"),
        paddingY: dimensionToken("14px"),
        typography: typographyRef("body-regular.medium"),
      },
    },
    color: {
      label: colorToken("{semantic.color.text.onPrimary}"),
      required: colorToken("{semantic.color.action.danger}"),
      border: {
        default: colorToken("{semantic.color.border.default}"),
        focus: colorToken("{semantic.color.border.focus}"),
        error: colorToken("{semantic.color.border.error}"),
      },
      background: {
        default: colorToken("{semantic.color.background.surface}"),
        disabled: colorToken("{semantic.color.background.elevated}"),
      },
      text: {
        default: colorToken("{semantic.color.text.onSurface}"),
        placeholder: colorToken("{semantic.color.text.muted}"),
        disabled: colorToken("{semantic.color.text.disabled}"),
      },
      helper: {
        default: colorToken("{semantic.color.text.subtle}"),
        error: colorToken("{semantic.color.action.dangerStrong}"),
      },
      affix: colorToken("{semantic.color.text.muted}"),
    },
    labelTypography: typographyRef("body-medium.small"),
    helperTypography: typographyRef("body-regular.xxsmall"),
  },
  headerFooter: {
    header: {
      minHeight: dimensionToken("61px"),
      paddingX: spacingToken("{core.spacing.2xl}"),
      paddingY: spacingToken("{core.spacing.sm}"),
      gap: spacingToken("{core.spacing.lg}"),
      contentGap: spacingToken("{core.spacing.xl}"),
      border: colorToken("{semantic.color.border.default}"),
      background: colorToken("{semantic.color.background.surface}"),
      color: colorToken("{semantic.color.text.onSurface}"),
      searchWidth: dimensionToken("240px"),
      searchHeight: dimensionToken("45px"),
      searchRadius: borderRadiusToken("{core.radius.sm}"),
      searchPaddingX: spacingToken("{core.spacing.lg}"),
      searchPaddingY: spacingToken("{core.spacing.md}"),
      searchBorder: colorToken("{semantic.color.border.default}"),
      searchBackground: colorToken("{core.dfColors.dark.3}"),
      searchColor: colorToken("{semantic.color.text.muted}"),
      iconSize: dimensionToken("32px"),
      iconRadius: borderRadiusToken("{core.radius.sm}"),
      iconBorder: colorToken("{semantic.color.border.default}"),
      iconBackground: colorToken("{core.dfColors.dark.3}"),
      iconColor: colorToken("{semantic.color.text.onSurface}"),
      dividerHeight: dimensionToken("28px"),
      dividerColor: colorToken("{semantic.color.border.default}"),
      accountGap: spacingToken("{core.spacing.md}"),
      avatarSize: dimensionToken("32px"),
      logoTypography: typographyRef("uppercase.large"),
      logoCompactTypography: typographyRef("uppercase.small"),
      searchTypography: typographyRef("body-regular.small"),
      accountNameTypography: typographyRef("body-semibold.small"),
      accountRoleTypography: typographyRef("body-regular.xxsmall"),
      accountRoleColor: colorToken("{semantic.color.text.subtle}"),
    },
    footer: {
      minHeight: dimensionToken("59px"),
      paddingX: spacingToken("{core.spacing.2xl}"),
      paddingTop: spacingToken("{core.spacing.md}"),
      paddingBottom: spacingToken("{core.spacing.md}"),
      gap: dimensionToken("23px"),
      border: colorToken("{semantic.color.border.default}"),
      background: colorToken("{semantic.color.background.surface}"),
      color: colorToken("{semantic.color.text.onSurface}"),
      typography: typographyRef("body-regular.small"),
    },
    mobile: {
      width: dimensionToken("320px"),
      headerTopMinHeight: dimensionToken("55px"),
      actionBarMinHeight: dimensionToken("52px"),
      footerMinHeight: dimensionToken("190px"),
      padding: spacingToken("{core.spacing.md}"),
      footerPadding: spacingToken("{core.spacing.3xl}"),
      footerGap: spacingToken("{core.spacing.3xl}"),
      footerContentGap: spacingToken("{core.spacing.lg}"),
      searchWidth: dimensionToken("192px"),
      searchHeight: dimensionToken("32px"),
      searchPaddingX: spacingToken("{core.spacing.md}"),
      searchPaddingY: spacingToken("{core.spacing.sm}"),
      actionGap: spacingToken("{core.spacing.sm}"),
      border: colorToken("{semantic.color.border.subtle}"),
      background: colorToken("{semantic.color.background.surface}"),
      footerBackground: colorToken("{semantic.color.background.inverse}"),
      color: colorToken("{semantic.color.text.onSurface}"),
      searchTypography: typographyRef("body-regular.xxsmall"),
      footerTypography: typographyRef("body-regular.small"),
    },
  },
};

const migrated = {
  core,
  semantic,
  typography,
  components,
  $themes: tokens.$themes ?? [],
  $metadata: {
    tokenSetOrder: ["core", "semantic", "typography", "components"],
  },
};

writeFileSync(tokensPath, `${JSON.stringify(migrated, null, 2)}\n`);
console.log("Migrated tokens.json → core, semantic, typography, components");
