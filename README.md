# AI-First Design System

> A comprehensive, open-source design system built specifically for AI products

[![npm version](https://badge.fury.io/js/%40ai-first-ds%2Fcore.svg)](https://www.npmjs.com/package/@ai-first-ds/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/AishwaryShrivastav/AI-First-Design-System/actions/workflows/ci.yml/badge.svg)](https://github.com/AishwaryShrivastav/AI-First-Design-System/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/AishwaryShrivastav/AI-First-Design-System/branch/main/graph/badge.svg)](https://codecov.io/gh/AishwaryShrivastav/AI-First-Design-System)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/code_of_conduct-enforced-ff69b4.svg)](./CODE_OF_CONDUCT.md)

## 🎯 Overview

The AI-First Design System is a modern, framework-agnostic component library designed from the ground up for AI-powered products. Built with Web Components, styled with Tailwind CSS, and following industry-leading accessibility patterns from Radix UI.

**AI-first guarantees**
- **Research-backed:** every prop, slot, and pattern cites trusted guidance (Carbon for AI, Microsoft HAX, SAP Fiori, WAI-ARIA APG, WCAG 2.2). See [`docs/research-sources.md`](./docs/research-sources.md).
- **Tool-friendly:** repo layout, commands, and expectations are optimized for AI coding/design assistants. See [`docs/ai-tooling.md`](./docs/ai-tooling.md).
- **Human-control bias:** defaults favor user overrides, clear AI labels, and explainability.
- **Fast to try:** install, run Storybook, or drop in the CDN build with two commands.

## ✨ Key Features

- **🤖 AI-First by Design** - Purpose-built components for AI interactions, not retrofitted
- **🌐 Framework Agnostic** - Works with React, Vue, Svelte, or vanilla JavaScript
- **♿ Accessible** - WCAG 2.2 compliant, following WAI-ARIA patterns
- **🎨 Customizable** - Extensive theming with Tailwind CSS and CSS custom properties
- **📦 Lightweight** - Tree-shakeable, optimized bundle sizes
- **📚 Well Documented** - Comprehensive Storybook documentation with examples
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

### Try it in 60 seconds

```bash
npm install
npm run storybook
```

Or use the CDN for a zero-install trial:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@ai-first-ds/core@latest"></script>
<ai-chat-message role="ai">Hello! How can I help you today?</ai-chat-message>
```

### Installation (apps)

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

<ai-chat-message role="ai" streaming>
  Hello! How can I help you today?
</ai-chat-message>

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
  <AIChatMessage role="ai" streaming>
    Hello! How can I help you today?
  </AIChatMessage>
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

- [Component Documentation](https://your-storybook-url.com)
- [AI Design Principles](./docs/ai-principles.md)
- [Research-Backed References](./docs/research-sources.md)
- [AI Tooling Guide](./docs/ai-tooling.md)
- [Getting Started](./docs/getting-started.md)
- [Accessibility Guide](./docs/accessibility.md)
- [Theming Guide](./docs/theming.md)
- [Contributing Guide](./CONTRIBUTING.md)

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

- [Website](https://your-website.com)
- [Storybook](https://your-storybook.com)
- [GitHub](https://github.com/yourusername/ai-first-design-system)
- [npm](https://www.npmjs.com/package/@ai-first-ds/core)

