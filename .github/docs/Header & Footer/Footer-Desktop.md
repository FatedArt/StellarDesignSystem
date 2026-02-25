# Footer Desktop (32:5022)

**Design System**: Stellar Design System v1.0  
**Component ID**: 32:5022  
**Platform**: Desktop (≥1024px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan sebagai bottom navigation untuk aplikasi dengan scrollable content
- HARUS `position: sticky; bottom: 0` untuk tetap visible saat scroll
- Displaykan version number dan copyright info yang relevant
- Lebar footer harus full-width default (1712px)
- Selalu resolve nilai dari design tokens, bukan hardcode

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Height** | 59px |
| **Width** | 1712px (full-width) |
| **Padding Horizontal** | 24px (2xl token) |
| **Padding Vertical** | 12px (md token) |
| **Gap Between Items** | 23px |
| **Border** | Top 1px solid |

### Typography Standards
| Element | Style |
|---------|-------|
| **Version Number** | crv/body-regular/small (14px, weight 400) |
| **Copyright Text** | crv/body-regular/small (14px, weight 400) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Background** | `--semantic/dark/dark-7` | #1a1b1e |
| **Border** | `--border/base-default` | #373a40 |
| **Text** | `--semantic/onyx/onyx-0` | #f8f9fa |

### Komponen Internal
1. **Version Text** - "IntelliBroń Threat Intel 2026.1" (dynamic version number)
2. **Copyright Text** - "Copyright © 2024-present ITSEC Asia. All Rights Reserved" (dynamic year)
3. **ITSEC Logo** (75px × 24px) - Right-aligned branding

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Halaman memiliki scrollable content area dengan depth significant
- Perlu menampilkan legal info (copyright) secara persistent
- Version number harus terlihat untuk user (for support/bug reporting)
- Branding ITSEC harus visible di footer
- Layout memerlukan bottom anchor untuk full-page wrapper

### ❌ **DO NOT USE WHEN:**
- Page height < viewport height (no scroll needed, footer akan float)
- Modal dialogs atau overlays (use modal-specific footer)
- Fullscreen UI patterns (maps, video editors, etc.)
- Viewport < 1024px (gunakan Mobile Footer variant)
- Error pages atau auth pages (use custom footer)

### ⚠️ **DO NOT MIX:**
- Desktop footer + Mobile header (inconsistent styling)
- Footer dari different design system versions
- Custom background colors (selalu gunakan token)

---

## 3. Behavior

### Content States

| Element | Behavior | Notes |
|---------|----------|-------|
| **Version Number** | Static display (updates per app release) | Format: "IntelliBroń Threat Intel YYYY.Z" |
| **Copyright Text** | Static display, year ideally dynamic | Format: "Copyright © 2024-present ITSEC Asia. All Rights Reserved" |
| **ITSEC Logo** | Static display | May be clickable to company website (optional) |

#### ✅ **DO:**
- Update version dynamically dari app config/environment
- Keep copyright year current (use dynamic YYYY dari system date)
- Display consistent format untuk version number
- Show full copyright text tanpa truncation
- Use proper HTML entities (`&copy;`) untuk copyright symbol

#### ❌ **DON'T:**
- Hardcode version/year (will become outdated)
- Truncate copyright text dengan ellipsis
- Change footer height saat content updates
- Add interactive elements selain logo (footer is informational)
- Use static/hardcoded copyright year

---

### Scroll Behavior
- Footer tetap `position: sticky; bottom: 0`
- No hide/show animation saat scroll
- Always visible, tidak tersembunyi oleh content
- Jika content area kosong/short, footer tetap stick di bottom sebagai fallback

#### ✅ **DO:**
- Maintain sticky positioning sepanjang page lifecycle
- Ensure footer visible di viewport setiap saat
- Set z-index < header untuk proper layering
- Add subtle shadow untuk depth (optional)
- Keep footer padding consistent

#### ❌ **DON'T:**
- Hide footer saat scroll
- Change positioning type (sticky → fixed/absolute)
- Use transform yang affects z-index stacking
- Overlap content dengan footer tanpa z-index handling
- Add bottom margin yang push footer down

---

### Interaction States
| Element | Interaction | Behavior | Visual Feedback |
|---------|---|---|---|
| **ITSEC Logo** | Hover | Pointer change (optional clickable) | Subtle opacity change atau glow effect |
| **ITSEC Logo** | Click | Navigate ke external company URL (optional) | Browser navigation, no internal state change |

#### ✅ **DO:**
- Provide hover state jika logo clickable (opacity change 0.8)
- Open external link dalam new tab (`target="_blank"`)
- Add proper `rel="noopener noreferrer"` untuk security
- Show pointer cursor untuk clickable logo
- Provide visual feedback (opacity/scale) saat hover

#### ❌ **DON'T:**
- Make logo clickable tanpa visual indication
- Navigate to external URL tanpa new tab (break user context)
- Change footer layout saat hover
- Use confusing cursor styles (e.g., not-allowed untuk clickable element)
- Remove logo opacity entirely on hover (too harsh)

---

### Loading & Error States
- **Version Update**: Instant text swap saat app update (no animation)
- **Network Error**: Footer tetap visible even offline
- **Fallback**: If version unavailable, use hardcoded fallback version

#### ✅ **DO:**
- Show fallback version jika API unavailable
- Handle missing data gracefully
- Maintain footer visibility saat network issues
- Keep footer functional offline
- Provide placeholder text jika real data unavailable

#### ❌ **DON'T:**
- Hide footer jika data cannot load
- Show loading spinner di footer (informational element)
- Disable footer saat network error
- Remove content saat update (instant swap only)
- Show error messages dalam footer (use notification system)

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Very Long Copyright Text** | Truncate dengan ellipsis jika space terbatas (rare) |
| **Missing Version Data** | Show fallback version number |
| **Offline Network** | Footer tetap fully visible |
| **Print View** | Footer recommended hidden dalam print CSS media query |

#### ✅ **DO:**
- Provide fallback version format
- Wrap copyright text untuk small screens (mobile)
- Test footer dalam print preview
- Ensure color contrast adequate untuk visibility
- Handle print stylesheets dengan footer display hidden

#### ❌ **DON'T:**
- Leave footer blank jika data missing
- Hardcode values without fallback
- Show footer dalam print output (distraction)
- Use colors that lose contrast dalam print
- Break layout jika copyright text very long

---

## Asset Requirements
- ITSEC Logo (75px × 24px)
- Dynamic version string dari app config/env

---

## Implementation Checklist
- [ ] Use design tokens untuk colors
- [ ] Sticky positioning dengan bottom: 0
- [ ] Version number dari app config/env (dynamic)
- [ ] Copyright year ideally dynamic (© YYYY-present)
- [ ] Fallback styling jika logo tidak load
- [ ] Responsive layout handling jika text panjang
- [ ] ARIA labels untuk logo link (if clickable)
- [ ] Testing: scroll depth, content overflow, print view

---

## Content Examples

### Version Format
```
IntelliBroń Threat Intel 2026.1
```

### Copyright Format
```
Copyright © 2024-present ITSEC Asia. All Rights Reserved
```

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
