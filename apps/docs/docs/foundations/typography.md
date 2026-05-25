# Typography

Sistem tipografi Stellar mendefinisikan skala ukuran, weight, dan line-height konsisten.

## Token typografi

Token didefinisikan di set `typography` dengan struktur:

```
typography.crv.body-regular.xsmall
typography.crv.body-regular.small
typography.crv.body-medium.medium
...
```

Tiap token berisi: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`.

## Cara pakai di CSS

Style Dictionary mengekspansi token typography menjadi variabel per properti:

```css
font-family: var(--stellar-typography-crv-body-regular-small-font-family);
font-weight: var(--stellar-typography-crv-body-regular-small-font-weight);
font-size: calc(var(--stellar-core-sizes-default-2px) * 7);
line-height: calc(var(--stellar-typography-crv-body-regular-small-line-height) * 1px);
letter-spacing: var(--stellar-typography-crv-body-regular-small-letter-spacing);
```

Di `@fatedart/ui`, gunakan utility class dari `typography.module.css` (mis. `bodyRegularSmall`, `bodyMediumSmall`).

## Mapping komponen (Figma)

| Komponen | Elemen | Token Figma |
|---|---|---|
| Button | xs, sm | `crv/body-medium/xsmall` |
| Button | md | `crv/body-medium/small` |
| Button | lg | `crv/body-semibold/medium` |
| Button | xl | `crv/body-semibold/xlarge` |
| Input Field | label | `crv/body-medium/small` |
| Input Field | input sm / md / lg | `crv/body-regular/xsmall` / `small` / `medium` |
| Input Field | helper text | `crv/body-regular/xsmall` |
| Header/Footer | logo mark | `crv/uppercase/large` |
| Header/Footer | logo compact | `crv/uppercase/small` |
| Header/Footer | search, footer copy | `crv/body-regular/small` |
| Header/Footer | account name | `crv/body-semibold/small` |
| Header/Footer | account role | `crv/body-regular/xsmall` |
