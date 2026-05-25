/**
 * Wrap math expressions in dist/tokens.css with calc() for valid CSS output.
 * Token source uses plain math for Tokens Studio; SD + outputReferences omit calc().
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const cssPath = join(dirname(fileURLToPath(import.meta.url)), "..", "dist", "tokens.css");
let css = readFileSync(cssPath, "utf8");

css = css.replace(
  /^(\s*--[\w-]+:\s*)(.+?\*.+?)(\s*;)$/gm,
  (line, prefix, expr, suffix) => {
    const trimmed = expr.trim();
    return trimmed.startsWith("calc(") ? line : `${prefix}calc(${trimmed})${suffix}`;
  },
);

writeFileSync(cssPath, css);
console.log("Wrapped math expressions in dist/tokens.css with calc()");
