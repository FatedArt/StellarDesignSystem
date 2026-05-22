# Stellar Design System

Sistem desain untuk produk Stellar — token, komponen React, dan dokumentasi dalam satu monorepo.

## Struktur repo

```
StellarDesignSystem/
├── packages/
│   ├── tokens/     # Design tokens (Tokens Studio → Style Dictionary → CSS/JS)
│   ├── ui/         # Komponen React
│   └── icons/      # Icon set
├── apps/
│   ├── storybook/  # Preview komponen live (Storybook 8)
│   └── docs/       # Guidelines & dokumentasi (Docusaurus)
├── .github/
│   └── workflows/  # CI build + deploy
└── README.md
```

## Quick start

### Prasyarat

- Node.js ≥ 20
- pnpm ≥ 9 (`npm i -g pnpm`)

### Install

```bash
git clone https://github.com/FatedArt/StellarDesignSystem.git
cd StellarDesignSystem
pnpm install
```

### Build tokens

```bash
pnpm tokens:build
```

### Jalankan Storybook

```bash
pnpm storybook
# → http://localhost:6006
```

### Jalankan Docs

```bash
pnpm docs
# → http://localhost:3000
```

## Alur kerja token (Figma → code)

```
Figma (Tokens Studio plugin)
  ↓  sync to GitHub
packages/tokens/tokens.json
  ↓  Style Dictionary build
packages/tokens/dist/tokens.css  +  tokens.js
  ↓  import
packages/ui  →  apps/storybook  →  produk
```

## Packages

| Package | Keterangan |
|---|---|
| `@fatedart/tokens` | CSS variables + JS dari Figma tokens |
| `@fatedart/ui` | Komponen React + TypeScript |
| `@fatedart/icons` | Icon sebagai komponen React |

## Branch strategy

- `main` = branch production (dipakai developer sebagai source stabil)
- `development` = branch eksplorasi/integrasi sebelum rilis ke `main`
- Branch fitur/bug dibuat dari `development`, lalu merge ke `development`
- Rilis production dilakukan lewat PR `development` -> `main`

## Konsumsi package via GitHub Packages

Tambahkan autentikasi di project konsumen:

```bash
echo "@fatedart:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=\${NODE_AUTH_TOKEN}" >> .npmrc
```

Lalu install:

```bash
pnpm add @fatedart/ui @fatedart/tokens
```

Gunakan di app:

```tsx
import "@fatedart/tokens/dist/tokens.css";
import { Button } from "@fatedart/ui";
```

## CI/CD

| Workflow | Trigger | Output |
|---|---|---|
| `ci.yml` | Push ke `development`/`main` + PR ke `main` | Lint + build semua packages |
| `deploy-storybook.yml` | Push ke `main` (ui/storybook berubah) | Chromatic deployment |
| `deploy-docs.yml` | Push ke `main` (docs/tokens berubah) | Vercel deployment |
| `release-packages.yml` | Push ke `main` (ui/tokens berubah) / manual trigger | Publish package ke GitHub Packages |

## Contributing

Lihat [CONTRIBUTING.md](apps/docs/docs/contributing.md) untuk panduan lengkap.

## Links

- [Storybook](https://stellar-storybook.vercel.app)
- [Docs](https://stellar-ds.vercel.app)
- [Figma Library](#) _(link Figma DS Anda)_
