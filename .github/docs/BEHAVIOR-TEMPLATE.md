# Dokumentasi Behavior Section - Template Guide

**Last Updated**: February 26, 2026  
**Version**: 1.0

---

## Overview

Struktur dokumentasi untuk section **Behavior** dirancang untuk mendeskripsikan semua interaksi dan state perubahan komponen dengan detail yang actionable bagi developer. Setiap diagram state dan subsection HARUS dilengkapi dengan **DO** dan **DON'T** guidelines yang spesifik dan practical.

---

## Struktur Section Behavior

### 1. **State Overview Table** (Mandatory)

Ringkasan semua state yang ada pada komponen beserta trigger dan visual feedback.

```markdown
| State | Trigger | Behavior | Visual Feedback |
|-------|---------|----------|-----------------|
| Default | Page load | Initial render state | Standard appearance |
| Hover | Mouse over | Interactive element ready | Background/color change, cursor pointer |
| Active/Focus | Click/Tab | Element selected or focused | Border highlight, color change |
| Disabled | Condition met | Element cannot be interacted | Opacity reduced, cursor not-allowed |
| Loading | Async action | Waiting for data/response | Spinner/skeleton, disabled state |
| Error | Invalid input/action | User feedback untuk error | Red border, error message, warning icon |
| Success | Action completed | Confirmation feedback | Green checkmark, success message |
```

---

### 2. **Subsection Per State/Interaction** (Mandatory untuk state kompleks)

Untuk setiap state signifikan, buat subsection terpisah dengan detail lengkap.

**Format Subsection:**

```markdown
## 3. Behavior

### [State/Interaction Name] 
*Description of when and why this state occurs*

[Optional: Add interaction flow diagram atau table]

#### ✅ **DO:**
- Specific practice 1 dengan detail CSS/code jika relevan
- Specific practice 2 dengan contoh real impact
- Specific practice 3 dengan constraint/requirement
- (Minimum 3 items, maximum 5 items)

#### ❌ **DON'T:**
- Anti-pattern 1 dengan explanation kenapa dihindari
- Anti-pattern 2 dengan potential negative consequence
- Anti-pattern 3 dengan impact ke user experience
- (Minimum 3 items, maximum 5 items)
```

---

### 3. **Best Practices per Subsection**

#### DO Guidelines Harus:
- ✓ Spesifik dan actionable (bukan teori generic)
- ✓ Include practical examples atau CSS snippets
- ✓ Reference design tokens atau CSS variables
- ✓ Menunjukkan correct implementation approach
- ✓ Mendokumentasikan edge cases

#### DON'T Guidelines Harus:
- ✓ Menjelaskan anti-pattern dengan jelas
- ✓ Include potential consequences atau user impact
- ✓ Memberikan alasan kenapa dihindari
- ✓ Reference common mistakes developer make
- ✓ Show incorrect implementation atau outcome

---

## Rekomendasi Subsection untuk Berbagai Component Types

### A. **Button Component** Behavior Subsections
```
1. Default State - Visual appearance pada initial render
2. Hover State - Interactive feedback saat mouse over
3. Active/Pressed State - State saat button di-click
4. Focus State - State saat button menerima keyboard focus
5. Disabled State - State saat button tidak dapat di-interact
6. Loading State - State saat async operation berlangsung
```

### B. **Input Field Component** Behavior Subsections
```
1. Empty/Default State - Field kosong, tidak focused
2. Filled State - Data sudah diinput user
3. Focus State - Field active, ready untuk input
4. Hover State - Mouse over field
5. Error State - Invalid input atau validation failed
6. Disabled State - Field locked, tidak editable
7. Success State - Input valid, atau action berhasil
```

### C. **Dropdown/Select Component** Behavior Subsections
```
1. Closed State - Dropdown not expanded
2. Open State - Dropdown menu visible
3. Hover State - Mouse over option
4. Selected State - Option dipilih
5. Disabled State - Dropdown atau option disabled
6. Search/Filter State - User mencari dalam dropdown options
```

### D. **Modal/Dialog Component** Behavior Subsections
```
1. Closed State - Modal tidak visible
2. Opening Animation - Modal sedang tampil dengan animation
3. Open State - Modal fully visible dan interactive
4. Overlay Interaction - User klik di background overlay
5. Escape Key - User press ESC untuk close
6. Form Validation - Error handling dalam modal form
7. Closing Animation - Modal sedang dismiss dengan animation
```

### E. **Navigation/Menu Component** Behavior Subsections
```
1. Default State - Menu tidak active
2. Hover State - Mouse over menu item
3. Active State - Current page/section highlighted
4. Submenu - Nested menu appearing/disappearing
5. Mobile Behavior - Menu collapse pada mobile viewport
6. Keyboard Navigation - Tab/Arrow key behavior
```

---

## Template Lengkap Behavior Section

### **Untuk Component Sederhana (Contoh: Button Primary)**

```markdown
## 3. Behavior

### Default State
Appearance awal button sebelum interaksi. State ini adalah baseline untuk semua state lainnya.

| Property | Value |
|----------|-------|
| Background | --base/primary/primary-6 |
| Text Color | --text/base-inverse |
| Border | None |
| Cursor | pointer |
| Opacity | 1.0 |

#### ✅ **DO:**
- Maintain consistent padding (16px horizontal, 12px vertical) across all button instances
- Use semantic color tokens (--base/primary/primary-6) instead of hardcoded hex values
- Apply smooth transitions (200ms) when state changes
- Ensure button width adapts to content with min-width constraint (64px)

#### ❌ **DON'T:**
- Hardcode color values like #0F8696 instead of CSS variables
- Use opacity changes alone for disabled state (use distinct color token instead)
- Apply box-shadow that extends beyond container bounds by default
- Set arbitrary button sizes outside token-defined dimensions


### Hover State
When user mouse over button, provide visual feedback untuk encourage interaction.

#### ✅ **DO:**
- Change background to --base/primary/primary-5 (lighter shade)
- Add subtle scale transform (1.02x) untuk depth impression
- Apply transition duration 200ms untuk smooth effect
- Maintain all text styling dan padding (no layout shift)
- Show pointer cursor untuk clarity

#### ❌ **DON'T:**
- Dramatically change color that breaks visual hierarchy
- Increase button size without maintaining flex layout alignment
- Use animations > 300ms yang bisa terasa sluggish
- Remove border-radius atau apply unintended border changes
- Change font weight atau size during hover


### Active/Pressed State
State saat user sedang click button atau sedang di-focus via keyboard.

#### ✅ **DO:**
- Apply --base/primary/primary-7 (darkest shade) untuk strong visual feedback
- Add subtle inset box-shadow untuk "pressed" effect: `inset 0 2px 4px rgba(0,0,0,0.2)`
- Scale button sedikit lebih kecil (0.98x) untuk tactile feedback
- Maintain visual state selama user still pressing (mousedown locked state)

#### ❌ **DON'T:**
- Remove hover state styling completely (should show layered feedback)
- Use too aggressive shadow yang membuat button terlihat floating away
- Skip transition, buat state change jadi jarring/instant
- Apply active state styling ke elements yang tidak interactive


### Disabled State
Button locked dan tidak dapat di-interact. Clear visual indicator diperlukan.

#### ✅ **DO:**
- Set opacity 0.5 combined dengan --base/dark/dark-5 background color
- Set cursor: not-allowed untuk clarity
- Remove pointer-events: none dari CSS (atau user cannot focus)
- Show tooltip saat hover: "This action is unavailable because [reason]"
- Maintain all other styling consistency (padding, border-radius, height)

#### ❌ **DON'T:**
- Remove button from DOM (keep in document, just disabled state untuk a11y)
- Use only opacity change tanpa color modification (not distinct enough)
- Forget to set cursor: not-allowed (confusing UX)
- Hide disabled buttons atau move them around (maintains layout stability)
- Make disabled button look clickable dengan hover effects


### Loading State
Async action sedang berlangsung. User perlu visual feedback bahwa proses running.

| Property | Behavior |
|----------|----------|
| Content | Replace text dengan spinner icon (16px) |
| Background | --base/primary/primary-6 (maintain color) |
| Cursor | wait atau progress cursor |
| Interactivity | Disabled (prevent double-click) |
| Animation | Spinner rotate 360° in 1s infinite linear |

#### ✅ **DO:**
- Show animated spinner (SVG atau icon animation) sebagai visual indicator
- Keep button focal area sama (width/height consistent)
- Disable click events untuk prevent duplicate submissions
- Add aria-busy="true" dan aria-label="Loading..." untuk accessibility
- Provide loading text alternative: "Processing..." atau "Saving..."

#### ❌ **DON'T:**
- Use only opacity change without spinner (ambiguous state)
- Change button width/height (causes layout shift)
- Forget disabling button during loading (allows duplicate clicks)
- Use fast spinner animation (dizzying, use 1s rotation)
- Keep original button text visible (confusing with spinner)


### Success State
Action berhasil completed. Provide positive feedback kepada user.

#### ✅ **DO:**
- Replace button content dengan checkmark icon (16px) + "Done" atau "Saved"
- Change background ke --semantic/success/green-6 temporary
- Keep state untuk 2-3 seconds sebelum return ke default
- Use smooth transition: background-color 300ms ease
- Play subtle success animation: scale pulse atau fade-in checkmark

#### ❌ **DON'T:**
- Keep success state permanently (should auto-reset)
- Use red color atau other semantic meanings (success = green)
- Play loud success sound tanpa user request
- Change button size atau position saat success animation
- Prevent user dari interacting with UI during success feedback
```

---

### **Untuk Component Kompleks (Contoh: Dropdown/Select)**

```markdown
## 3. Behavior

### Closed State
Dropdown dalam state default, menu options tersembunyi. User melihat selected value atau placeholder.

#### ✅ **DO:**
- Display current selected option atau placeholder text
- Show chevron-down icon right-aligned (rotate untuk open state)
- Maintain full control width (min-width: 200px untuk usability)
- Apply hover state styling untuk indicate interactivity
- Support click pada trigger area mana saja (full clickable zone)

#### ❌ **DON'T:**
- Make hanya icon yang clickable (frustrating UX, use full width)
- Show blur/skeleton saat options loading (should show immediately atau spinner)
- Remove visual feedback on hover (user tidak sure if interactive)


### Open State
Dropdown menu visible, options displayed untuk selection. Proper z-index dan positioning diperlukan.

| Property | Behavior |
|----------|----------|
| z-index | 1000+ (above all page content) |
| Position | Absolute, below trigger atau above jika space limited |
| Max-height | 300px dengan scroll if > 5 options |
| Animation | Expand down with fade-in (200ms) |
| Backdrop | Optional backdrop blur pada desktop (2.5px) |

#### ✅ **DO:**
- Position dropdown below trigger by default (check viewport space)
- Reposition above trigger jika tidak enough room below
- Apply max-height dengan overflow-y: auto untuk many options
- Close dropdown saat selecting option
- Support keyboard navigation: Arrow Up/Down, Enter, Escape
- Highlight first option on open (visual cue untuk navigation)

#### ❌ **DON'T:**
- Position dropdown fixed dengan hardcoded top/left (breaks responsiveness)
- Allow dropdown extend beyond viewport without scroll
- Keep dropdown open after selection (confusing state)
- Ignore keyboard navigation support (accessibility issue)
- Use dropdown dengan width < trigger width (looks broken)


### Hover State (on Option)
Mouse over specific dropdown option. Clear visual indication diperlukan.

#### ✅ **DO:**
- Change background color ke --base/primary/primary-2 untuk active indication
- Use smooth transition 150ms untuk color change
- Maintain text color contrast untuk readability
- Show as clickable dengan cursor: pointer
- Update aria-label untuk screen readers

#### ❌ **DON'T:**
- Change text color dramatically (hard to read)
- Use animations > 200ms untuk hover (feels sluggish)
- Remove hover state styling (ambiguous if interactive)
- Apply hover style pada disabled options (conflicting signals)


### Selected State
Option sudah dipilih, ditampilkan sebagai active/highlighted state.

#### ✅ **DO:**
- Use checkmark icon atau distinct background color
- Maintain selection styling konsisten dengan current selection
- Show selected option dalam trigger area setelah close
- Support multi-select dengan multiple checkmarks jika applicable
- Update aria-selected="true" untuk a11y

#### ❌ **DON'T:**
- Remove selection indicator setelah close (user confused about current selection)
- Use same style untuk hover dan selected states (not distinguishable)
- Allow unselecting required field tanpa fallback


### Disabled State
Dropdown atau individual options disabled, tidak interactive.

#### ✅ **DO:**
- Set cursor: not-allowed pada disabled options
- Reduce opacity 0.5 untuk visual indication
- Show tooltip on hover: reason kenapa disabled
- Keep disabled options visible dalam list (accessibility)
- Prevent selection melalui keyboard atau mouse

#### ❌ **DON'T:**
- Hide disabled options completely (reduces transparency)
- Make disabled options look clickable (confusing)
- Allow keyboard focus pada disabled options
- Remove from tab order tanpa proper aria-disabled
```

---

## Panduan Penulisan DO & DON'T

### Tingkat Spesifikasi:

| Level | Contoh | Gunakan Untuk |
|-------|--------|---------------|
| **Generic** | "Don't make button too wide" | Hindari jenis ini |
| **Specific** | "Maintain max-width: 400px untuk button, align dengan input field width" | Preferred - actionable |
| **Technical** | "Use `background-color: var(--base-primary-6); transition: background-color 200ms ease;` on button element" | Ideal untuk complex CSS |

### Format & Struktur:

1. **Mulai dengan action verb**: "Use", "Apply", "Set", "Show", "Maintain", "Provide"
2. **Include rationale**: Jelaskan WHY di dalam bullet (bukan separate line)
3. **Add specifics**: Values, tokens, measurements, timing
4. **Reference design system**: Selalu gunakan token names, bukan hex values

---

## File Structure di Workspace

```
.github/docs/
├── [Component Group]/
│   ├── [Component]-Desktop.md
│   ├── [Component]-Mobile.md
│   └── [Sub-Component].md
│
├── BEHAVIOR-TEMPLATE.md  <-- Template ini
└── BEHAVIOR-EXAMPLES.md  <-- Real implementation examples
```

---

## Checklist Sebelum Publish Behavior Section

- [ ] Semua state tercovered dalam state overview table
- [ ] Setiap state signifikan punya subsection terpisah
- [ ] Minimum 3 items dalam DO guidelines
- [ ] Minimum 3 items dalam DON'T guidelines  
- [ ] DO guidelines specific dan actionable (bukan generic theory)
- [ ] DON'T guidelines include consequences atau user impact
- [ ] Design tokens digunakan, bukan hardcoded hex values
- [ ] Timing values documented (transitions, animations in ms)
- [ ] Accessibility considerations included (aria-*, keyboard nav)
- [ ] Edge cases documented (disabled, loading, error states)
- [ ] Examples atau code snippets included untuk complex behaviors
- [ ] Format consistent dengan guidelines (tables, bullet points, spacing)

---

## Notes

- Struktur ini fleksibel, disesuaikan dengan kompleksitas component
- Prioritaskan clarity untuk developer implementation
- Selalu reference existing design tokens untuk consistency
- Include interaction flows untuk complex multi-state behavior
