/**
 * Style Dictionary config
 * Transforms tokens.json (Tokens Studio format) → CSS variables + JS/TS
 */

export default {
  source: ["tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
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
