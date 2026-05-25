# Spacing

Skala spacing Stellar menggunakan basis **2px grid** (`core.sizes.unit2`):

| Token | Nilai |
|---|---|
| `core.spacing.xxs` | 2px |
| `core.spacing.xs` | 4px |
| `core.spacing.sm` | 8px |
| `core.spacing.md` | 12px |
| `core.spacing.lg` | 16px |
| `core.spacing.xl` | 20px |
| `core.spacing.2xl` | 24px |
| `core.spacing.3xl` | 32px |
| `core.spacing.4xl` | 40px |

## Cara pakai

Di komponen, gunakan token **components** (bukan core langsung):

```css
padding: var(--stellar-components-button-size-md-padding-y)
  var(--stellar-components-button-size-md-padding-x);
gap: var(--stellar-components-header-footer-header-gap);
```
