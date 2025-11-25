# Accessibility

The AI-First Design System is built with accessibility as a core principle, not an afterthought.

## Commitment

All components meet **WCAG 2.2 Level AA** standards.

**Reference:** [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

## Accessibility Features

### 1. Keyboard Navigation

All interactive components are fully keyboard accessible:

- **Tab** - Move between interactive elements
- **Enter/Space** - Activate buttons and controls
- **Escape** - Close modals and dropdowns
- **Arrow Keys** - Navigate within components
- **Cmd/Ctrl + Enter** - Submit in prompt inputs

**Reference:** [WAI-ARIA Keyboard Patterns](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

### 2. Screen Reader Support

#### Semantic HTML
We use semantic HTML elements wherever possible:
- `<button>` for interactive elements
- `<input>` for form fields
- Proper heading hierarchy

#### ARIA Attributes
When semantic HTML isn't sufficient:
- `role` attributes for custom elements
- `aria-label` for context
- `aria-describedby` for descriptions
- `aria-live` for dynamic content
- `aria-busy` for loading states

#### Live Regions
AI-specific live regions:
```html
<ai-chat-message role="ai" streaming>
  <!-- aria-live="polite" automatically added -->
  Streaming response...
</ai-chat-message>
```

**Reference:** [ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)

### 3. Visual Accessibility

#### Color Contrast
All color combinations meet WCAG AA standards (4.5:1 minimum):

- Text on backgrounds: 4.5:1+
- Large text: 3:1+
- UI components: 3:1+

Test with our provided contrasts in design tokens.

**Reference:** [WCAG Contrast Requirements](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)

#### Focus Indicators
Clear, visible focus indicators on all interactive elements:
- 2px outline
- High contrast
- Offset for clarity

#### Visual Indicators
We don't rely on color alone:
- Icons for states
- Text labels
- Patterns and shapes

### 4. Motor Accessibility

#### Large Touch Targets
Minimum 44x44px touch targets on all interactive elements.

**Reference:** [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

#### No Timing Requirements
- No timeout-based interactions
- Pauseable animations
- Cancellable AI operations

### 5. Cognitive Accessibility

#### Clear Language
- Simple, concise labels
- Helpful error messages
- Consistent terminology

#### Progressive Disclosure
- Don't overwhelm users
- Reveal complexity gradually
- Clear information hierarchy

Example: AI Explainability Panel
```html
<ai-explainability-panel level="what">
  <!-- Simple explanation first -->
  <div slot="what">This was recommended</div>
  
  <!-- Deeper details on request -->
  <div slot="why">Because...</div>
  <div slot="how">Technical details...</div>
</ai-explainability-panel>
```

## Component-Specific Accessibility

### AIButton

- ✅ Keyboard: Enter/Space to activate
- ✅ ARIA: `role="button"`, `aria-busy` when loading
- ✅ Screen reader: Announces AI-generated state
- ✅ Focus: Clear outline on focus
- ✅ State: Disabled state properly communicated

### AIChatMessage

- ✅ Keyboard: Tab to action buttons
- ✅ ARIA: `role="article"`, `aria-live` when streaming
- ✅ Screen reader: Announces role (user/AI/system)
- ✅ Structure: Proper heading hierarchy

### AIPromptInput

- ✅ Keyboard: Cmd/Ctrl+Enter to submit
- ✅ ARIA: `aria-label`, `aria-describedby` for token count
- ✅ Screen reader: Token count announced
- ✅ Auto-resize: Maintains readability

### AIExplainabilityPanel

- ✅ Keyboard: Tab through levels, arrows for navigation
- ✅ ARIA: `role="tabpanel"`, proper tab structure
- ✅ Screen reader: Announces level changes
- ✅ Progressive: Information revealed progressively

## Testing Accessibility

### Automated Testing

We use multiple tools for automated accessibility testing:

```bash
# Run all accessibility tests
npm run test:e2e tests/accessibility

# Specific WCAG tests
npx playwright test tests/accessibility/wcag.spec.ts
```

**Tools Used:**
- [axe-core](https://github.com/dequelabs/axe-core) - Industry standard
- [Playwright](https://playwright.dev/) - E2E testing
- [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) - Storybook integration

### Manual Testing

We recommend manual testing with:

- **Screen Readers**
  - NVDA (Windows)
  - JAWS (Windows)  
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)

- **Keyboard Only**
  - Unplug your mouse
  - Navigate using only keyboard
  - Verify all functionality accessible

- **Browser Extensions**
  - WAVE Toolbar
  - axe DevTools
  - Lighthouse

## Accessibility Checklist

When contributing new components:

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announcements correct
- [ ] Color contrast meets AA standards (4.5:1)
- [ ] Touch targets at least 44x44px
- [ ] No keyboard traps
- [ ] Semantic HTML used
- [ ] ARIA used only when needed
- [ ] Component tested with screen reader
- [ ] Automated accessibility tests pass

## Common Patterns

### Making Content Accessible

```html
<!-- ❌ Bad: No context -->
<button>Click</button>

<!-- ✅ Good: Clear label -->
<ai-button aria-label="Submit AI prompt">Submit</ai-button>

<!-- ❌ Bad: Color only -->
<div style="color: red">Error</div>

<!-- ✅ Good: Icon + text -->
<ai-badge variant="error">❌ Error</ai-badge>
```

### Live Regions for AI

```html
<!-- Streaming AI response -->
<ai-chat-message role="ai" streaming>
  <!-- Automatically includes aria-live="polite" -->
  AI is typing...
</ai-chat-message>

<!-- Progress updates -->
<div role="status" aria-live="polite">
  <ai-skeleton lines="3"></ai-skeleton>
</div>
```

### Keyboard Shortcuts

```html
<!-- Document keyboard shortcuts -->
<ai-prompt-input>
  <!-- Includes hint: "Press ⌘+Enter to submit" -->
</ai-prompt-input>
```

## Known Limitations

### Current Limitations
- High contrast mode could be improved
- Some animations can't be fully disabled
- Voice control not yet optimized

### Planned Improvements
- Enhanced high contrast mode (v0.2.0)
- Respecting `prefers-reduced-motion` (v0.2.0)
- Voice control optimizations (v0.3.0)

## Resources

### Guidelines
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) (Built-in, macOS/iOS)
- [TalkBack](https://support.google.com/accessibility/android/answer/6283677) (Built-in, Android)

## Get Help

- [File an accessibility issue](https://github.com/AishwaryShrivastav/AI-First-Design-System/issues/new?template=bug_report.yml&labels=accessibility)
- [Ask in Discussions](https://github.com/AishwaryShrivastav/AI-First-Design-System/discussions)
- Email: aishwaryshrivastava@gmail.com

---

**Accessibility is a journey, not a destination. We're committed to continuous improvement.**

