/**
 * Style Dictionary config
 * Transforms tokens.json (Tokens Studio format) → CSS variables + JS/TS
 */

const calcMultiplyTransform = {
  name: "size/calcMultiply",
  type: "value",
  transitive: true,
  filter: (token) =>
    typeof token.value === "string" &&
    token.value.includes("*") &&
    !token.value.startsWith("calc("),
  transform: (token) => `calc(${token.value})`,
};

const lineHeightPxTransform = {
  name: "size/lineHeightPx",
  type: "value",
  filter: (token) =>
    token.type === "lineHeights" &&
    typeof token.value === "number" &&
    token.value > 3,
  transform: (token) => `${token.value}px`,
};

export default {
  source: ["tokens.json"],
  expand: {
    include: ["typography"],
  },
  hooks: {
    transforms: {
      "size/calcMultiply": calcMultiplyTransform,
      "size/lineHeightPx": lineHeightPxTransform,
    },
  },
  platforms: {
    css: {
      transformGroup: "css",
      transforms: ["size/calcMultiply", "size/lineHeightPx"],
      prefix: "stellar",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
  },
};
