/**
 * Split monolithic tokens.json → multi-file Token Studio folder layout.
 * Run: node scripts/split-token-sets.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const tokensPath = join(root, "tokens.json");
const setsDir = join(root, "sets");

const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
const tokenSetOrder = tokens.$metadata?.tokenSetOrder ?? [
  "core",
  "semantic",
  "typography",
  "components",
];

mkdirSync(setsDir, { recursive: true });

for (const setName of tokenSetOrder) {
  if (!tokens[setName]) {
    throw new Error(`Missing token set "${setName}" in tokens.json`);
  }
  writeFileSync(
    join(setsDir, `${setName}.json`),
    `${JSON.stringify(tokens[setName], null, 2)}\n`,
  );
}

writeFileSync(
  join(setsDir, "$metadata.json"),
  `${JSON.stringify({ tokenSetOrder }, null, 2)}\n`,
);

writeFileSync(
  join(setsDir, "$themes.json"),
  `${JSON.stringify(tokens.$themes ?? [], null, 2)}\n`,
);

console.log(`Wrote ${tokenSetOrder.length} sets to sets/`);
console.log(`Order: ${tokenSetOrder.join(" → ")}`);
