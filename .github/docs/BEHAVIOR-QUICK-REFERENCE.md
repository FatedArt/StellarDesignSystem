# Behavior Section - Quick Reference Guide

**Purpose**: Panduan cepat untuk menulis Behavior section pada dokumentasi component  
**Last Updated**: February 26, 2026

---

## Quick Start Checklist

Sebelum menulis Behavior section, confirm:

- [ ] Identifikasi semua state yang ada pada component
- [ ] Tentukan trigger untuk setiap state (user action, condition, etc)
- [ ] Dokumentasikan visual feedback untuk setiap state
- [ ] Tulis minimal 3-5 DO guidelines per state (spesifik, actionable)
- [ ] Tulis minimal 3-5 DON'T guidelines per state (dengan consequences)
- [ ] Include CSS/code snippets untuk complex behaviors
- [ ] Test keyboard navigation pada semua interactive states
- [ ] Validate accessibility attributes (aria-*, role)
- [ ] Review design token usage (no hardcoded values)

---

## Behavior Section Structure Template

```markdown
## 3. Behavior

### State/Interaction Name
*Brief description ketika state ini terjadi dan kenapa penting*

[OPTIONAL: State transition diagram atau table]

#### ✅ **DO:**
- Specific best practice 1 dengan actionable detail
- Specific best practice 2 dengan rationale
- Specific best practice 3 dengan design system reference
- (3-5 items total)

#### ❌ **DON'T:**
- Anti-pattern 1 dengan consequence explanation
- Anti-pattern 2 dengan user impact
- Anti-pattern 3 dengan why avoided
- (3-5 items total)
```

---

## State Categories Reference

### Interactive Components Biasa Punya States:

```
BUTTONS:
├── Default/Idle
├── Hover
├── Active/Pressed
├── Focus (keyboard)
├── Disabled
└── Loading

INPUT FIELDS:
├── Empty/Default
├── Focused/Active
├── Filled
├── Hover
├── Error
├── Success
└── Disabled

DROPDOWNS/SELECTS:
├── Closed
├── Open
├── Hover (on option)
├── Selected (option)
├── Disabled (field/option)
├── Loading
└── Search/Filter (if applicable)

MODALS/DIALOGS:
├── Closed
├── Opening (animation)
├── Open/Active
├── Overlay interaction
├── Escape key pressed
├── Form validation (error)
└── Closing (animation)

NAVIGATION/MENU:
├── Default
├── Hover
├── Active (current page)
├── Focus (keyboard)
├── Submenu (collapsed)
├── Submenu (expanded)
└── Mobile responsive

FEEDBACK STATES:
├── Loading/Pending
├── Success
├── Error
├── Warning
└── Info
```

---

## DO Guidelines - Best Practices Template

### Format Structure:

```
✅ **DO:**
  1. Start dengan ACTION VERB (Use, Apply, Set, Show, Provide, Maintain)
  2. Include SPECIFIC VALUE/TOKEN (not generic "use color")
  3. Add RATIONALE/WHY (bisa short, tidak separate paragraph)
  4. Reference DESIGN SYSTEM (token names, dimensions, timing)
  5. Optional: CODE SNIPPET atau EXAMPLE
```

### Contoh DO Guidelines:

| ❌ Generic | ✅ Specific |
|-----------|-----------|
| "Use a good color for hover" | "Change background to --base-primary-5 (lighten hover state)" |
| "Make transitions smooth" | "Apply transition: all 200ms ease for state changes" |
| "Show a spinner loading" | "Show animated loading spinner (16px) with 1s rotation, disable button to prevent double-clicks" |
| "Keep button aligned" | "Maintain padding 12px horizontal, 16px vertical using padding: 12px 16px (no dynamic sizing)" |
| "Support keyboard" | "Support keyboard navigation: Tab to focus, Arrow Up/Down to navigate, Enter to select, Escape to close" |

---

## DON'T Guidelines - Anti-Patterns Template

### Format Structure:

```
❌ **DON'T:**
  1. Start dengan WHAT TO AVOID (Use, Change, Apply, etc. dengan negative)
  2. Explain CONSEQUENCE/IMPACT (what goes wrong)
  3. Why it's problematic untuk USER or SYSTEM
  4. Optional: What happens if developer does this
```

### Contoh DON'T Guidelines:

| ❌ Anti-pattern | ✅ Better Explanation |
|-----------------|----------------------|
| "Don't use hardcoded colors" | "Don't use hardcoded colors like #0F8696 - breaks theming support, makes dark mode implementation impossible" |
| "Don't make animations fast" | "Don't use animations < 100ms or > 500ms - fast feels jittery, slow feels sluggish (WCAG: 200-300ms optimal)" |
| "Don't forget focus state" | "Don't skip focus state styling - excludes keyboard-only users (WCAG 2.4.7 violation), accessibility issue" |
| "Don't use opacity alone" | "Don't use opacity-only for disabled state - fails for red-color-blind users (WCAG: don't rely on color alone)" |
| "Don't change size on hover" | "Don't change button width/height on hover - causes layout shift (jank), reflow expensive, poor performance" |

---

## Common DO Guidelines (Copy-Paste Friendly)

### For ALL Interactive Elements:
```
- Use CSS custom properties (--token-name) for all colors, never hardcoded hex values
- Apply smooth transitions (200-300ms) for state changes using transition: all 200ms ease
- Maintain consistent sizing (height, padding) across all states to prevent layout shifts
- Provide visual feedback for all interactive states (hover, active, focus, disabled)
- Support keyboard navigation (Tab, Enter, Arrow keys, Escape where relevant)
```

### For Hover States:
```
- Apply color change (lighten by 1 token level) for immediate visual feedback
- Add subtle scale transform (1.02x) for depth perception and elegance
- Use box-shadow for elevated effect: 0 2px 8px rgba(0,0,0,0.15)
- Maintain text properties (font-size, weight, line-height) - no text changes
- Only apply on devices supporting hover: @media (hover: hover)
```

### For Focus States:
```
- Use :focus-visible (not :focus) for keyboard-only focus indication
- Apply 2px outline ring around element with primary color token
- Add 2px outline-offset for visual separation
- Ensure 3:1 color contrast minimum (WCAG AA) for focus indicator
- Test with actual Tab key keyboard navigation on real device
```

### For Disabled States:
```
- Use combination of opacity 0.5 + distinct color token (not opacity alone)
- Set cursor: not-allowed for clarity that element not interactive
- Set pointer-events: none to prevent any interaction
- Provide context why disabled (tooltip, adjacent text, aria-label)
- Keep disabled elements visible for accessibility (don't hide from DOM)
```

### For Loading States:
```
- Show animated spinner (16px size) as visual indicator of processing
- Display meaningful text ("Saving...", "Loading...") for context
- Disable element during loading to prevent duplicate submissions
- Use aria-busy="true" + aria-label="..." for screen reader announcements
- Keep element dimensions consistent (no width/height change with spinner)
```

### For Error States:
```
- Show warning icon + error message below field for redundant indication
- Use color token --semantic-error-red-6 for consistency
- Include specific error reason ("Email must include @") not generic message
- Use aria-invalid="true" + aria-describedby="error-id" for a11y
- Keep error state until user corrects input and re-validates
```

### For Accessibility:
```
- Use semantic HTML (button, input, select, etc. not divs as buttons)
- Add aria-label when text not visually obvious
- Use aria-describedby for error messages or helper text
- Support keyboard navigation for all interactive elements
- Maintain minimum 4.5:1 color contrast ratio for text (WCAG AAA)
```

---

## Common DON'T Guidelines (Copy-Paste Friendly)

### For ALL Interactive Elements:
```
- Don't hardcode color values (breaks design system consistency and theming)
- Don't skip focus state styling (excludes keyboard-only users, WCAG violation)
- Don't use animations > 500ms (feels sluggish and frustrating)
- Don't change dimensions on state change (causes layout reflow and jank)
- Don't rely on color alone for indicating state (fails for color-blind users)
```

### For Hover States:
```
- Don't use opacity changes alone without color modification (too subtle)
- Don't apply dramatic transformations (1.1x+ scales looks broken)
- Don't use fast transitions (100-150ms) - feels jittery and unnatural
- Don't add large shadows (> 12px blur) - looks floating away unnaturally
- Don't forget cursor: pointer (user may not realize element clickable)
```

### For Focus States:
```
- Don't use :focus without :focus-visible (shows ring on mouse clicks too, ugly)
- Don't set thin outlines (1px too subtle, minimum 2px)
- Don't remove outline completely (WCAG violation)
- Don't use only color change (not enough contrast/visibility)
- Don't forget testing with actual Tab key and keyboard navigation
```

### For Disabled States:
```
- Don't use opacity < 0.5 (disappears on some backgrounds, unreadable)
- Don't forget cursor: not-allowed (misleading, suggest element clickable)
- Don't remove disabled elements from DOM (accessibility issue, not transparent)
- Don't apply hover effects to disabled state (conflicting signals)
- Don't remove entirely from UI (user won't know why feature unavailable)
```

### For Loading States:
```
- Don't use only opacity change (ambiguous if something happening)
- Don't forget disabling interaction (enables duplicate submissions, major bug)
- Don't use fast spinner animations (< 800ms feels dizzy and uncomfortable)
- Don't hide original text completely (user loses context and reassurance)
- Don't change button dimensions (triggers unsightly layout shift/jank)
```

### For Error States:
```
- Don't use color alone (red-color-blind users cannot distinguish)
- Don't show generic errors ("Invalid" not helpful, specific reason needed)
- Don't stack multiple error messages (confusing which takes priority)
- Don't apply error animation that distracts (keep simple border change)
- Don't use only error icon without text message (icon meanings unclear)
```

---

## Timing Values Reference

Use these standard timings across design system:

```
State Transitions:        200ms (default for state changes)
Hover Effects:            150ms (slightly faster for responsiveness)
Active States:            100ms (quick snap on interaction)
Component Entry:          250-300ms (animations, modals opening)
Component Exit:           200-250ms (animations, modals closing)
Spinner/Loading:          1000ms (1 full rotation per second)
Tooltip Delay:            200ms (wait before showing tooltip)
Debounce/Throttle:        300ms (typing, scrolling)
Keyboard Navigation:      Instant (Tab, arrows no delay)
```

---

## Design Token Color Mapping

```
State Mapping → Design Tokens

Default/Idle:     --base/dark/dark-5
Hover:            --base/primary/primary-5
Active/Pressed:   --base/primary/primary-6 or 7
Focus Ring:       --base/primary/primary-4
Disabled:         --base/dark/dark-4 + opacity 0.5
Error:            --semantic/error/red-6
Success:          --semantic/success/green-6
Warning:          --semantic/warning/orange-6
Info:             --semantic/info/blue-6
Loading:          --base/primary/primary-6 (with spinner animation)
```

---

## CSS/HTML Snippets Library

### Smooth Transitions
```css
.element {
  transition: all 200ms ease;
  /* or specific: */
  transition: background-color 200ms ease, transform 150ms ease;
}
```

### Focus Indicator
```css
button:focus-visible {
  outline: 2px solid var(--base-primary-4);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Disabled State
```css
button:disabled {
  background-color: var(--base-dark-5);
  color: var(--text-base-disabled);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Loading Spinner
```css
@keyframes spinner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--base-primary-3);
  border-top-color: var(--text-base-default);
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}
```

### Error State
```html
<div class="input-wrapper">
  <input aria-invalid="true" aria-describedby="error-msg" />
  <span class="error-icon" aria-hidden="true">⚠️</span>
  <span id="error-msg" class="error-text">Specific error message</span>
</div>
```

---

## Review Checklist - Before Publishing

Use untuk review dokumentasi Behavior sebelum final:

```
CONTENT COMPLETENESS:
☐ Semua state tercovered (default, hover, active, focus, disabled, error, success, loading)
☐ Setiap state signifikan punya subsection dengan DO/DON'T
☐ State transition diagram/table included untuk clarity
☐ Edge cases documented (disabled, loading, error scenarios)

DO GUIDELINES QUALITY:
☐ Minimum 3 items, maximum 5 items per subsection
☐ Semua DO specific dan actionable (bukan generic teori)
☐ Design tokens referenced (--token-name, not hex values)
☐ Timing values included (ms untuk transitions, animations)
☐ Code snippets atau examples provided untuk complex behaviors
☐ Accessibility considerations mentioned (aria-*, keyboard nav)

DON'T GUIDELINES QUALITY:
☐ Minimum 3 items, maximum 5 items per subsection
☐ Semua DON'T include reason/consequence (not just "don't do X")
☐ User impact atau system impact explained
☐ Common developer mistakes documented
☐ Counter-example atau "what to do instead" implied

ACCESSIBILITY:
☐ Keyboard navigation documented (Tab, Arrow, Enter, Escape)
☐ Focus state distinctive dan visible (minimum 2px)
☐ Color tidak hanya differentiator (icon + color used)
☐ aria-* attributes recommended (aria-label, aria-invalid, etc)
☐ Screen reader considerations included

DESIGN SYSTEM ALIGNMENT:
☐ All colors use design tokens (no #hex values)
☐ Spacing values aligned with design system (8px grid)
☐ Typography matches system styles
☐ Timing values standard (150-300ms range)
☐ Component reusability clear

FORMATTING:
☐ Tables use consistent structure (State | Trigger | Behavior | Feedback)
☐ Code blocks properly formatted dengan language identifier (css, jsx, html)
☐ Headers hierarchy correct (### for subsection, #### untuk DO/DON'T)
☐ Lists using bullet points (-, tidak *)
☐ Line spacing consistent (blank line sebelum/sesudah sections)
☐ Bold untuk emphasis (**text**, tidak *text*)

TESTING & VALIDATION:
☐ Behavior tested pada actual component
☐ Keyboard navigation tested manually (Tab key)
☐ States verified pada both light + dark theme
☐ Screen reader tested dengan NVDA/JAWS/VoiceOver
☐ Mobile/touch interaction tested (hover states on mobile)
☐ Animation smoothness checked pada low-end devices
```

---

## Tips & Tricks

1. **Differentiate Hover vs Active**: 
   - Hover: Lighter color + scale up 1.02x (lift effect)
   - Active: Darker color + scale 0.98x (pressed effect)

2. **Timing Hierarchy**:
   - User sees change within 200ms (cognitive response time)
   - Animations max 300ms (perceptually instantaneous)
   - Spinners 1s (standard perceived duration)

3. **Accessibility First**:
   - If skip accessibility → code review blocker
   - Focus state required → non-negotiable (WCAG)
   - Keyboard nav support → accessibility requirement

4. **Design Token Usage**:
   - Never override token dengan inline style
   - Always use CSS custom properties: `var(--token-name)`
   - Document fallback value jika token tidak available

5. **State Naming Consistency**:
   - Use consistent names across all components
   - Default, Hover, Active, Focus, Disabled, Error, Loading, Success
   - Document component-specific states (e.g., "Expanded" untuk Collapse)

---

## Related Documentation

- **Design System Tokens**: `/docs/TOKENS-REFERENCE.md` (colors, spacing, typography)
- **Accessibility Guidelines**: `/docs/ACCESSIBILITY.md` (WCAG standards, testing)
- **CSS Architecture**: `/docs/CSS-STANDARDS.md` (class naming, structure)
- **Component Template**: `/docs/COMPONENT-TEMPLATE.md` (full documentation structure)

