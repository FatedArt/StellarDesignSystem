# Getting Started

Selamat datang di **Stellar Design System** — sistem desain yang menghubungkan Figma, design tokens, dan komponen React.

## Instalasi

### 1. Install package

```bash
pnpm add @stellar/ui @stellar/tokens
```

### 2. Import tokens CSS

Di file root app Anda (mis. `main.tsx` atau `_app.tsx`):

```ts
import "@stellar/tokens/dist/tokens.css";
```

### 3. Gunakan komponen

```tsx
import { Button } from "@stellar/ui";

export default function App() {
  return <Button variant="primary">Halo Stellar!</Button>;
}
```

## Struktur sistem

| Package | Isi |
|---|---|
| `@stellar/tokens` | CSS variables + JS tokens dari Figma |
| `@stellar/ui` | Komponen React |
| `@stellar/icons` | Icon set sebagai komponen React |

## Resources

- [Storybook](https://stellar-storybook.vercel.app) — preview komponen hidup
- [GitHub](https://github.com/FatedArt/StellarDesignSystem) — source code
- [Figma](https://figma.com) — design library
