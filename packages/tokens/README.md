# @fatedart/tokens

Design tokens untuk Stellar Design System, di-sync dari Tokens Studio for Figma ke folder `sets/`.

## Cara kerja

```
Figma → Tokens Studio plugin → sets/*.json (Git) → merge → Style Dictionary → dist/tokens.css + dist/tokens.js
```

## Struktur Token Studio (sidebar)

```
sets/
├── core.json          ← primitif (spacing, warna, font scale)
├── semantic.json      ← makna UI (action, text, background, border)
├── typography.json    ← composite text styles
├── components.json    ← token per komponen (Button, InputField, …)
├── $metadata.json     ← urutan set
└── $themes.json
```

## Build

```bash
pnpm build
```

Output tersedia di `dist/`:
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

## Update token dari Figma

1. Buka plugin **Tokens Studio** di Figma
2. Sync ke GitHub (branch `development`, **Folder** `packages/tokens/sets`)
3. Pull di Figma → sidebar harus menampilkan: `core`, `semantic`, `typography`, `components`
4. Buat PR → review → merge → CI otomatis build
