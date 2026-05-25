/**
 * Prebuild: use committed tokens.json (Figma source) when present,
 * otherwise merge sets/ → tokens.json (engineer fallback).
 */

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const tokensPath = join(scriptsDir, "..", "tokens.json");

function run(scriptName) {
  const result = spawnSync("node", [join(scriptsDir, scriptName)], {
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (existsSync(tokensPath)) {
  console.log("Using existing tokens.json for Style Dictionary build");
} else {
  console.log("tokens.json not found — merging from sets/");
  run("merge-token-sets.mjs");
}
