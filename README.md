# AI-First Design System

> A comprehensive, open-source design system built specifically for AI products

## 🎯 TL;DR

**What**: Framework-agnostic Web Components for AI products  
**Tech**: Lit + TypeScript + Tailwind CSS  
**Why**: First design system built for AI from the ground up (not retrofitted)

**Version**: 0.2.0  
**Components**: 14 (all documented in Storybook)  
**Install**: `npm install @ai-first-ds/core` or `@ai-first-ds/react`  
**Docs**: Quick start below | [Full Guide](./docs/getting-started.md) | [Storybook Guide](./packages/storybook/STORYBOOK_GUIDE.md) | [Components](./.ai/component-index.md)

[![npm version](https://badge.fury.io/js/%40ai-first-ds%2Fcore.svg)](https://www.npmjs.com/package/@ai-first-ds/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/AishwaryShrivastav/AI-First-Design-System/actions/workflows/ci.yml/badge.svg)](https://github.com/AishwaryShrivastav/AI-First-Design-System/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/AishwaryShrivastav/AI-First-Design-System/branch/main/graph/badge.svg)](https://codecov.io/gh/AishwaryShrivastav/AI-First-Design-System)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/code_of_conduct-enforced-ff69b4.svg)](./CODE_OF_CONDUCT.md)

## 🤖 For AI Tools

<details>
<summary>Structured metadata for AI code assistants</summary>

```yaml
project_type: design_system
primary_language: TypeScript
framework: Lit (Web Components)
styling: Tailwind CSS + CSS-in-JS
architecture: Monorepo (npm workspaces)
build_tool: Vite
test_framework: Vitest + Playwright
package_manager: npm

packages:
  - name: '@ai-first-ds/core'
    type: web_components
    framework_agnostic: true
  - name: '@ai-first-ds/react'
    type: react_wrappers
  - name: '@ai-first-ds/tokens'
    type: design_tokens

key_files:
  - .cursorrules # AI editor rules and patterns
  - .ai/project-context.md # Project overview for AI
  - .ai/component-index.md # Component catalog
  - CODING_STANDARDS.md # Coding conventions
  - docs/quick-reference.md # Command & API reference
  - .github/AI_TOOLS.md # AI development guide

component_pattern: |
  Lit-based Web Components with:
  - Comprehensive JSDoc (@element, @prop, @fires, @accessibility, @reference)
  - TypeScript strict mode
  - WCAG 2.2 Level AA accessibility
  - Research-backed AI design patterns
```

</details>

## ✨ Key Features

- **🤖 AI-First by Design** - Purpose-built components for AI interactions, not retrofitted
- **🌐 Framework Agnostic** - Works with React, Vue, Svelte, or vanilla JavaScript
- **♿ Accessible** - WCAG 2.2 compliant, following WAI-ARIA patterns
- **🎨 Customizable** - Extensive theming with Tailwind CSS and CSS custom properties
- **📦 Lightweight** - Tree-shakeable, optimized bundle sizes
- **📚 Well Documented** - Complete Storybook documentation for all components with interactive examples
- **🔧 Developer Friendly** - TypeScript support, AI code editor optimized

## 🏗️ Architecture

### Core Technologies

- **[Lit](https://lit.dev/)** - Lightweight web components library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Vite](https://vitejs.dev/)** - Fast build tooling
- **[Storybook](https://storybook.js.org/)** - Component documentation

### Design Principles

Based on research from leading design systems:

1. **Transparency** - Clear AI indicators ([Carbon Design System](https://carbondesignsystem.com/guidelines/carbon-for-ai/))
2. **Explainability** - Progressive disclosure ([SAP Fiori](https://experience.sap.com/fiori-design-web/explainable-ai/))
3. **Human-Centered** - AI enhances humans ([PatternFly](https://www.patternfly.org/patternfly-ai/ai-guidelines/))
4. **Contextual** - AI helps when needed ([Emplifi Soul](https://soul.emplifi.io/))
5. **User Control** - Override AI decisions ([Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/))

## 📦 Packages

```
@ai-first-ds/
  ├── core          # Web Components (framework-agnostic)
  ├── react         # React wrappers
  ├── vue           # Vue wrappers
  ├── svelte        # Svelte wrappers
  ├── tokens        # Design tokens
  └── icons         # Icon library
```

## 🚀 Quick Start

### Installation

```bash
# Core components (framework-agnostic)
npm install @ai-first-ds/core

# React
npm install @ai-first-ds/react

# Vue
npm install @ai-first-ds/vue

# Svelte
npm install @ai-first-ds/svelte
```

### Usage

#### Vanilla JavaScript / Web Components

```html
<script type="module">
  import '@ai-first-ds/core';
</script>

<ai-chat-message role="ai" streaming> Hello! How can I help you today? </ai-chat-message>

<ai-prompt-input placeholder="Ask me anything..." />
```

#### React

```tsx
import { AIChatMessage, AIPromptInput } from '@ai-first-ds/react';

function App() {
  return (
    <>
      <AIChatMessage role="ai" streaming>
        Hello! How can I help you today?
      </AIChatMessage>
      <AIPromptInput placeholder="Ask me anything..." />
    </>
  );
}
```

#### Vue

```vue
<script setup>
import { AIChatMessage, AIPromptInput } from '@ai-first-ds/vue';
</script>

<template>
  <AIChatMessage role="ai" streaming> Hello! How can I help you today? </AIChatMessage>
  <AIPromptInput placeholder="Ask me anything..." />
</template>
```

## 🧩 Component Categories

### Base Components (AI-Enhanced)

- Button, Input, Select, Checkbox, Radio, Toggle
- Textarea, Tooltip, Badge, Avatar, Card
- Modal/Dialog, Dropdown, Tabs, Accordion
- Progress, Skeleton

### AI-Specific Components

- **Conversational**: Chat interface, message bubbles, streaming text
- **Input**: Prompt input, autocomplete, templates
- **Transparency**: AI labels, explainability panels, feedback tools
- **Loading**: Streaming indicators, skeleton loaders, processing states
- **Visualization**: Insights dashboards, confidence meters, content display
- **Suggestions**: Inline suggestions, recommendation cards, smart search
- **Safety**: Error states, content warnings, fallback patterns

## 🎨 Theming

Customize the design system to match your brand:

```css
:root {
  --ai-primary-color: #your-brand-color;
  --ai-font-family: 'Your Font', sans-serif;
  --ai-border-radius: 8px;
  /* ... more tokens */
}
```

See [theming documentation](./docs/theming.md) for details.

## 🧪 Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Build all packages
npm run build

# Start Storybook
npm run storybook
```

## 📖 Documentation

- **[Quick Reference](./docs/quick-reference.md)** - Commands, APIs, and common tasks
- **[Getting Started](./docs/getting-started.md)** - Installation and setup guide
- **[Storybook Guide](./packages/storybook/STORYBOOK_GUIDE.md)** - Complete Storybook documentation standards
- **[Component Index](./.ai/component-index.md)** - All components with examples
- **[AI Design Principles](./docs/ai-principles.md)** - Core design philosophy
- **[Accessibility Guide](./docs/accessibility.md)** - WCAG compliance details
- **[Customization](./docs/customization.md)** - Theming and styling guide
- **[Coding Standards](./CODING_STANDARDS.md)** - Code conventions
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute
- **[AI Tools Guide](./.github/AI_TOOLS.md)** - Using AI assistants with this project

### Interactive Documentation

Run Storybook locally to explore all components:

```bash
npm run storybook
```

All 14 components are fully documented with:

- Interactive controls and examples
- Accessibility information
- Best practices and pitfalls
- Real-world usage examples
- Research references

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📝 License

MIT © AI First Design System Contributors

## 🙏 Acknowledgments

This design system is built on the shoulders of giants. We drew inspiration and best practices from:

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [PatternFly](https://www.patternfly.org/)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/)
- [SAP Fiori](https://experience.sap.com/fiori-design/)
- [Radix UI](https://www.radix-ui.com/)
- [Material Design](https://material.io/)

## 🔗 Links

- [GitHub](https://github.com/AishwaryShrivastav/AI-First-Design-System)
- [npm](https://www.npmjs.com/package/@ai-first-ds/core)
