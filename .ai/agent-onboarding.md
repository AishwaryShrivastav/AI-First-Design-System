# Agent Onboarding Guide

## Get Up to Speed in 5 Minutes

> **For AI Coding Assistants:** This is your quick-start guide to the AI-First Design System

---

## 🎯 Project Identity

**What:** Research-backed design system for AI products  
**Stack:** TypeScript + Lit (Web Components) + Tailwind CSS  
**Philosophy:** AI-first, research-backed, accessible (WCAG AA)  
**Version:** 0.2.0  
**Components:** 15 (all production-ready)

---

## 🚨 Critical Requirements

### 1. Research-Backed (NON-NEGOTIABLE)

**Every component MUST have 2+ research citations from 2023-2025**

Valid sources:

- ✅ IBM Carbon for AI (2024)
- ✅ Microsoft HAX Toolkit
- ✅ Google AI UX Patterns (2024)
- ✅ Academic papers (CHI, UIST)
- ✅ SAP Fiori, PatternFly design systems
- ❌ Blog posts, personal opinions, outdated sources

### 2. Auto-Discovery (AUTOMATIC)

Components auto-register in:

- **MCP Server** (AI tool integration)
- **Storybook** (documentation)
- **Component Registry** (metadata API)

Required for auto-discovery:

- Naming: `ai-*` prefix
- Decorator: `@customElement('ai-component-name')`
- Metadata: Complete ComponentMetadata type
- JSDoc: Comprehensive documentation

### 3. WCAG AA Accessibility (REQUIRED)

- Keyboard navigation
- ARIA labels
- Screen reader support
- Color contrast 4.5:1

---

## 📁 Project Structure

```
packages/
├── core/           # 15 Web Components (Lit) - YOUR PRIMARY WORKSPACE
│   ├── components/
│   │   ├── ai/     # AI-specific (11 components)
│   │   └── base/   # Base components (4 components)
│   └── metadata/   # Component metadata for MCP server
│       ├── types.ts
│       ├── component-registry.ts
│       ├── additional-components.ts
│       └── phase1-components.ts
├── react/          # React wrappers (auto-generated from core)
├── tokens/         # Design tokens (colors, spacing, AI tokens)
├── storybook/      # Component documentation
└── mcp-server/     # Model Context Protocol server (AI tool integration)

docs/               # Architecture & guides
.ai/                # AI-specific documentation (YOU ARE HERE)
```

---

## 🎨 15 Components Available

### Base (AI-Enhanced)

- `ai-button` - Button with AI indicators
- `ai-input` - Input with AI suggestions
- `ai-badge` - Status badges

### Conversational

- `ai-chat-message` - Chat bubbles with streaming
- `ai-chat-interface` - Complete chat UI
- `ai-prompt-input` - Advanced prompt composer

### AI-Specific

- `ai-label` - AI involvement indicators
- `ai-skeleton` - Loading states
- `ai-streaming-text` - Token-by-token rendering
- `ai-explainability-panel` - What/Why/How panels
- `ai-feedback` - User feedback collection

### Phase 1 (2024-2025 Research)

- `ai-prompt-templates` - Prompt guidance
- `ai-variant-selector` - Generative variability
- `ai-error-recovery` - Graceful error handling
- `ai-confidence-meter` - Trust visualization

---

## ⚡ Quick Commands

```bash
# Development
npm install           # Install all dependencies
npm run dev           # Start core package dev server
npm run storybook     # Launch component docs
npm test              # Run all tests
npm run build         # Build all packages

# MCP Server
cd packages/mcp-server && npm run build  # Build MCP server

# Validation
npm run lint          # ESLint
npm run typecheck     # TypeScript check
npm run format:check  # Prettier check
npm run validate      # All checks + tests
```

---

## 🔧 Common Tasks

### Task 1: Add New Component

**Location:** `packages/core/src/components/ai/`

```typescript
// 1. Create component file
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @research IBM Carbon for AI (2024) - [cite pattern]
 * @research Microsoft HAX #X - [cite principle]
 */
@customElement('ai-new-component')
export class AINewComponent extends LitElement {
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
    'ai-new-component': AINewComponent;
  }
}
```

**2. Create metadata**

- File: `packages/core/src/metadata/new-component.ts`
- Export: `aiNewComponentMetadata: ComponentMetadata`
- Required: props, events, research (2+ citations), examples

**3. Register in registry**

- Import in `component-registry.ts`
- Add to `components` array
- Auto-exposed via MCP server

**4. Storybook auto-discovers** (no action needed)

---

### Task 2: Update Design Tokens

**Location:** `packages/tokens/src/`

Files:

- `colors.ts` - Color palettes
- `typography.ts` - Font scales
- `spacing.ts` - Spacing system
- `ai-tokens.ts` - AI-specific tokens

All tokens export as `const` with TypeScript types.

---

### Task 3: Add Tests

**Co-locate with component:** `*.test.ts`

```typescript
import { expect, test } from 'vitest';
import { fixture } from '@open-wc/testing';
import './ai-new-component.js';

test('renders correctly', async () => {
  const el = await fixture('<ai-new-component></ai-new-component>');
  expect(el).toBeDefined();
});
```

---

## 📚 Key Files to Know

### Configuration

- `tsconfig.json` - TypeScript strict mode enabled
- `.eslintrc.json` - Linting rules (strict)
- `.prettierrc.json` - Code formatting
- `package.json` - Monorepo workspaces

### Documentation

- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution workflow
- `CODING_STANDARDS.md` - Code quality rules
- `docs/architecture.md` - System design
- `docs/component-creation-guide.md` - Detailed workflow
- `.ai/project-context.md` - Project summary

### Auto-Discovery

- `packages/core/src/metadata/component-registry.ts` - Component registry
- `packages/mcp-server/src/index.ts` - MCP server implementation
- `.ai/component-index.md` - Component catalog

---

## 🔬 Research Sources

All patterns reference these authoritative sources:

**Primary Sources:**

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/) (2024)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) (18 guidelines)
- [Google AI UX Patterns](https://material.io/blog/ai-design-patterns) (2024)

**Design Systems:**

- [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)
- [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)

**Standards:**

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)

---

## ⚠️ Common Pitfalls

❌ **DON'T:**

- Skip research citations (PR will be rejected)
- Use generic component names (must be `ai-*`)
- Forget JSDoc documentation
- Ignore accessibility
- Skip metadata creation
- Use outdated research (pre-2023)

✅ **DO:**

- Include 2+ research citations
- Follow `ai-*` naming convention
- Write comprehensive JSDoc
- Test accessibility (keyboard, screen reader)
- Create complete metadata
- Use 2024-2025 research sources

---

## 🚦 Quality Gates

Before submitting PR:

- [ ] Component has `ai-*` prefix
- [ ] 2+ research citations (2023-2025)
- [ ] Complete metadata created
- [ ] JSDoc documentation
- [ ] Added to component registry
- [ ] Tests written (unit + a11y)
- [ ] WCAG AA compliant
- [ ] Builds without errors
- [ ] Passes all lints
- [ ] Updated `.ai/component-index.md`

---

## 🎓 Philosophy

**AI-First, Not Retrofitted:**
Every component designed for AI from ground up, not adapted from traditional design systems.

**Research-Backed:**
Every design decision cites authoritative sources from 2024-2025 research.

**Accessible:**
WCAG 2.2 Level AA compliance is non-negotiable for all components.

**Auto-Discoverable:**
Components automatically register in MCP server, Storybook, and registry—no manual configuration.

---

## 📞 Next Steps

1. **Read:** `docs/component-creation-guide.md` for detailed workflow
2. **Read:** `docs/auto-discovery.md` to understand the magic
3. **Read:** `docs/research-requirements.md` for citation standards
4. **Explore:** `packages/core/src/components/ai/` for examples
5. **Refer:** `.ai/component-index.md` for component catalog

**Estimated onboarding time:** ✅ Complete!

---

_Last updated: 2025-11-26 | Version: 0.2.0 | 15 Components_
