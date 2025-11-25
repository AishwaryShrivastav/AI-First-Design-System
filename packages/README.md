# Packages Overview

> Quick guide to the monorepo structure

## Available Packages

### @ai-first-ds/core

**Framework-agnostic Web Components**

The foundation of the design system. Built with Lit, works with any framework.

- **Location**: `packages/core/`
- **Build Output**: `packages/core/dist/`
- **Install**: `npm install @ai-first-ds/core`
- **Usage**: Import components directly or use as custom elements
- **Dependencies**: Lit, TypeScript

```html
<script type="module">
  import '@ai-first-ds/core';
</script>
<ai-button variant="primary">Click me</ai-button>
```

---

### @ai-first-ds/react

**React Wrapper Components**

React-friendly wrappers around core components with proper typing and event handling.

- **Location**: `packages/react/`
- **Build Output**: `packages/react/dist/`
- **Install**: `npm install @ai-first-ds/react`
- **Usage**: Import as React components
- **Dependencies**: @ai-first-ds/core, React

```tsx
import { AIButton, AIChatMessage } from '@ai-first-ds/react';

<AIButton variant="primary">Click me</AIButton>;
```

---

### @ai-first-ds/tokens

**Design Tokens**

Shared design tokens for colors, typography, spacing, and AI-specific values.

- **Location**: `packages/tokens/`
- **Build Output**: `packages/tokens/dist/`
- **Install**: `npm install @ai-first-ds/tokens`
- **Usage**: Import tokens or Tailwind config
- **Dependencies**: None

```javascript
import tokens from '@ai-first-ds/tokens';
import tailwindConfig from '@ai-first-ds/tokens/tailwind';
```

---

### @ai-first-ds/storybook

**Component Documentation** (Development only)

Interactive component documentation and examples.

- **Location**: `packages/storybook/`
- **Not Published**: Development tool only
- **Usage**: `npm run storybook`
- **Dependencies**: Storybook, all other packages

---

## Package Dependencies

```
┌─────────────┐
│   tokens    │ ← No dependencies
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    core     │ ← Depends on: tokens, lit
└──────┬──────┘
       │
       ├──────────────┐
       ↓              ↓
┌─────────────┐  ┌─────────────┐
│    react    │  │  storybook  │
└─────────────┘  └─────────────┘
```

## When to Use Which Package

### Use `@ai-first-ds/core` when:

- Building with vanilla JavaScript
- Using any framework (Vue, Svelte, Angular, etc.)
- You want maximum flexibility
- Building a CDN version

### Use `@ai-first-ds/react` when:

- Building a React application
- You want TypeScript autocomplete for React props
- You prefer JSX/TSX syntax
- You need React-specific features (hooks integration)

### Use `@ai-first-ds/tokens` when:

- You need design tokens only
- Customizing Tailwind config
- Building custom components
- Creating branded themes

## Development

### Working on Core

```bash
cd packages/core
npm run dev          # Start dev server
npm run build        # Build package
npm test             # Run tests
```

### Working on React

```bash
cd packages/react
npm run build        # Build React wrappers
npm test             # Run tests
```

### Working on Tokens

```bash
cd packages/tokens
npm run build        # Build token files
```

### Working on Storybook

```bash
npm run storybook    # From root - starts docs server
```

## Building All Packages

From root:

```bash
npm run build        # Builds all packages in order
```

Build order:

1. `tokens` (no dependencies)
2. `core` (depends on tokens)
3. `react` (depends on core)
4. `storybook` (depends on all)

## Publishing

Packages are automatically published via CI when changesets are merged:

```bash
npx changeset           # Create changeset
npm run version-packages # Bump versions
npm run release         # Build and publish
```

## Internal Dependencies

All packages can reference each other during development using workspace protocol:

```json
{
  "dependencies": {
    "@ai-first-ds/core": "workspace:*",
    "@ai-first-ds/tokens": "workspace:*"
  }
}
```

This is resolved to actual versions during publishing.

## Package Exports

### Core Package

```typescript
// Main entry point
import '@ai-first-ds/core';

// Named exports
import { AIButton, AIChatMessage } from '@ai-first-ds/core';
import type { ButtonVariant, AIRole } from '@ai-first-ds/core';
```

### React Package

```typescript
import { AIButton, AIChatMessage } from '@ai-first-ds/react';
import type { AIButtonProps, AIChatMessageProps } from '@ai-first-ds/react';
```

### Tokens Package

```typescript
import tokens from '@ai-first-ds/tokens';
import { colors, spacing, typography } from '@ai-first-ds/tokens';
import tailwindConfig from '@ai-first-ds/tokens/tailwind';
```

## Links

- Core: `packages/core/README.md`
- React: `packages/react/README.md`
- Tokens: `packages/tokens/README.md`
- Documentation: [Getting Started](../docs/getting-started.md)
