## Component Submission Checklist

Thank you for contributing! Please ensure your component meets all requirements before submitting.

---

### Component Implementation

- [ ] Component uses `ai-*` naming convention
- [ ] Has `@customElement('ai-component-name')` decorator
- [ ] Comprehensive JSDoc documentation with `@research` tags
- [ ] TypeScript strict mode compliant (no `any` types)
- [ ] Accessible (WCAG 2.2 Level AA)
- [ ] Keyboard navigable (Tab, Enter, Space, Arrows as needed)
- [ ] Proper ARIA labels and roles
- [ ] Emits semantic custom events (`CustomEvent` with `bubbles: true`, `composed: true`)
- [ ] Uses CSS custom properties for theming
- [ ] Exposes shadow parts for external styling (if applicable)

---

### Research Backing (REQUIRED)

- [ ] **Minimum 2 research citations** from 2023-2025
- [ ] Citations from authoritative sources (Tier 1-4, see [Research Requirements](./docs/research-requirements.md))
- [ ] Each citation includes rationale explaining relevance
- [ ] Research documented in component metadata
- [ ] Research cited in JSDoc `@research` tags

**Valid Sources:** IBM Carbon for AI, Microsoft HAX, Google AI Patterns, SAP Fiori, academic papers (CHI, UIST, IUI), W3C standards

**Invalid Sources:** Personal blogs, Medium posts without citations, outdated sources (pre-2023)

---

### Metadata (REQUIRED)

- [ ] Complete `ComponentMetadata` created in `/packages/core/src/metadata/`
- [ ] All properties documented with types, defaults, examples
- [ ] All events documented with detail types
- [ ] All slots documented (if applicable)
- [ ] CSS custom properties documented (if applicable)
- [ ] Accessibility info complete (WCAG level, ARIA, keyboard nav)
- [ ] **2+ research citations with URLs and rationales**
- [ ] Related components listed
- [ ] Usage examples for vanilla JS + React
- [ ] Best practices listed (4-5 recommendations)
- [ ] Pitfalls documented (common mistakes)
- [ ] Tags for searchability

---

### Auto-Discovery Integration

- [ ] Metadata imported in `packages/core/src/metadata/component-registry.ts`
- [ ] Component added to `componentRegistry.components` array
- [ ] Version updated in registry (if needed)
- [ ] MCP server builds without errors (`cd packages/mcp-server && npm run build`)
- [ ] Component appears in Storybook (naming convention `ai-*`)

---

### Testing

- [ ] Unit tests created (`*.test.ts` co-located with component)
- [ ] Test coverage includes:
  - [ ] Component renders correctly
  - [ ] Properties work as expected
  - [ ] Events are emitted correctly
- [ ] All tests pass and code quality checks pass
- [ ] I have updated all required documentation

---

_See [Component Creation Guide](./docs/component-creation-guide.md) for detailed workflow_ React usage

---

### Code Quality

- [ ] Builds without errors (`npm run build`)
- [ ] Passes ESLint (`npm run lint`)
- [ ] Passes Prettier (`npm run format:check`)
- [ ] Passes TypeScript check (`npm run typecheck`)
- [ ] No unused imports or variables
- [ ] Follows [Coding Standards](./CODING_STANDARDS.md)

---

### Accessibility (WCAG 2.2 AA)

- [ ] Color contrast meets 4.5:1 minimum
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators visible
- [ ] ARIA labels for interactive elements
- [ ] Screen reader accessible
- [ ] Tested with axe DevTools (no violations)

---

## Description

**What does this component do?**

<!-- Brief description of component purpose and use cases -->

**What research supports this?**

<!-- List your 2+ research sources with URLs -->

1. [Source Name] (Year): [URL]
   - Rationale: [Why this source supports your design]

2. [Source Name] (Year): [URL]
   - Rationale: [How this validates the pattern]

**How does it auto-discover?**

<!-- Confirm it follows conventions: ai-* naming, @customElement decorator, metadata in registry -->

---

### Related Issues

<!-- Link any related issues or discussions -->

Closes #

---

## Screenshots (if applicable)

<!-- Add screenshots of component in action -->

---

## Reviewer Notes

<!-- Any specific areas you'd like reviewers to focus on? -->

---

## Pre-Submit Verification

Run these commands before submitting:

```bash
# Full validation
npm run validate

# Manual checks
npm run build
cd packages/mcp-server && npm run build
npm run storybook  # Verify component appears
```

---

**By submitting this PR, I confirm:**

- [ ] I have read the [Contributing Guidelines](./CONTRIBUTING.md)
- [ ] My component is research-backed with 2+ citations from 2023-2025
- [ ] My component follows the `ai-*` naming convention
- [ ] My component auto-discovers in MCP server and Storybook
- [ ] My component meets WCAG 2.2 Level AA accessibility standards
- [ ] All tests pass and code quality checks pass
- [ ] I have updated all required documentation

---

_See [Component Creation Guide](./docs/component-creation-guide.md) for detailed workflow_
