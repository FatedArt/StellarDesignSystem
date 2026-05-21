# @stellar/tokens

Design tokens untuk Stellar Design System, di-generate dari `tokens.json` (Tokens Studio for Figma).

## Cara kerja

```
Figma → Tokens Studio plugin → tokens.json (Git) → Style Dictionary → dist/tokens.css + dist/tokens.js
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
@import '@stellar/tokens/dist/tokens.css';
```

```ts
import { colorPrimary0 } from '@stellar/tokens/dist/tokens';
```

## Update token dari Figma

1. Buka plugin **Tokens Studio** di Figma
2. Sync ke GitHub (branch `main`, path `packages/tokens/tokens.json`)
3. Buat PR → review → merge → CI otomatis build
