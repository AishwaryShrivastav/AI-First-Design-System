# Getting Started

Welcome to the AI-First Design System! This guide will help you get up and running quickly.

## Installation

### Package Manager

Install the core package and optionally framework-specific wrappers:

```bash
# Core components (framework-agnostic)
npm install @ai-first-ds/core

# React wrappers
npm install @ai-first-ds/react

# Design tokens
npm install @ai-first-ds/tokens

# Icons (optional)
npm install @ai-first-ds/icons
```

### CDN

For quick prototyping, you can use our CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@ai-first-ds/core@latest"></script>
```

## Quick Start

### Vanilla JavaScript / Web Components

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI-First Design System</title>
  </head>
  <body>
    <ai-button variant="primary">Click me</ai-button>
    <ai-chat-message role="ai">Hello! How can I help you today?</ai-chat-message>

    <script type="module">
      import '@ai-first-ds/core';

      const button = document.querySelector('ai-button');
      button.addEventListener('click', () => {
        console.log('Button clicked!');
      });
    </script>
  </body>
</html>
```

### React

```tsx
import { AIButton, AIChatMessage } from '@ai-first-ds/react';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <AIButton variant="primary" onClick={handleClick}>
        Click me
      </AIButton>
      <AIChatMessage role="ai">Hello! How can I help you today?</AIChatMessage>
    </div>
  );
}

export default App;
```

### Next.js

For Next.js 13+ with App Router, you need to handle client-side rendering:

```tsx
// components/AIComponents.tsx
'use client';

export { AIButton, AIChatMessage, AIPromptInput } from '@ai-first-ds/react';
```

```tsx
// app/page.tsx
import { AIButton, AIChatMessage } from '@/components/AIComponents';

export default function Home() {
  return (
    <main>
      <AIButton variant="primary">Click me</AIButton>
      <AIChatMessage role="ai">Hello from AI!</AIChatMessage>
    </main>
  );
}
```

## Theming

### CSS Custom Properties

Customize the design system by overriding CSS custom properties:

```css
:root {
  /* Primary colors */
  --ai-primary-color: #3b82f6;

  /* Fonts */
  --ai-font-family: 'Inter', sans-serif;

  /* Spacing */
  --ai-spacing-unit: 0.25rem;

  /* Border radius */
  --ai-border-radius: 0.375rem;

  /* Shadows */
  --ai-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
```

### Tailwind CSS

If you're using Tailwind CSS, extend with our configuration:

```js
// tailwind.config.js
import baseConfig from '@ai-first-ds/tokens/tailwind';

export default {
  ...baseConfig,
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@ai-first-ds/**/*.js'],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      // Your custom theme extensions
    },
  },
};
```

## TypeScript Support

All packages include full TypeScript definitions:

```typescript
import type { ButtonVariant, AIRole, Confidence } from '@ai-first-ds/core';

const variant: ButtonVariant = 'primary';
const role: AIRole = 'ai';
const confidence: Confidence = 0.95;
```

## Browser Support

The design system supports all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

For older browsers, consider using polyfills:

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

## Next Steps

- **[Component Documentation](./components.md)** - Explore all available components
- **[AI Design Principles](./ai-principles.md)** - Learn about AI-first design
- **[Customization Guide](./customization.md)** - Deep dive into theming
- **[Accessibility](./accessibility.md)** - Learn about accessibility features
- **[Examples](./examples.md)** - See real-world usage examples

## Need Help?

- [GitHub Issues](https://github.com/yourusername/ai-first-design-system/issues)
- [Discussions](https://github.com/yourusername/ai-first-design-system/discussions)
- [Discord Community](https://discord.gg/your-invite)

## References

This design system is built on research and best practices from:

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
- [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)
- [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
