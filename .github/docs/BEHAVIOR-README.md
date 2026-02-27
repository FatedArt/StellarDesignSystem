# Dokumentasi Behavior Section - Design System Guide

**Last Updated**: February 26, 2026  
**Version**: 1.0  
**Status**: Production

---

## 📋 Overview

Dokumentasi lengkap untuk menulis **Behavior section** pada component documentation sesuai standar Design System. Struktur ini mengikuti best practices dari Atlassian Design, material Design, dan accessibility standards (WCAG).

**Folder Contents**:
- `BEHAVIOR-TEMPLATE.md` - Template struktur lengkap dengan guidance
- `BEHAVIOR-EXAMPLES.md` - Real implementation examples (Button, Input, Dropdown)
- `BEHAVIOR-QUICK-REFERENCE.md` - Quick guide, snippets, checklist
- `README.md` - File ini

---

## 🎯 Quick Start

### 1. **Untuk Pemula**: Baca `BEHAVIOR-QUICK-REFERENCE.md`
   - Rapid reference untuk DO/DON'T guidelines
   - Copy-paste friendly snippets
   - Review checklist sebelum publish

### 2. **Untuk Detail**: Baca `BEHAVIOR-TEMPLATE.md`
   - Struktur komprehensif section Behavior
   - Best practices penulisan DO/DON'T
   - Component-type specific recommendations
   - File structure & organization

### 3. **Untuk Implementasi**: Referensi `BEHAVIOR-EXAMPLES.md`
   - Real code examples untuk Button, Input, Dropdown
   - CSS/HTML snippets siap pakai
   - Accessibility implementation
   - Testing checklist

---

## 📐 Struktur Behavior Section

Setiap Behavior section HARUS mengikuti struktur ini:

```markdown
## 3. Behavior

### [State/Interaction Name]
*Brief description ketika state terjadi*

[Optional: Table atau diagram showing state transitions]

#### ✅ **DO:**
- Specific best practice 1
- Specific best practice 2
- Specific best practice 3
- (3-5 items)

#### ❌ **DON'T:**
- Anti-pattern 1 dengan consequence
- Anti-pattern 2 dengan rationale
- Anti-pattern 3 dengan impact
- (3-5 items)

### [Next State/Interaction...]
```

---

## 🎯 Standard States Reference

### Common States Untuk Most Components:

| Component Type | States |
|---|---|
| **Button** | Default, Hover, Active, Focus, Disabled, Loading |
| **Input Field** | Empty, Focused, Filled, Hover, Error, Success, Disabled |
| **Dropdown** | Closed, Open, Hover, Selected, Disabled, Loading |
| **Modal** | Closed, Opening, Open, Overlay Click, Escape, Closing |
| **Menu** | Default, Hover, Active, Focus, Mobile (Collapsed/Expanded) |

---

## ✅ DO Guidelines - Best Practices

Setiap DO harus:
- **Spesifik** (bukan generic teori)
- **Actionable** (developer bisa implement langsung)
- **Reference tokens/system** (design system values)
- **Include timing/values** (CSS timing, measurements)
- **Contextual** (kenapa penting, impact-aware)

### Template:

```
✅ **DO:**
- Use [token/value] untuk [property] because [reason/benefit]
- Apply [CSS/approach] untuk achieve [visual/interaction goal]
- Maintain [consistency rule] across [scope] to prevent [problem]
- Provide [visible feedback] saat [user action] untuk [user goal]
```

### Contoh:

```
✅ **DO:**
- Use --base-primary-5 untuk hover background (lighter by 1 token level)
- Apply transition: all 200ms ease untuk smooth state change
- Maintain 12px padding vertical across all button variants
- Show tooltip on hover saat interactive element unclear
```

---

## ❌ DON'T Guidelines - Anti-Patterns

Setiap DON'T harus:
- **Explain consequence** (apa yang terjadi jika developer lakukan)
- **Include user/system impact** (broken UX, accessibility issue, performance)
- **Provide reasoning** (kenapa pattern problematic)
- **Be actionable** (clear what to avoid)

### Template:

```
❌ **DON'T:**
- Don't use [what to avoid] because it [negative consequence] leading to [user/system impact]
- Don't [action] without [required complementary action] - this causes [problem]
- Don't apply [pattern] untuk [reason] - instead use [better approach]
```

### Contoh:

```
❌ **DON'T:**
- Don't hardcode color #0F8696 - breaks theming support, prevents dark mode
- Don't use opacity-only for disabled state - fails for red-color-blind users
- Don't change button height on hover - causes layout shift, poor performance
- Don't skip focus state - excludes keyboard-only users (WCAG violation)
```

---

## 🎨 Design Token Mapping

Standard color progression untuk state changes:

```
State Flow Pattern:
Default     → Hover      → Active
dark-5     → primary-5  → primary-6/7

Additional States:
Focus:      primary-4 (ring 2px)
Disabled:   dark-4 (opacity 0.5)
Error:      semantic-error-red-6
Success:    semantic-success-green-6
Loading:    primary-6 (with animation)
```

---

## ⏱️ Timing Standards

Use consistent timing across design system:

```
State Transitions:    200ms (default)
Hover Effects:        150ms (responsive feel)
Active States:        100ms (snappy feedback)
Component Enter:      250-300ms (animations)
Component Exit:       200-250ms (animations)
Spinner:              1s rotation (standard)
Focus Ring:           No transition (instant)
```

---

## ♿ Accessibility Requirements

Setiap behavior MUST include:

- [ ] **Keyboard Navigation**: Tab, Arrow, Enter, Escape support
- [ ] **Focus Indicator**: 2px minimum, WCAG AA contrast (3:1)
- [ ] **Color + Icon**: Don't rely on color alone
- [ ] **aria-* attributes**: aria-label, aria-invalid, aria-describedby
- [ ] **Screen Reader**: Tested dengan NVDA/JAWS/VoiceOver
- [ ] **Mobile/Touch**: Consider touch interactions (no hover states)

---

## 📝 Implementation Steps

### Step 1: Review Component
- Identify all states (default, hover, active, focused, disabled, error, success, loading)
- Test actual component behavior
- Document trigger untuk setiap state

### Step 2: Create State Overview Table
```markdown
| State | Trigger | Behavior | Visual Feedback |
|---|---|---|---|
| Default | Page load | Initial state | Standard appearance |
| ... | ... | ... | ... |
```

### Step 3: Write Subsections Per State
- For complex states yang signifikan
- Include DO/DON'T guidelines
- Add CSS snippets shared semua need

### Step 4: Review Checklist
- [ ] All states documented
- [ ] DO/DON'T specific dan actionable
- [ ] Accessibility included
- [ ] Design tokens used
- [ ] Code snippets provided
- [ ] Timing values documented

### Step 5: Test & Validate
- [ ] Keyboard navigation tested
- [ ] Focus states visible
- [ ] Screen reader tested
- [ ] Mobile/touch interactions confirmed

---

## 📚 Reference Files in This Directory

### Component Documentation Examples

**Header & Footer Folder**:
- `Header-Desktop.md` - Reference untuk desktop navigation
- `Footer-Desktop.md` - Reference untuk footer behavior
- `Header-Mobile.md` - Mobile-specific behaviors

**Pagination Folder**:
- `Pagination-Desktop.md` - Reference untuk table pagination behavior
- `Pagination-Mobile.md` - Mobile pagination adaptation

### Behavior Documentation Templates

- **BEHAVIOR-TEMPLATE.md** - Comprehensive guide (start here)
- **BEHAVIOR-EXAMPLES.md** - Real implementations (reference)
- **BEHAVIOR-QUICK-REFERENCE.md** - Checklists & snippets (quick lookup)

---

## 🔗 Integration Points

### Component Documentation Structure:

```
# [Component Name] ([Component ID])

**Design System**: [Name] v[Version]

---

## 1. Usage Guidelines
(Mandatory rules, spacing, typography, colors, internal components)

## 2. When to Use & When NOT to Use
(✅ USE WHEN / ❌ DO NOT USE WHEN / ⚠️ DO NOT MIX)

## 3. Behavior                    ← THIS SECTION
(Interaction states, DO/DON'T guidelines)

## 4. Asset Requirements
(Graphics, icons, media needed)

## 5. Implementation Checklist
(Developer action items)

## 6. Accessibility
(WCAG standards, requirements)

## 7. Metadata
(Last Updated, Status, Notes)
```

---

## ⚠️ Common Mistakes to Avoid

1. **Generic DO/DON'T**
   - ❌ "Use good colors"
   - ✅ "Use --base-primary-5 for hover state"

2. **Missing Consequences**
   - ❌ "Don't use opacity alone"
   - ✅ "Don't use opacity alone for disabled state - fails for red-color-blind users"

3. **Hardcoded Values**
   - ❌ `background-color: #0F8696`
   - ✅ `background-color: var(--base-primary-6)`

4. **Skipped Accessibility**
   - ❌ Focus states optional
   - ✅ Focus states mandatory (WCAG 2.4.7)

5. **Too Many States**
   - ❌ 10+ subsections per component
   - ✅ Only significant states (4-6 max)

6. **Unclear Timing**
   - ❌ "Use transitions"
   - ✅ "Use transition: all 200ms ease"

---

## ✨ Best Practices Checklist

Before finalizing Behavior section:

```
CONTENT:
☐ All significant states documented
☐ State transitions clear (what triggers state change)
☐ Visual feedback documented per state
☐ Edge cases covered (disabled, loading, error)

GUIDELINES:
☐ DO/DON'T specific, not generic
☐ Minimum 3 items each (max 5)
☐ Consequences/rationale included
☐ Design tokens referenced
☐ Timing values specified (ms)

ACCESSIBILITY:
☐ Keyboard navigation documented
☐ Focus states distinctive (2px minimum)
☐ Color + icons used (not color alone)
☐ aria-* attributes recommended
☐ Screen reader tested

FORMATTING:
☐ Tables for state overview
☐ Code blocks with language identifier
☐ Consistent header hierarchy
☐ Bold for emphasis
☐ Line spacing organized

TESTING:
☐ Keyboard: Tab, Arrow, Enter, Escape
☐ Focus: Outline visible, sufficient contrast
☐ Screen Reader: Messages clear
☐ Mobile/Touch: Interactions functional
☐ Animation: Smooth on low-end devices
```

---

## 📞 Questions & Support

### When should I add subsection?
- Add subsection untuk complex state (button loading > simple)
- Skip subsection untuk simple states (just mention dalam table)

### How specific should DO/DON'T be?
- Include exact value/token: `--base-primary-6` not "use primary color"
- Include timing: `200ms` not "use smooth transitions"
- Include CSS if complex: `transition: all 200ms ease`

### What if component supports multiple platforms?
- Create separate files: `Component-Desktop.md`, `Component-Mobile.md`
- Behavior may differ between platforms (document both)

### How to handle state combinations?
- Focus on primary states (default, hover, active, disabled, error, loading)
- Assume combinations follow same pattern
- Document if special combination behavior exists

---

## 📖 Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Atlassian Design System](https://atlassian.design/) - Comprehensive design system reference
- [Material Design](https://material.io/design) - Component behavior patterns
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions) - Timing documentation

---

## 📝 Changelog

| Date | Version | Changes |
|---|---|---|
| 2026-02-26 | 1.0 | Initial structure and documentation |

---

**Created for**: Stellar Design System  
**Maintained by**: Design System Team  
**Last Review**: February 26, 2026

