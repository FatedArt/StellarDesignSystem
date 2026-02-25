# Mobile Header (1144:9558)

**Design System**: Stellar Design System v1.0  
**Component ID**: 1144:9558  
**Platform**: Mobile (<768px)

---

## 1. Usage Guidelines

### Mandatory Implementation Rules
- Gunakan untuk viewport width ≤ 767px (mobile profile)
- Struktur dua-bagian: Mobile-Header (navigation) + Action Bar (search/filter)
- HARUS `position: sticky; top: 0` dengan z-index 100
- Logo scaled down, navigation icon collapsible
- Screen real estate optimization priority
- Selalu gunakan design tokens untuk styling

### Spacing & Measurements
| Property | Value |
|----------|-------|
| **Total Height** | 107px (header 67px + action bar 52px) |
| **Width** | 320px |
| **Header Height** | 67px |
| **Action Bar Height** | 52px |
| **Padding (Header)** | 12px (md token) |
| **Padding (Action Bar)** | 12px (md token) |
| **Gap Items** | 8-32px (varied) |

### Component Sections

#### **Mobile-Header (1144:5452)**
| Element | Size | Notes |
|---------|------|-------|
| **Logo** | 149.643px × 31px | Scaled proportionally |
| **Menu Icon** | Size varies | Hamburger menu icon |
| **Total Width Internal** | 296px | Flex container |

#### **Action Bar (1144:9488)**
| Element | Size | Notes |
|---------|------|-------|
| **Search Field** | 296px width | Input dengan placeholder icon |
| **Filter Button** | 16px icon | Icon button |
| **Additional Button** | 16px icon | Action button |

### Typography Standards
| Element | Style |
|---------|-------|
| **Search Placeholder** | crv/body-regular/xsmall (12px, weight 400) |

### Color Palette
| Element | Token | Fallback |
|---------|-------|----------|
| **Background** | `--base/dark/dark-7` | #1a1b1e |
| **Border Bottom** | `--border/base-default` | #495057 |
| **Text Placeholder** | `--text/base-strong` | #adb5bd |

---

## 2. When to Use & When NOT to Use

### ✅ **USE WHEN:**
- Viewport width ≤ 767px (mobile/small tablet)
- Screen real estate terbatas, kompak UI diperlukan
- Tetap perlu search functionality dan navigation
- Action bar dengan filter/search buttons adalah prioritas
- Logo harus scaled down atau abbreviated
- User bekerja dengan alerts/threat intelligence di mobile

### ❌ **DO NOT USE WHEN:**
- Viewport ≥ 1024px (gunakan Desktop Header)
- Building modal dialog atau overlay
- Halaman login/auth (use custom mobile header)
- Component isolated testing tanpa context
- Public landing pages

### ⚠️ **DO NOT MIX:**
- Mobile header + Desktop footer (always matched pair)
- Mobile header dari different design system versions
- Mixing responsive conditionals within single component

---

## 3. Behavior

### Mobile Header Section Behavior

#### **Logo & Navigation Area**
| Interaction | Behavior | Visual Feedback |
|---|---|---|
| **Logo Click** | Navigate ke dashboard home | No visual change |
| **Menu Icon Click** | Open/close hamburger navigation drawer | Icon animate (hamburger ↔ X), drawer slide from left |
| **Menu Icon Hover** | Pointer change | Subtle background highlight |

##### ✅ **DO:**
- Animate hamburger icon smoothly (rotate 90° to X shape)
- Provide haptic feedback saat menu toggle (mobile devices)
- Keep animation duration 200-300ms
- Show menu drawer dengan slide animation dari left
- Maintain menu state consistency throughout session

##### ❌ **DON'T:**
- Auto-close menu saat user scroll (inconvenient)
- Use instant icon changes tanpa animation
- Overlap menu dengan content tanpa proper z-index
- Change header height saat menu opens
- Prevent menu closure dengan trap focus

---

#### **Search Placeholder Text**
- Display: "Search alert name"
- On focus: placeholder fade out, cursor visible
- On input: show matching results atau suggestions
- On empty: placeholder reappear

##### ✅ **DO:**
- Show placeholder text when field empty
- Fade placeholder smoothly saat focus
- Display search suggestions/results dalam dropdown
- Allow clear action (X button dalam field)
- Debounce search input (200-300ms) untuk performance

##### ❌ **DON'T:**
- Remove placeholder text tanpa fade effect
- Trigger search on every keystroke (use debouncing)
- Show suggestions dropdown yang too wide
- Keep focus trap pada search field (user should escape)
- Auto-submit search saat typing

---

### Action Bar Behavior

#### **Search Field States**
| State | Behavior | Visual Feedback |
|---|---|---|
| **Focused** | Input active, mobile keyboard appear | Border highlight, backdrop-blur intensify |
| **Typing** | Real-time filtering atau API suggest | Results show below atau loading indicator |
| **Empty** | Placeholder visible | Onyx-7 text color |

##### ✅ **DO:**
- Show keyboard natively pada mobile
- Provide visual focus indicator (border/glow)
- Display loading spinner saat searching
- Show result count atau "No results" state
- Allow keyboard dismissal (native iOS/Android behavior)

##### ❌ **DON'T:**
- Force custom keyboard (use native input)
- Remove focus indicator (accessibility issue)
- Show results dropdown indefinitely
- Persist results saat input cleared
- Disable field saat API pending

---

#### **Action Buttons**
| Button | Interaction | Behavior | Visual Feedback |
|---|---|---|---|
| **Filter Button** | Click | Open filter panel/modal | Panel overlay appear |
| **Filter Button** | Hover | Pointer change | Button press state |
| **Additional Button** | Click | Context-specific action | State change based on action |

##### ✅ **DO:**
- Use proper touch target size (min 44x44px)
- Show pressed/active state immediately
- Provide haptic feedback saat tap
- Show loading state jika action async
- Disable button saat pending

##### ❌ **DON'T:**
- Use tiny buttons < 40px (hard to tap)
- Delay button feedback > 200ms
- Show keyboard saat clicking non-input buttons
- Disable button entirely (show loading only)
- Mix button styles dalam action bar

---

### Scroll Behavior
- Header tetap sticky di top saat page scroll
- Action bar dapat tetap visible dalam stack
- No hide animation pada scroll
- Content scrolls behind header

##### ✅ **DO:**
- Maintain sticky positioning konsisten
- Keep action bar visible (useful untuk searching while scrolling)
- Layer header pada top dengan sufficient z-index
- Smooth scroll behavior (momentum scrolling)
- Adjust header untuk landscape orientation

##### ❌ **DON'T:**
- Hide header saat scroll (breaks sticky requirement)
- Collapse action bar saat scroll (reduce usability)
- Use transform yang affects z-index
- Disable scroll events entirely
- Overlap visible content dengan header

---

### Loading & Error States
| State | Behavior |
|---|---|
| **Search Loading** | Optional spinner di search field right side, input tetap enabled |
| **Network Error** | Search field disabled, label show error tooltip |
| **Menu Loading** | Navigation drawer show loading state |

##### ✅ **DO:**
- Show spinner dalam search field (right side)
- Keep input enabled saat loading (user can revise)
- Provide error feedback dalam tooltip
- Show network state indicator
- Allow action cancellation

##### ❌ **DON'T:**
- Disable entire header saat loading
- Show modal loading dialog (intrusive)
- Block search input saat pending
- Hide error messages (user needs feedback)
- Timeout search > 5 seconds tanpa cancel option

---

### Responsive Breakpoint Transitions
| Size | Action |
|---|---|
| **< 768px** | Use Mobile Header variant |
| **768px - 1023px** | TRANSITION/overlap zone (consider mobile still) |
| **≥ 1024px** | Switch to Desktop Header |

##### ✅ **DO:**
- Smooth transition antara desktop/mobile layouts
- Test extensively di breakpoint transition zones
- Maintain functionality di all breakpoints
- Preserve user scroll position saat resize
- Progressive enhancement untuk feature detection

##### ❌ **DON'T:**
- Abrupt layout jumps saat resize
- Hide functionality di certain breakpoints
- Use media queries without fallbacks
- Reset scroll position saat breakpoint change
- Assume specific device sizes

---

### Edge Cases
| Case | Expected Behavior |
|---|---|
| **Very Long Search Query** | Text scroll horizontally dalam field |
| **Menu Open + Scroll** | Menu tetap open atau close automatically (design pattern decision) |
| **Offline Network** | Header visible, search disabled, filter buttons disabled |
| **Screen Rotation** | Layout recalculate, height adjust (landscape mode) |
| **Notch/Safe Area** | Padding adjust untuk phone notches (CSS safe-area-inset) |

##### ✅ **DO:**
- Allow horizontal scroll dalam search field jika text long
- Decide menu persist/close behavior explicitly (platform convention)
- Show offline indicator/state
- Handle device rotation gracefully
- Use safe-area-inset CSS untuk notched devices
- Test pada various real devices/browsers

##### ❌ **DON'T:**
- Truncate search text dengan ellipsis (user can't see query)
- Leave menu open indefinitely during scroll (confusing)
- Remove all functionality offline (keep navigation)
- Break layout saat device rotation
- Ignore safe area on notched iPhones
- Assume simulator behavior = real device behavior

---

## Asset Requirements
- Logo IntelliBroN (scaled/mobile version)
- Icons: Menu/Hamburger (20px), Filter (16px), Settings/Action (16px), Search (12px)
- Navigation menu items (delivered separately)

---

## Implementation Checklist
- [ ] Sticky positioning dengan z-index 100
- [ ] Logo responsive scaling
- [ ] Hamburger menu animation (smooth transition)
- [ ] Search field backdrop-blur 2.5px
- [ ] Action buttons proper touch targets (min 44x44px)
- [ ] Safe area padding untuk notched devices
- [ ] Loading states untuk async operations
- [ ] ARIA labels untuk navigation, search, filters
- [ ] Testing: scroll depth, menu toggle, search input, responsive transition
- [ ] Performance: lazy-load menu items, debounce search input

---

## Accessibility
- Menu button must have `aria-expanded` state
- Search input must have `aria-label` atau associated label
- Icon buttons must have `aria-label`
- Focus management dalam menu drawer
- Keyboard navigation: Tab, Enter, Escape untuk close menu

---

**Last Updated**: February 2026  
**Status**: Production Ready  
**Accessibility**: WCAG 2.1 Level AA (separate a11y documentation)
