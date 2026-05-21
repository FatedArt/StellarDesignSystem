# Typography

Sistem tipografi Stellar mendefinisikan skala ukuran, weight, dan line-height konsisten.

## Token typografi

Token didefinisikan di set `Typhography` dengan struktur:

```
Typhography.crv.body-regular.xs
Typhography.crv.body-regular.sm
Typhography.crv.body-regular.md
...
```

Tiap token berisi: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`.

## Cara pakai

```css
font-size: var(--stellar-typhography-crv-body-regular-md-fontSize);
font-weight: var(--stellar-typhography-crv-body-regular-md-fontWeight);
line-height: var(--stellar-typhography-crv-body-regular-md-lineHeight);
```
