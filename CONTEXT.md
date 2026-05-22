# Stellar Design System — Context File

> File ini adalah rangkuman percakapan dan keputusan desain sistem.
> Selalu **update file ini** (jangan buat file baru) saat konteks bertambah.
> Gunakan di New Agent dengan cara: lampirkan `@CONTEXT.md` di awal sesi.

---

## Metadata

| | |
|---|---|
| **Repo** | https://github.com/FatedArt/StellarDesignSystem |
| **Owner** | FatedArt (akun GitHub) |
| **Lokasi lokal** | `~/Projects/StellarDesignSystem` |
| **Branch default** | `main` |
| **Terakhir diperbarui** | 21 Mei 2026 |

---

## Ringkasan Percakapan

### Sesi 1 — Alternatif Open Source untuk Design System (seperti ZeroHeight)

**Pertanyaan awal:** Apakah ada alternatif open source yang cocok untuk kebutuhan design system seperti ZeroHeight?

**Kesimpulan utama:** Tidak ada satu produk OSS yang menggantikan ZeroHeight secara utuh. ZeroHeight menggabungkan dokumentasi no-code, sync Figma/Storybook, token pipeline, adoption tracking, dan governance dalam satu platform hosted. Yang realistis di OSS adalah menyusun stack beberapa tool.

#### Peta alternatif OSS (per fungsi ZeroHeight)

| Fungsi ZeroHeight | Tool OSS | Catatan |
|---|---|---|
| Dokumentasi komponen (dari code) | **Storybook**, Ladle, Histoire | Paling dekat untuk "living components" |
| Situs panduan / guidelines | **Docusaurus**, VitePress, Astro Starlight, MkDocs | Konten Markdown/MDX di Git |
| Design tokens (Figma → code) | **Tokens Studio** (plugin Figma) + **Style Dictionary** / Terrazzo | Pipeline token, bukan wiki desain |
| Tool desain OSS | **Penpot** | Alternatif Figma; punya komponen & token DTCG |
| Portal internal tim | **Backstage** + TechDocs | Kuat untuk engineering, kurang untuk designer no-code |
| Contoh DS production (referensi) | **Primer**, **Polaris**, **Carbon** (semua OSS) | Bukan platform, tapi pola arsitektur |

#### Tool utama yang paling relevan

- **Storybook** — ekosistem besar, addon a11y + Figma embed, standar industri. Kekurangan: butuh coding, bukan tempat guidelines panjang.
- **Docusaurus + Storybook** — pola paling umum menggantikan ZeroHeight. Stack: Figma → Tokens Studio → Git → Style Dictionary → Docusaurus (guidelines) + Storybook (komponen live).
- **Tokens Studio for Figma** — MIT, sync token ke GitHub. Platform cloud berbayar untuk fitur enterprise.
- **Style Dictionary** (Amazon, Apache 2.0) — build pipeline token ke CSS/JS/iOS/Android, ~4.6k stars, 1.5M weekly downloads.
- **Terrazzo** — token modern, import Figma Variables/Styles, DTCG-compatible, lebih baru dari Style Dictionary.
- **Ladle / Histoire** — alternatif Storybook lebih ringan (Ladle: React, Histoire: Vue/Svelte).
- **Penpot** — OSS design tool, komponen + token W3C DTCG, bisa self-host. Ekosistem plugin lebih kecil dari Figma.
- **Backstage + TechDocs** — portal engineering (Apache 2.0), kurang design-system-first.

#### Gap OSS vs ZeroHeight (yang belum tercakup)

- Tidak ada editor no-code untuk designer
- Sync Figma → halaman docs tidak otomatis/seamless
- Tidak ada adoption tracking komponen di production bawaan
- Governance dashboard (status design/code/docs) harus custom

#### Stack OSS yang paling mirip ZeroHeight

```
Figma → Tokens Studio → Git → Style Dictionary/Terrazzo
      → Storybook (komponen live)
      → Docusaurus (guidelines, anatomy, do/don't, token pages)
      → CI (GitHub Actions) deploy ke Vercel/Netlify/GitHub Pages
```

---

### Sesi 2 — Penpot + Figma: Bisa Dipakai Bersamaan?

**Pertanyaan:** Jika menggunakan Figma, apakah bisa pakai Penpot juga?

**Jawaban:** Bisa, tapi dengan catatan — Penpot bukan pengganti Figma yang hidup berdampingan secara real-time. Lebih tepat sebagai import/migrasi atau salinan sekunder.

**Cara import Figma → Penpot:**
1. Install [Penpot Exporter for Figma](https://github.com/penpot/penpot-exporter-figma-plugin) (MIT, aktif diupdate — v0.20.1 April 2026)
2. Export file design system dulu, baru file produk
3. Import `.zip` ke Penpot, salin URL library, link di plugin sebelum export file lain

**Batasan penting:**
- Tidak ada sync dua arah — perubahan Figma tidak otomatis masuk Penpot
- Fidelity import tidak 100% (auto-layout, efek kompleks bisa rusak)
- Token Figma Variables/Tokens Studio tidak otomatis jadi token Penpot
- Tim hybrid jangka panjang mahal secara operasional

**Rekomendasi:** Kalau tetap di Figma, Penpot tidak wajib. Stack OSS natural tetap: `Figma → Tokens Studio → Style Dictionary → Storybook + Docusaurus`.

---

### Sesi 3 — Flow Ideal & Step-by-Step Design System

**Pertanyaan:** Flow paling ideal bagaimana? Step by step tahapan yang perlu dilakukan.

**Prinsip:** Satu rantai, satu sumber kebenaran per lapisan.

```
Figma → Tokens Studio → Style Dictionary → Komponen (React) → Storybook → Docusaurus → CI/CD
```

**Aturan emas:**
- Design = Figma | Token = Git (bukan copy-paste manual) | Komponen hidup = code + Storybook | Guidelines = Docusaurus
- Jangan maintain dua tempat untuk hal yang sama

#### 6 Fase implementasi

| Fase | Isi | Durasi |
|---|---|---|
| **0 — Fondasi** | Audit Figma, scope MVP (5–10 komponen), repo kosong, CONTRIBUTING.md | Minggu 1 |
| **1 — Tokens di Git** | Tokens Studio + Style Dictionary, CI token build, CSS/JS output | Minggu 1–2 |
| **2 — Komponen di code** | Package UI, komponen pakai token, unit test dasar | Minggu 2–4 |
| **3 — Storybook** | Stories semua variant+states, addon a11y+designs, deploy Chromatic | Minggu 3–4 |
| **4 — Docusaurus** | Guidelines, token pages, embed Storybook, deploy Vercel | Minggu 4–6 |
| **5 — CI/CD + governance** | Pipeline PR, versioning, changelog, proses kontribusi | Minggu 5–6 |
| **6 — Adoption** | Pilot 1 squad, ESLint rule, office hours, metrik adoption | Minggu 6+ |

**Timeline realistis:** 1 designer + 1–2 engineer = MVP dalam 6–8 minggu.

---

### Sesi 4 — Repo StellarDesignSystem & Setup Monorepo

**Status repo sebelum setup:**
- URL: https://github.com/FatedArt/StellarDesignSystem (public)
- Isi: hanya 1 file `tokens.json` (~14 KB, format Tokens Studio)
- Token sets: `main` (spacing + warna primitif) + `Typhography` (tipografi)
- Ada PR `w3c-dtcg-conversion-revert` — pernah coba konversi ke DTCG lalu di-revert

**Monorepo yang sudah dibangun di `~/Projects/StellarDesignSystem`:**

```
StellarDesignSystem/
├── packages/
│   ├── tokens/          # tokens.json + sd.config.mjs (Style Dictionary v4)
│   ├── ui/              # Button.tsx + CSS modules + TypeScript
│   └── icons/           # Placeholder siap diisi
├── apps/
│   ├── storybook/       # Storybook 8, preview.ts, Button.stories.tsx
│   └── docs/            # Docusaurus 3.5
├── .github/workflows/
│   ├── ci.yml           # Build semua packages di setiap PR
│   ├── deploy-storybook.yml  # Deploy ke Chromatic
│   └── deploy-docs.yml  # Deploy ke Vercel
├── package.json         # pnpm workspace scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .gitignore
└── README.md
```

---

## Keputusan Teknis

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Package manager | **pnpm** v9 | Workspace support, efisien |
| Monorepo | **pnpm workspace** | Cukup untuk skala saat ini |
| UI framework | **React** + TypeScript | Standar industri |
| Component docs | **Storybook** 8 | Ekosistem terbesar, addon a11y, Figma embed |
| Guidelines site | **Docusaurus** 3.5 | MDX, versioning, SEO, i18n |
| Token pipeline | **Tokens Studio** → **Style Dictionary** v4 | Figma-native + output CSS/JS |
| CI | **GitHub Actions** | Native GitHub, gratis |
| Storybook hosting | **Chromatic** | Visual testing + deployment |
| Docs hosting | **Vercel** | Zero-config, preview per PR |
| Node.js | **≥ 20** | LTS current |

---

## Packages

| Package | Nama npm | Isi |
|---|---|---|
| tokens | `@stellar/tokens` | CSS variables + JS dari tokens.json |
| ui | `@stellar/ui` | Komponen React |
| icons | `@stellar/icons` | Icon set (placeholder) |
| storybook | `@stellar/storybook` (private) | Preview komponen |
| docs | `@stellar/docs` (private) | Docusaurus site |

---

## Komponen yang Sudah Ada

### Button (`packages/ui/src/components/Button/`)
- **Variants:** `primary`, `secondary`, `ghost`, `danger`
- **Sizes:** `sm`, `md`, `lg`
- **States:** default, hover, disabled, loading (spinner animasi)
- **Token:** pakai CSS variables `--stellar-crv-br-colors-primary-*`
- **Story:** `apps/storybook/stories/Button.stories.tsx` (semua variants + sizes)

---

## Halaman Docs yang Sudah Ada

| File | URL path |
|---|---|
| `docs/getting-started.md` | `/docs/getting-started` |
| `docs/foundations/color.md` | `/docs/foundations/color` |
| `docs/foundations/typography.md` | `/docs/foundations/typography` |
| `docs/foundations/spacing.md` | `/docs/foundations/spacing` |
| `docs/components/button.mdx` | `/docs/components/button` |
| `docs/tokens/overview.md` | `/docs/tokens/overview` |
| `docs/contributing.md` | `/docs/contributing` |

---

## Token Structure (dari tokens.json)

```
main/
├── 2, 4, 6, 8, 10, 12, 14, 16, 18, 20   ← spacing (px)
├── body                                   ← typography shorthand
└── crv/
    └── br-colors/
        ├── primary/    0–9 (color scale)
        └── secondary/  0–9 (color scale)

Typhography/
└── crv/
    └── body-regular/
        └── xs, sm, md... (fontFamily, fontSize, fontWeight, lineHeight)
```

---

## Backlog Langkah Selanjutnya

- [ ] `pnpm install` lalu `pnpm tokens:build` untuk generate `dist/`
- [ ] Konfigurasi Tokens Studio di Figma → sync ke `packages/tokens/tokens.json`
- [ ] Tambah GitHub Secrets: `CHROMATIC_PROJECT_TOKEN`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- [ ] Update link Figma di Button story (`parameters.design.url`)
- [ ] Tambah `packages/ui/tsconfig.build.json`
- [ ] Tambah komponen berikutnya: Input, Badge, Alert, Typography
- [ ] Isi `foundations/elevation.md` dan `foundations/accessibility.md`
- [ ] Pilot: 1 squad produk migrasi pakai `@stellar/ui`

---

## Referensi

- [Tokens Studio for Figma](https://github.com/tokens-studio/figma-plugin) — MIT
- [Style Dictionary v4](https://styledictionary.com) — Apache 2.0
- [Storybook 8](https://storybook.js.org) — MIT
- [Docusaurus 3](https://docusaurus.io) — MIT
- [Penpot Exporter Plugin](https://github.com/penpot/penpot-exporter-figma-plugin) — MIT
- Referensi DS OSS: [GitHub Primer](https://primer.style), [Shopify Polaris](https://polaris.shopify.com), [IBM Carbon](https://carbondesignsystem.com)
