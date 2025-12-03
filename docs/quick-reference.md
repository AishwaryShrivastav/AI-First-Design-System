# Quick Reference

> One-page guide to common tasks and lookups

## 🚀 Common Commands

```bash
# Development
npm install              # Install all dependencies
npm run dev              # Start core package dev server
npm run storybook        # Start component documentation

# Building
npm run build            # Build all packages
npm run clean            # Clean all build artifacts

# Testing
npm test                 # Run unit tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests with Playwright

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Auto-fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run typecheck        # TypeScript type checking

# Release
npx changeset            # Create a changeset
npm run version-packages # Version packages
npm run release          # Build and publish
```

## 📁 Project Structure

```
ai-first-design-system/
├── .ai/                    # AI tool context files
├── .github/                # GitHub workflows and configs
├── docs/                   # Documentation
│   ├── getting-started.md
│   ├── ai-principles.md
│   ├── accessibility.md
│   └── customization.md
├── examples/               # Example apps
├── packages/
│   ├── core/              # Web Components (Lit)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── base/  # Base components
│   │   │   │   └── ai/    # AI components
│   │   │   ├── utils/     # Types & constants
│   │   │   └── index.ts   # Package exports
│   │   └── package.json
│   ├── react/             # React wrappers
│   ├── tokens/            # Design tokens
│   └── storybook/         # Component docs
├── tests/                  # E2E and a11y tests
├── .cursorrules           # AI editor rules
├── CODING_STANDARDS.md    # Coding guidelines
├── CONTRIBUTING.md        # Contribution guide
└── package.json           # Root package
```

## 🧩 Component API Quick Lookup

### ai-button

```html
<ai-button variant="primary|secondary|ghost|danger" disabled loading aiGenerated confidence="0.95">
  Click me
</ai-button>
```

### ai-chat-message

```html
<ai-chat-message role="user|ai|system" streaming showActions timestamp="ISO-8601">
  Message content
</ai-chat-message>
```

### ai-prompt-input

```html
<ai-prompt-input placeholder="Ask anything..." multiline maxLength="500"> </ai-prompt-input>
```

### ai-explainability-panel

```html
<ai-explainability-panel level="what|why|how" collapsible defaultExpanded>
  <div slot="what">What explanation</div>
  <div slot="why">Why explanation</div>
  <div slot="how">How explanation</div>
</ai-explainability-panel>
```

### ai-feedback

```html
<ai-feedback variant="thumbs|stars|detailed" showComment> </ai-feedback>
```

## 🎨 Design Tokens

### Colors (CSS Custom Properties)

```css
--ai-primary-color
--ai-secondary-color
--ai-success-color
--ai-warning-color
--ai-error-color
--ai-text-color
--ai-bg-color
```

### Spacing Scale

```css
--ai-spacing-xs: 0.25rem /* 4px */ --ai-spacing-sm: 0.5rem /* 8px */ --ai-spacing-md: 1rem
  /* 16px */ --ai-spacing-lg: 1.5rem /* 24px */ --ai-spacing-xl: 2rem /* 32px */;
```

### Typography

```css
--ai-font-family:
  'Inter',
  sans-serif --ai-font-size-xs: 0.75rem /* 12px */ --ai-font-size-sm: 0.875rem /* 14px */
    --ai-font-size-md: 1rem /* 16px */ --ai-font-size-lg: 1.125rem /* 18px */
    --ai-font-size-xl: 1.25rem /* 20px */;
```

### Border Radius

```css
--ai-radius-sm: 0.25rem /* 4px */ --ai-radius-md: 0.375rem /* 6px */ --ai-radius-lg: 0.5rem
  /* 8px */ --ai-radius-xl: 0.75rem /* 12px */;
```

## 📦 Package Imports

### Core (Web Components)

```javascript
import 'ai-first-design-system';
// or specific components
import { AIButton, AIChatMessage } from 'ai-first-design-system';
```

### React

```tsx
import { AIButton, AIChatMessage } from '@ai-first-ds/react';
```

### Tokens

```javascript
import tokens from '@ai-first-ds/tokens';
import tailwindConfig from '@ai-first-ds/tokens/tailwind';
```

## 🛠️ Development Workflow

### Adding New Component

1. Create component file: `packages/core/src/components/[base|ai]/component-name.ts`
2. Add comprehensive JSDoc
3. Implement with Lit + TypeScript
4. Create test file: `component-name.test.ts`
5. Add Storybook story: `packages/storybook/stories/component-name.stories.ts`
6. Export from `packages/core/src/index.ts`
7. Create React wrapper in `packages/react/src/components/`
8. Run tests and lint
9. Create changeset: `npx changeset`

### Making a Release

1. Merge PRs to main
2. Changesets will create a PR with version bumps
3. Review and merge the version PR
4. CI will automatically publish to npm

## 🔍 Finding Things

### Find a component implementation

```bash
# Search in core package
ls packages/core/src/components/base/
ls packages/core/src/components/ai/
```

### Find component usage examples

```bash
# Storybook stories
ls packages/storybook/stories/
```

### Find tests

```bash
# Unit tests (co-located)
find packages -name "*.test.ts"

# E2E tests
ls tests/e2e/
```

### Find type definitions

```bash
# All types
cat packages/core/src/utils/types.ts
```

## 📝 Commit Convention

```
<type>(<scope>): <description>

feat(ai-button): add loading state
fix(ai-chat): resolve streaming issue
docs(readme): update examples
test(ai-input): add validation tests
```

## ♿ Accessibility Quick Check

- [ ] Keyboard navigable (Tab, Enter, Escape, Arrows)
- [ ] Proper ARIA attributes
- [ ] Color contrast ≥ 4.5:1
- [ ] Focus visible
- [ ] Screen reader tested

## 🔗 Important Links

- [Storybook](https://your-storybook-url.com) - Component docs
- [GitHub](https://github.com/AishwaryShrivastav/AI-First-Design-System) - Repository
- [npm](https://www.npmjs.com/package/ai-first-design-system) - Package
- [Contributing](./CONTRIBUTING.md) - Contribution guide
- [Coding Standards](./CODING_STANDARDS.md) - Code guidelines

## 🎯 Design Principles

1. **Transparency** - Always show AI involvement
2. **Explainability** - Progressive disclosure (what/why/how)
3. **Human-Centered** - AI enhances, doesn't replace
4. **Contextual** - Help when needed
5. **User Control** - Allow overrides

## 📚 Key References

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
- [Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
- [PatternFly AI](https://www.patternfly.org/patternfly-ai/ai-guidelines/)
- [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
