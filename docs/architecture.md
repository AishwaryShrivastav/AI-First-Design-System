# Architecture

This document describes the architecture of the AI-First Design System.

## Overview

The AI-First Design System is built as a monorepo containing multiple packages that work together to provide a comprehensive design system for AI products.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Applications                          │
│  (Your React/Vue/Svelte/Vanilla JS applications)       │
└────────────┬──────────────┬──────────────┬─────────────┘
             │              │              │
    ┌────────▼────┐  ┌──────▼──────┐  ┌───▼────────┐
    │   React     │  │    Vue      │  │  Svelte    │
    │  Wrappers   │  │  Wrappers   │  │  Wrappers  │
    └────────┬────┘  └──────┬──────┘  └───┬────────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
                   ┌────────▼────────┐
                   │  Core Package   │
                   │ (Web Components)│
                   └────────┬────────┘
                            │
                   ┌────────▼────────┐
                   │  Design Tokens  │
                   │   (Styling)     │
                   └─────────────────┘
```

## Package Structure

### 1. Core Package (`ai-first-design-system`)

**Technology:** Lit (Web Components)  
**Purpose:** Framework-agnostic components  
**Reference:** [Lit Documentation](https://lit.dev/)

#### Responsibilities

- Define custom elements using Web Components API
- Implement component logic and state management
- Handle accessibility (ARIA, keyboard navigation)
- Provide styling via Shadow DOM
- Emit custom events for framework integration

#### Key Features

- Shadow DOM for style encapsulation
- Custom CSS properties for theming
- TypeScript for type safety
- Comprehensive JSDoc documentation

### 2. React Package (`@ai-first-ds/react`)

**Technology:** React 18+  
**Purpose:** React-friendly wrappers  
**Reference:** [Lit React Integration](https://lit.dev/docs/frameworks/react/)

#### Responsibilities

- Wrap web components in React components
- Convert web component events to React callbacks
- Synchronize React props with element properties
- Forward refs for imperative access
- Provide React-specific TypeScript types

#### Key Features

- Automatic prop syncing
- Event handler conversion
- Ref forwarding
- TypeScript definitions

### 3. Design Tokens Package (`@ai-first-ds/tokens`)

**Technology:** TypeScript + CSS  
**Purpose:** Centralized design tokens  
**Reference:** [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)

#### Responsibilities

- Define color palettes
- Typography scales
- Spacing system
- Animation tokens
- AI-specific styling tokens
- Tailwind CSS configuration

#### Key Features

- TypeScript type safety
- CSS custom properties
- Tailwind integration
- Platform-agnostic format

### 5. MCP Server Package (`@ai-first-ds/mcp-server`)

**Technology:** Model Context Protocol SDK  
**Purpose:** AI tool integration & auto-discovery  
**Reference:** [Model Context Protocol](https://modelcontextprotocol.io/)

#### Responsibilities

- Expose components as AI resources
- Expose design tokens as AI resources
- Provide structured metadata to AI agents
- Enable auto-discovery of new components

#### Key Features

- Auto-discovery of `ai-*` components
- Real-time metadata serving
- Token system integration
- Standardized AI tool interface

## Auto-Discovery Architecture

The system uses a metadata-driven architecture to ensure components are automatically discoverable by AI tools, documentation, and registries.

```
┌─────────────────┐      ┌──────────────────┐
│  Component File │      │  Metadata File   │
│ (ai-button.ts)  │◄─────┤ (ai-button.ts)   │
└────────┬────────┘      └────────┬─────────┘
         │                        │
         │               ┌────────▼─────────┐
         │               │ Component        │
         └──────────────►│ Registry         │
                         │ (registry.ts)    │
                         └────────┬─────────┘
                                  │
                  ┌───────────────┼────────────────┐
                  │               │                │
          ┌───────▼──────┐ ┌──────▼───────┐ ┌──────▼───────┐
          │  MCP Server  │ │  Storybook   │ │ Documentation│
          │ (AI Tools)   │ │ (Playground) │ │ (Index)      │
          └──────────────┘ └──────────────┘ └──────────────┘
```

### Discovery Mechanism

1. **Definition**: Component defined with `@customElement` and metadata
2. **Registration**: Metadata imported into central registry
3. **Exposure**:
   - MCP Server reads registry to create resources
   - Storybook scans for `ai-*` tags
   - Documentation generates indexes from metadata

## Design Decisions

### Why Web Components?

**Decision:** Use Web Components as the foundation  
**Rationale:**

- Framework-agnostic (works with any framework)
- Native browser support (no runtime overhead)
- True encapsulation with Shadow DOM
- Future-proof (web standard)

**Reference:**

- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)

### Why Lit?

**Decision:** Use Lit for component authoring  
**Rationale:**

- Lightweight (~5KB)
- Excellent developer experience
- Reactive properties and efficient updates
- TypeScript-first
- Decorators for clean syntax

**Reference:** [Lit vs Other Libraries](https://lit.dev/docs/getting-started/#lit-vs-other-libraries)

### Why Tailwind CSS?

**Decision:** Use Tailwind for styling system  
**Rationale:**

- Utility-first approach enables rapid customization
- Excellent theming support
- Small production bundle (tree-shakeable)
- Industry standard for design systems
- Works well with CSS custom properties

**Reference:** [Tailwind CSS for Design Systems](https://tailwindcss.com/docs/adding-custom-styles)

### Why Monorepo?

**Decision:** Use npm workspaces for monorepo  
**Rationale:**

- Single source of truth
- Shared tooling and dependencies
- Easier to maintain consistency
- Atomic cross-package changes
- Simplified versioning with Changesets

**Reference:** [npm Workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)

## Data Flow

### Component Events

```
User Interaction
      ↓
Web Component (Lit)
      ↓
Custom Event (native)
      ↓
Framework Wrapper (optional)
      ↓
Application Code
```

### Theming

```
Design Tokens (TS)
      ↓
CSS Custom Properties
      ↓
Shadow DOM Styles
      ↓
Component Rendering
```

## AI-Specific Architecture

### Streaming Text Flow

```
AI API Response
      ↓
Streaming Controller
      ↓
ai-streaming-text component
      ↓
Character-by-character rendering
      ↓
DOM updates (requestAnimationFrame)
```

### Explainability Pattern

```
AI Decision
      ↓
Progressive Disclosure Levels
├─ What (summary)
├─ Why (reasoning)
└─ How (technical)
      ↓
ai-explainability-panel
      ↓
User-controlled detail level
```

## Accessibility Architecture

**Reference:** [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Strategy

1. **Semantic HTML** - Use correct elements
2. **ARIA Attributes** - Add when semantic HTML insufficient
3. **Keyboard Navigation** - Full keyboard support
4. **Focus Management** - Logical focus order
5. **Screen Readers** - Live regions for dynamic content

### Testing Approach

- Automated: axe-core in Playwright tests
- Manual: Screen reader testing
- Compliance: WCAG 2.2 Level AA

## Performance Considerations

### Bundle Size Optimization

- Tree-shakeable exports
- Lazy loading of heavy components
- Code splitting by component
- Minimal runtime dependencies

**Target:** < 50KB for core package (gzipped)

### Runtime Performance

- Virtual DOM (Lit's efficient rendering)
- requestAnimationFrame for animations
- Debounced event handlers
- Memoization where appropriate

## Security Architecture

**Reference:** [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Measures

1. **Input Sanitization** - All user input sanitized
2. **XSS Protection** - Content Security Policy compatible
3. **Dependency Scanning** - Automated with Dependabot
4. **Security Audits** - Regular `npm audit` runs
5. **Responsible Disclosure** - Security policy in place

## Versioning Strategy

**Reference:** [Semantic Versioning](https://semver.org/)

### Approach

- Semantic versioning (MAJOR.MINOR.PATCH)
- Changesets for automated versioning
- Conventional commits for changelogs
- Independent package versioning

### Release Process

1. Changes committed with changesets
2. PR created by Changesets bot
3. Review and merge PR
4. Automated npm publish
5. GitHub release created

## Testing Strategy

```
┌─────────────────────────────────────┐
│         Testing Pyramid             │
├─────────────────────────────────────┤
│  E2E Tests (Playwright)             │ ← Few, expensive
│    - User workflows                 │
│    - Cross-browser                  │
├─────────────────────────────────────┤
│  Integration Tests                  │ ← Some
│    - Component interactions         │
│    - Accessibility                  │
├─────────────────────────────────────┤
│  Unit Tests (Vitest)                │ ← Many, fast
│    - Component logic                │
│    - Utilities                      │
└─────────────────────────────────────┘
```

**Target Coverage:** 90%+

## Future Architecture Considerations

### Planned Enhancements

1. **Vue Wrappers** - Vue 3 composition API wrappers
2. **Svelte Wrappers** - Svelte component wrappers
3. **Icon Library** - AI-themed icon set
4. **Animation Library** - Reusable AI animations
5. **Plugin System** - Extend components with plugins

### Scalability

- Component lazy loading
- CDN distribution
- Tree-shaking optimization
- Progressive enhancement

## References

- [Lit Architecture](https://lit.dev/docs/composition/overview/)
- [Web Components Best Practices](https://web.dev/custom-elements-best-practices/)
- [Design System Architecture](https://bradfrost.com/blog/post/a-design-system-governance-process/)
- [Monorepo Architecture](https://monorepo.tools/)
