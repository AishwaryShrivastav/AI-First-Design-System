# AI-First Design System – Core Package

The `ai-first-design-system` package contains framework-agnostic Web Components (built with [Lit](https://lit.dev)) that implement AI-forward UI patterns: chat interfaces, prompt workflows, streaming text, confidence meters, badges, etc. All components follow WCAG 2.2 AA accessibility guidelines and expose CSS custom properties for theming.

## Installation

```bash
npm install ai-first-design-system
# or
yarn add ai-first-design-system
```

## Quick Start

```ts
// Load every component (tree-shake friendly)
import 'ai-first-design-system';

// Or import only what you need
import 'ai-first-design-system/components/base/ai-button';
import 'ai-first-design-system/components/ai/ai-chat-message';
```

```html
<ai-button variant="primary" aiGenerated confidence="0.92"> AI Suggested Action </ai-button>

<ai-chat-message role="ai" showActions timestamp="2:31 PM">
  Machine learning is a subset of AI...
</ai-chat-message>
```

### Available Components

| Category    | Elements                                                                                                                                                                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base        | `ai-button`, `ai-input`, `ai-badge`                                                                                                                                                                                                           |
| AI-Specific | `ai-chat-message`, `ai-chat-interface`, `ai-prompt-input`, `ai-prompt-templates`, `ai-streaming-text`, `ai-confidence-meter`, `ai-label`, `ai-skeleton`, `ai-feedback`, `ai-variant-selector`, `ai-explainability-panel`, `ai-error-recovery` |

Each component includes rich JSDoc (slots, props, events, CSS custom properties, accessibility notes) and Storybook stories located under `packages/storybook`.

## Theming & Accessibility

- Customize via CSS variables (e.g., `--ai-button-bg`, `--ai-label-color`).
- All focus states, keyboard interactions, and ARIA semantics ship out of the box.
- Streaming/announcing components (`ai-streaming-text`, `ai-chat-message`) use live regions.

## Local Development

```bash
# Install workspace deps
npm install

# Build the core package
cd packages/core
npm run build

# Run Storybook for interactive docs
cd ../storybook
npm run storybook
```

## Publishing / Versioning

We use semantic versioning. When ready to release:

```bash
# Bump version (patch/minor/major)
npm version patch --workspace=packages/core

# Publish to npm (requires maintainer access)
cd packages/core
npm publish --access public
```

Remember to push tags to GitHub:

```bash
git push origin main --follow-tags
```

## License

MIT © Aishwary Shrivastav
