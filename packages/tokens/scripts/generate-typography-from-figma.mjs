/**
 * Generates Typhography composite tokens from Figma text styles.
 * Source: figma_get_text_styles (Analyst CRV - Stellar Design System 1.0)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(__dirname, "..", "tokens.json");

const FIGMA_STYLES = [
  { name: "crv/display/xlarge", fontSize: 44, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 66, textCase: "ORIGINAL" },
  { name: "crv/display/large", fontSize: 40, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 60, textCase: "ORIGINAL" },
  { name: "crv/display/medium", fontSize: 36, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 54, textCase: "ORIGINAL" },
  { name: "crv/display/small", fontSize: 32, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 48, textCase: "ORIGINAL" },
  { name: "crv/display/xsmall", fontSize: 28, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 42, textCase: "ORIGINAL" },
  { name: "crv/headline/xlarge", fontSize: 32, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 48, textCase: "ORIGINAL" },
  { name: "crv/headline/large", fontSize: 28, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 42, textCase: "ORIGINAL" },
  { name: "crv/headline/medium", fontSize: 24, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 36, textCase: "ORIGINAL" },
  { name: "crv/headline/small", fontSize: 20, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 30, textCase: "ORIGINAL" },
  { name: "crv/headline/xsmall", fontSize: 16, fontFamily: "Nunito Sans", fontStyle: "ExtraBold", letterSpacing: -0.32, lineHeight: 24, textCase: "ORIGINAL" },
  { name: "crv/uppercase/xlarge", fontSize: 20, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 30, textCase: "UPPER" },
  { name: "crv/uppercase/large", fontSize: 18, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 27, textCase: "UPPER" },
  { name: "crv/uppercase/medium", fontSize: 16, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 24, textCase: "UPPER" },
  { name: "crv/uppercase/small", fontSize: 14, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 21, textCase: "UPPER" },
  { name: "crv/uppercase/xsmall", fontSize: 12, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 18, textCase: "UPPER" },
  { name: "crv/body-bold/xlarge", fontSize: 20, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 26, textCase: "ORIGINAL" },
  { name: "crv/body-bold/large", fontSize: 18, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 23, textCase: "ORIGINAL" },
  { name: "crv/body-bold/medium", fontSize: 16, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 21, textCase: "ORIGINAL" },
  { name: "crv/body-bold/small", fontSize: 14, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 18, textCase: "ORIGINAL" },
  { name: "crv/body-bold/xsmall", fontSize: 12, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 16, textCase: "ORIGINAL" },
  { name: "crv/body-bold/xxsmall", fontSize: 10, fontFamily: "DM Sans", fontStyle: "Bold", letterSpacing: 0.8, lineHeight: 13, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/xlarge", fontSize: 20, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 26, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/large", fontSize: 18, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 23, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/medium", fontSize: 16, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 21, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/small", fontSize: 14, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 18, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/xsmall", fontSize: 12, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 16, textCase: "ORIGINAL" },
  { name: "crv/body-semibold/xxsmall", fontSize: 10, fontFamily: "DM Sans", fontStyle: "SemiBold", letterSpacing: 0.8, lineHeight: 13, textCase: "ORIGINAL" },
  { name: "crv/body-medium/xlarge", fontSize: 20, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 26, textCase: "ORIGINAL" },
  { name: "crv/body-medium/large", fontSize: 18, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 23, textCase: "ORIGINAL" },
  { name: "crv/body-medium/medium", fontSize: 16, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 21, textCase: "ORIGINAL" },
  { name: "crv/body-medium/small", fontSize: 14, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 18, textCase: "ORIGINAL" },
  { name: "crv/body-medium/xsmall", fontSize: 12, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 16, textCase: "ORIGINAL" },
  { name: "crv/body-medium/xxsmall", fontSize: 10, fontFamily: "DM Sans", fontStyle: "Medium", letterSpacing: 0.8, lineHeight: 13, textCase: "ORIGINAL" },
  { name: "crv/body-regular/xlarge", fontSize: 20, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 26, textCase: "ORIGINAL" },
  { name: "crv/body-regular/large", fontSize: 18, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 23, textCase: "ORIGINAL" },
  { name: "crv/body-regular/medium", fontSize: 16, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 21, textCase: "ORIGINAL" },
  { name: "crv/body-regular/small", fontSize: 14, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 18, textCase: "ORIGINAL" },
  { name: "crv/body-regular/xsmall", fontSize: 12, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 16, textCase: "ORIGINAL" },
  { name: "crv/body-regular/xxsmall", fontSize: 10, fontFamily: "DM Sans", fontStyle: "Regular", letterSpacing: 0.8, lineHeight: 13, textCase: "ORIGINAL" },
];

const WEIGHT_MAP = {
  Regular: "regular",
  Medium: "medium",
  SemiBold: "semibold",
  Bold: "bold",
  ExtraBold: "extrabold",
};

const BODY_SIZE_MAP = {
  10: "bodys-10",
  12: "bodys-12",
  14: "bodys-14",
  16: "bodys-16",
  18: "bodys-18",
  20: "bodys-20",
};

function tokenEntry(value, type) {
  return { value, type };
}

function buildPrimitives() {
  const fontSizes = {
    display: {},
    headline: {},
  };
  const lineHeights = {
    display: {},
    headline: {},
    caps: {},
    "body-bold": {},
    "body-semibold": {},
    "body-medium": {},
    "body-regular": {},
  };

  for (const style of FIGMA_STYLES) {
    const [, category, size] = style.name.split("/");
    const lineHeightKey = category === "uppercase" ? "caps" : category;

    if (category === "display" || category === "headline") {
      fontSizes[category][size] = tokenEntry(String(style.fontSize), "fontSizes");
      lineHeights[category][size] = tokenEntry(String(style.lineHeight), "lineHeights");
    } else {
      lineHeights[lineHeightKey][size] = tokenEntry(String(style.lineHeight), "lineHeights");
    }
  }

  return {
    letterSpacing: {
      display: tokenEntry("-0.32%", "letterSpacing"),
      body: tokenEntry("0.8%", "letterSpacing"),
    },
    textCase: {
      uppercase: tokenEntry("uppercase", "textCase"),
    },
    fontSizes,
    lineHeights,
  };
}

function fontSizeRef(category, size, fontSize) {
  if (category === "display" || category === "headline") {
    return `{crv.fontSizes.${category}.${size}}`;
  }
  const key = BODY_SIZE_MAP[fontSize];
  if (!key) throw new Error(`Unknown body font size: ${fontSize}`);
  return `{crv.fontSizes.${key}}`;
}

function fontFamilyRef(category) {
  if (category === "display" || category === "headline") {
    return `{crv.display}`;
  }
  return `{crv.body}`;
}

function lineHeightRef(category, size) {
  const key = category === "uppercase" ? "caps" : category;
  return `{crv.lineHeights.${key}.${size}}`;
}

function buildTypographySet() {
  const crv = {};

  for (const style of FIGMA_STYLES) {
    const [, category, size] = style.name.split("/");
    if (!crv[category]) crv[category] = {};

    const value = {
      fontFamily: fontFamilyRef(category),
      fontWeight: `{crv.fontWeights.${WEIGHT_MAP[style.fontStyle]}}`,
      fontSize: fontSizeRef(category, size, style.fontSize),
      lineHeight: lineHeightRef(category, size),
      letterSpacing:
        category === "display" || category === "headline"
          ? "{crv.letterSpacing.display}"
          : "{crv.letterSpacing.body}",
    };

    if (style.textCase === "UPPER") {
      value.textCase = "{crv.textCase.uppercase}";
    }

    crv[category][size] = { value, type: "typography" };
  }

  return { crv };
}

const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
const primitives = buildPrimitives();

tokens.crv.letterSpacing = primitives.letterSpacing;
tokens.crv.textCase = primitives.textCase;
tokens.crv.fontSizes.display = primitives.fontSizes.display;
tokens.crv.fontSizes.headline = primitives.fontSizes.headline;
tokens.crv.lineHeights = {
  ...tokens.crv.lineHeights,
  ...primitives.lineHeights,
};

tokens.Typhography = buildTypographySet();

writeFileSync(tokensPath, `${JSON.stringify(tokens, null, 2)}\n`);
console.log(`Updated ${tokensPath}`);
console.log(`Typography composites: ${FIGMA_STYLES.length}`);
