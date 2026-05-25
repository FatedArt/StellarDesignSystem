/**
 * Post-pull workflow: tokens.json (Figma / Tokens Studio single-file) → sets/
 *
 * Run after git pull when tokens.json changed from Tokens Studio sync:
 *   pnpm --filter @fatedart/tokens sync:split
 *
 * Steps:
 * 1. split-token-sets.mjs — extract core/semantic/typography/components
 * 2. fix-cross-set-refs.mjs — strip set prefixes, normalize color keys
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(scriptsDir, "..", "single", "tokens.json");

if (!existsSync(tokensPath)) {
  console.error("Missing packages/tokens/single/tokens.json — pull from Git or run pnpm merge first.");
  process.exit(1);
}

function run(scriptName) {
  const result = spawnSync("node", [join(scriptsDir, scriptName)], {
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("split-token-sets.mjs");
run("fix-cross-set-refs.mjs");

console.log("Synced single/tokens.json → sets/ (ready for review & build)");
