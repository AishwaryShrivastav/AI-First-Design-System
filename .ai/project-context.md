# AI-First Design System - Project Context

> Quick reference for AI tools and developers

## What Is This?

**Open-source design system built specifically for AI products**

- Framework-agnostic Web Components (works with React, Vue, Svelte, or vanilla JS)
- TypeScript + Lit + Tailwind CSS
- WCAG 2.2 Level AA accessibility
- Monorepo with npm workspaces

## Quick Stats

- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + Playwright
- **Docs**: Storybook
- **Node**: >=18.0.0

## Project Structure

```
packages/
├── core/          # Web Components (Lit) - framework-agnostic
├── react/         # React wrappers
├── tokens/        # Design tokens
└── storybook/     # Component documentation

docs/              # Additional documentation
examples/          # Example applications
tests/             # E2E and accessibility tests
```

## Component Categories

### Base Components (AI-Enhanced)

Standard UI elements with AI capabilities:

- `ai-button`, `ai-input`, `ai-badge`

### AI-Specific Components

Purpose-built for AI interactions:

- `ai-chat-message` - Chat bubbles with streaming
- `ai-chat-interface` - Complete chat UI
- `ai-prompt-input` - Advanced prompt composer
- `ai-label` - AI content indicators
- `ai-skeleton` - AI-aware loaders
- `ai-streaming-text` - Token-by-token text
- `ai-explainability-panel` - Progressive disclosure
- `ai-feedback` - User feedback collection
- `ai-prompt-templates` - Prompt guidance
- `ai-variant-selector` - Generative variability
- `ai-error-recovery` - Graceful fallback
- `ai-confidence-meter` - Trust visualization

## Auto-Discovery & Tooling

### MCP Server

- **Package**: `packages/mcp-server`
- **Purpose**: Exposes components and tokens to AI tools
- **Resources**: `ai-design-system://components`, `ai-design-system://tokens`
- **Auto-Discovery**: Components with `ai-*` prefix and metadata are automatically exposed

### Metadata System

- **Location**: `packages/core/src/metadata/`
- **Registry**: `component-registry.ts`
- **Features**: Machine-readable props, events, accessibility, and research citations

## Key Design Decisions

1. **Web Components over Framework-Specific**
   - Chose Lit for lightweight, standards-based components
   - Ensures long-term compatibility across frameworks

2. **AI-First, Not Retrofit**
   - Every component designed for AI from ground up
   - Not adapted from traditional design systems

3. **Accessibility as Requirement**
   - WCAG 2.2 Level AA compliance is non-negotiable
   - All components keyboard accessible and screen reader tested

4. **Research-Backed Design**
   - Every pattern references established design systems (Carbon, PatternFly, SAP Fiori)
   - Follows Microsoft HAX Toolkit guidelines

5. **TypeScript Strict Mode**
   - Strong typing enforced throughout
   - Better DX and fewer runtime errors

## Development Workflow

```bash
npm install          # Install dependencies
npm run dev          # Start development (core package)
npm test             # Run unit tests
npm run build        # Build all packages
npm run storybook    # Start component docs
npm run lint         # Lint code
npm run typecheck    # TypeScript validation
```

## Common Tasks

- **Add new component**: `packages/core/src/components/`
- **Update design tokens**: `packages/tokens/src/`
- **Add React wrapper**: `packages/react/src/components/`
- **Write docs**: `packages/storybook/stories/`
- **Add tests**: Co-locate `*.test.ts` with component

## Code Patterns

### Component Template

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ai-component-name')
export class AIComponentName extends LitElement {
  @property({ type: String }) variant = 'default';

  static styles = css`
    /* styles */
  `;

  render() {
    return html`<!-- template -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-component-name': AIComponentName;
  }
}
```

## Important Files

- `tsconfig.json` - TypeScript strict mode enabled
- `.eslintrc.json` - Linting rules
- `.prettierrc.json` - Code formatting
- `vitest.config.ts` - Test configuration
- `package.json` - Root package with workspaces

## References

All design decisions cite these sources:

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
- [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)
- [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
