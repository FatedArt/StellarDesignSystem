# @fatedart/tokens

Design tokens untuk Stellar Design System.

## Workflow (Tokens Studio Free + multi-file sets)

```
Figma (Tokens Studio) ──push──► single/tokens.json (Git, single-file)
                                      │
                                 git pull (Cursor)
                                      │
                                 sync:split
                                      │
                                      ▼
                              sets/*.json (multi-file, derived)
                                      │
                                 pnpm build
                                      │
                                      ▼
                              dist/tokens.css + tokens.js
```

### Source of truth

| File | Peran |
|------|--------|
| `single/tokens.json` | **Source design** — di-sync dari Figma (Tokens Studio Free, mode **file**) |
| `sets/` | **Derived** — di-generate dari `single/tokens.json` setelah pull; untuk review PR & struktur multi-set |
| `dist/` | Output build (Style Dictionary) |

### Setelah pull dari Figma

```bash
pnpm --filter @fatedart/tokens sync:split
pnpm --filter @fatedart/tokens build
```

`sync:split` = split `single/tokens.json` → `sets/` + normalisasi referensi (hapus prefix set).

### Tokens Studio — konfigurasi sync

- **Storage:** File (bukan folder — folder butuh Pro)
- **Path:** `packages/tokens/single/tokens.json`
- **Branch:** `development`

### Engineer edit di code (opsional)

Kalau edit `sets/` langsung (bukan lewat Figma):

```bash
pnpm --filter @fatedart/tokens sync:merge   # sets/ → single/tokens.json
# commit single/tokens.json + sets/, lalu pull manual di Figma
```

## Struktur sets/

```
sets/
├── core.json
├── semantic.json
├── typography.json
├── components.json
├── $metadata.json
└── $themes.json
```

## Build

```bash
pnpm --filter @fatedart/tokens build
```

Output di `dist/`:
- `tokens.css` — CSS custom properties (`var(--stellar-*)`)
- `tokens.js` — ES6 export
- `tokens.d.ts` — TypeScript declarations

## Pakai di project lain

```css
@import '@fatedart/tokens/dist/tokens.css';
```

```ts
import { colorPrimary0 } from '@fatedart/tokens/dist/tokens';
```
