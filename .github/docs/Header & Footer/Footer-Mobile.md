# Mobile Footer (1144:9739)

**Design System**: Stellar Design System v1.0  
**Component ID**: 1144:9739  
**Platform**: Mobile (<768px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan untuk viewport width ≤ 767px dengan scrollable content
- HARUS `position: sticky; bottom: 0` untuk tetap visible saat scroll
- Konten stacked vertically (version → copyright → logo)
- Gunakan design tokens untuk styling
- Full-width mobile footer (320px container)

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Height** | ~190px (flexible, content-based) |
| **Width** | 320px |
| **Padding** | 32px (m-4xl token) all sides |
| **Gap Between Items** | 16px (lg token) |
| **Background** | `--base/dark/dark-10` #101113 |

### Komponen Internal
| Element | Size | Layout |
|---------|------|--------|
| **Version Text** | Auto (text) | Top, left-aligned |
| **Copyright Text** | Auto (text) | Middle, left-aligned, multi-line |
| **ITSEC Logo** | 75px × 24px | Bottom-right area |

### Typography Standards
| Element | Style |
|---------|-------|
| **Version** | crv/body-regular/small (14px, weight 400, line-height 18px) |
| **Copyright** | crv/body-regular/small (14px, weight 400, line-height 18px) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Background** | `--base/dark/dark-10` | #101113 |
| **Text** | `--base/onyx/onyx-0` | #f8f9fa |

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Viewport width ≤ 767px (mobile platform)
- Halaman memiliki scrollable content depth significant
- Perlu menampilkan version number dan copyright pada mobile
- Branding ITSEC harus visible di footer
- Layout memerlukan bottom anchor untuk full-page wrapper mobile
- Content area membutuhkan footer context saat scroll

### ❌ **DO NOT USE WHEN:**
- Viewport ≥ 1024px (gunakan Desktop Footer)
- Page height < viewport height (no scroll needed, footer akan float)
- Modal dialogs atau overlays
- Fullscreen UI patterns (maps, full-screen editors)
- Error pages atau auth pages (use custom footer)
- Component testing isolated tanpa scroll context

### ⚠️ **DO NOT MIX:**
- Mobile footer + Desktop header (always matched pair)
- Footer dari different design system versions
- Custom colors selain design tokens
- Mobile footer dalam desktop viewport

---

## 3. Behavior

### Content Display

#### **Footer Section States**
| Element | Behavior | Display |
|---------|----------|---------|
| **Version Number** | Static text, updates per app release | "IntelliBroń Threat Intel 2026.1" |
| **Copyright Text** | Static text, year ideally dynamic | "Copyright © 2024-present ITSEC Asia.\nAll Rights Reserved" (multi-line) |
| **ITSEC Logo** | Static graphic | Right-aligned dalam footer box |

##### ✅ **DO:**
- Display version dari app config dynamically
- Keep copyright year current (dynamic YYYY)
- Show full copyright text dengan line breaks
- Use proper HTML entities (`&copy;`)
- Format consistently dengan desktop footer

##### ❌ **DON'T:**
- Hardcode version/year (becomes outdated)
- Hide copyright text pada small screens
- Use abbreviated copyright (show full legal text)
- Change footer content format
- Remove copyright line breaks

---

### Scroll Behavior
- Footer tetap `position: sticky; bottom: 0` saat page scroll
- Konten di atas scrolls behind footer
- No hide/show animation
- Always visible, tidak tersembunyi
- Jika content short, footer stick di bottom sebagai fallback

##### ✅ **DO:**
- Maintain sticky positioning konsisten throughout scroll
- Keep footer visible di viewport setiap saat
- Layer footer pada top dengan proper z-index
- Add subtle shadow untuk depth (optional)
- Ensure footer tidak cover important content

##### ❌ **DON'T:**
- Hide footer saat scroll
- Use fixed positioning instead sticky
- Allow footer overlap dengan actual scroll content
- Remove footer saat content loads
- Use z-index < 10 (too low untuk mobile)

---

### Interaction States
| Element | Interaction | Behavior | Visual Feedback |
|---|---|---|---|
| **Logo** | Hover | Pointer change (optional clickable) | Subtle opacity change |
| **Logo** | Click | Navigate ke company website (optional) | Browser navigation |

##### ✅ **DO:**
- Provide hover state jika logo clickable (opacity 0.8)
- Open external link dalam new tab (`target="_blank"`)
- Add `rel="noopener noreferrer"` untuk security
- Show pointer cursor untuk clickable logo
- Provide clear visual feedback (opacity/scale)

##### ❌ **DON'T:**
- Make logo clickable tanpa visual indication
- Open link dalam same tab (break user context)
- Miss security attributes (noopener/noreferrer)
- Ambiguous cursor styles (not-allowed untuk clickable)
- Over-animate hover state (keeps accessibility)

---

### Layout Behavior

#### **Text Wrapping**
- Version text: single line atau wrap jika space terbatas
- Copyright text: multi-line permitted (whitespace-pre-wrap dalam design)
- Logo: positioned bottom-right, tidak wrap

##### ✅ **DO:**
- Allow copyright text wrap ke multiple lines
- Maintain readable line length (< 80 chars per line)
- Keep logo right-aligned dalam footer box
- Preserve padding pada wrapped text
- Test di various screen widths

##### ❌ **DON'T:**
- Truncate copyright dengan ellipsis
- Force single-line copyright (breaks readability)
- Float logo left (breaks mobile layout)
- Remove padding saat text wraps
- Assume fixed screen width

---

#### **Padding & Spacing**
```
32px padding all sides (m-4xl token)
16px gap between text items (lg token)
Logo positioned dengan right alignment dalam available space
```

##### ✅ **DO:**
- Use design token spacing (32px m-4xl)
- Maintain consistent gaps (16px lg token)
- Keep padding consistent pada all sides
- Logo positioned right-aligned consistently
- Update spacing jika design tokens change

##### ❌ **DON'T:**
- Hardcode padding values (use tokens)
- Change spacing based on content length
- Use asymmetric padding
- Reposition logo based on viewport
- Ignore token spacing system

---

### Loading & Error States
| State | Behavior |
|---|---|
| **Version Update** | Instant text swap (no animation) |
| **Offline Network** | Footer tetap fully visible |
| **Missing Data** | Show fallback/placeholder text |

##### ✅ **DO:**
- Swap version text instantly saat update
- Maintain footer visibility saat offline
- Provide fallback version format
- Keep footer accessible even with missing data
- Test offline behavior thoroughly

##### ❌ **DON'T:**
- Animate version updates (jarring)
- Hide footer saat network error
- Leave footer blank jika data missing
- Show loading spinner (not informational element)
- Disable footer functionality offline

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Screen Rotation (Landscape)** | Footer height adjust, content reflow, logo repositioned |
| **Very Small Screen (< 280px)** | Text truncate dengan ellipsis, logo scale down jika perlu |
| **Safe Area/Notch** | Padding adjust untuk bottom safe area (CSS safe-area-inset) |
| **Print View** | Footer recommended hidden dalam print media query |
| **Very Long Copyright Text** | Text wrap ke multiple lines (design supports multi-line) |

##### ✅ **DO:**
- Handle landscape orientation gracefully
- Test pada small devices (iPhone SE, etc.)
- Use safe-area-inset CSS untuk notched devices
- Hide footer dalam print stylesheets
- Allow copyright text wrap to 2-3 lines
- Test actual devices + emulators

##### ❌ **DON'T:**
- Break layout saat device rotation
- Assume minimum screen width > 280px
- Ignore notched/safe area on modern phones
- Overlap content footer dalam print
- Truncate copyright unnecessarily
- Rely only on simulator testing

---

## Content Examples

### Version Format (Dynamic)
```
IntelliBroń Threat Intel 2026.1
```

### Copyright Format (Dynamic Year)
```
Copyright © 2024-present ITSEC Asia.
All Rights Reserved
```

---

## Asset Requirements
- ITSEC Logo (75px × 24px)
- Dynamic version string dari app config
- Font: DM Sans (body-regular, color #f8f9fa)

---

## Implementation Checklist
- [ ] Sticky positioning dengan bottom: 0
- [ ] Design token colors (tidak hardcode)
- [ ] Text dengan proper line-breaking (whitespace-pre-wrap)
- [ ] Logo responsive sizing untuk small screens
- [ ] Safe area padding untuk notched devices (safe-area-inset)
- [ ] Version dari app config/env (dynamic)
- [ ] Copyright year dynamic (© YYYY-present)
- [ ] Fallback styling jika logo tidak load
- [ ] ARIA label untuk logo link (if clickable)
- [ ] Testing: scroll depth, orientation change, various screen sizes, print view
- [ ] Performance: efficient layout reflow saat text update

---

## Accessibility
- Logo link must have descriptive `aria-label` if clickable
- Text must have sufficient color contrast: 4.5:1 ratio (WCAG AA standard)
- Footer structure properly semantically marked (use `<footer>` HTML element)
- Sticky positioning tidak mengganggu keyboard navigation

---

## Mobile-Specific Considerations
- Safe area insets untuk bottom notches (iPhone models dengan Dynamic Island)
- Touch-friendly hit areas untuk logo jika clickable (min 44x44px)
- Text readable pada small screens (14px minimum)
- Layout natural pada landscape orientation

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
