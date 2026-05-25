---
name: stellar-tokens
description: >-
  Maintain Stellar Design System tokens: Figma single-file sync (tokens.json),
  derived multi-file sets, reference normalization, and Style Dictionary builds.
  Use when editing packages/tokens, syncing from Tokens Studio Free, splitting
  or merging token sets, fixing broken aliases, or token CI/build failures.
---

# Stellar Tokens

## Workflow (Tokens Studio Free)

**Source of truth:** `packages/tokens/tokens.json` (single-file, synced from Figma)

**Derived:** `packages/tokens/sets/` (multi-file, for review & structure)

```
Figma push → tokens.json → git pull → sync:split → sets/ → build → dist/
```

### After git pull (Figma changed tokens)

```bash
pnpm --filter @fatedart/tokens sync:split
pnpm --filter @fatedart/tokens build
```

### Tokens Studio sync config

| Setting | Value |
|---------|-------|
| Storage | **File** (not folder — folder needs Pro) |
| Path | `packages/tokens/tokens.json` |
| Branch | `development` |

## Reference format

**`sets/*.json`** — no set prefix:

```json
"value": "{spacing.sm}"
"value": "{color.action.primary}"
"value": "{crv.body-medium.small}"
```

**`tokens.json`** — with set prefix (Style Dictionary):

```json
"value": "{core.spacing.sm}"
"value": "{semantic.color.action.primary}"
"value": "{typography.crv.body-medium.small}"
```

`sync:split` strips prefixes when generating `sets/`. `sync:merge` re-adds them to `tokens.json`.

## Scripts

| Command | When |
|---------|------|
| `sync:split` | After pull — `tokens.json` → `sets/` + normalize refs |
| `sync:merge` | After editing `sets/` — `sets/` → `tokens.json` |
| `build` | Style Dictionary → `dist/` |
| `fix-cross-set-refs.mjs` | Manual ref normalization in `sets/` |

## Set structure

Order from `$metadata.json`: `core` → `semantic` → `typography` → `components`

| Set | Top-level keys |
|-----|----------------|
| core | `spacing`, `radius`, `brColors`, `dfColors`, `fontSizes`, … |
| semantic | `color`, `opacity` |
| typography | `crv` |
| components | `button`, `inputField`, `headerFooter` |

## Is this ideal?

**Yes for Free tier** — pragmatic split between Figma sync (single-file) and repo structure (multi-file).

**Trade-offs:**
- Two representations — always run `sync:split` after pull
- Don't edit `sets/` without `sync:merge` + Figma pull
- Pro tier would allow direct folder sync and skip this bridge

**Upgrade path:** Tokens Studio Pro → sync folder `packages/tokens/sets/` directly, retire split/merge bridge.
