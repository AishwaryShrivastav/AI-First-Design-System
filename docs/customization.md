# Customization Guide

Learn how to customize the AI-First Design System to match your brand and requirements.

## Theming Approaches

### 1. CSS Custom Properties (Easiest)

Override CSS custom properties in your application:

```css
:root {
  /* Primary Colors */
  --ai-primary-color: #your-brand-color;
  --ai-primary-hover: #your-hover-color;

  /* Typography */
  --ai-font-family: 'Your Font', sans-serif;
  --ai-font-size-base: 16px;

  /* Spacing */
  --ai-spacing-unit: 0.25rem;

  /* Border Radius */
  --ai-border-radius: 0.5rem;
  --ai-border-radius-sm: 0.25rem;
  --ai-border-radius-lg: 0.75rem;

  /* Shadows */
  --ai-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --ai-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* AI-Specific */
  --ai-gradient: linear-gradient(135deg, #your-start 0%, #your-end 100%);
  --ai-confidence-high: #22c55e;
  --ai-confidence-medium: #f59e0b;
  --ai-confidence-low: #ef4444;
}
```

### 2. Tailwind Configuration

Extend our Tailwind config:

```javascript
// tailwind.config.js
import baseConfig from '@ai-first-ds/tokens/tailwind';

export default {
  ...baseConfig,
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@ai-first-ds/**/*.js'],
  theme: {
    extend: {
      ...baseConfig.theme.extend,
      colors: {
        ...baseConfig.theme.extend.colors,
        primary: {
          // Your custom primary color scale
          500: '#your-brand-color',
        },
      },
      fontFamily: {
        sans: ['Your Font', ...baseConfig.theme.extend.fontFamily.sans],
      },
    },
  },
};
```

**Reference:** [Tailwind Configuration](https://tailwindcss.com/docs/configuration)

### 3. Design Tokens

Import and customize design tokens:

```typescript
import { colors, typography, spacing } from '@ai-first-ds/tokens';

// Use tokens in your styles
const customTheme = {
  primary: '#your-color',
  fontFamily: 'Your Font, ' + typography.families.sans,
  spacing: spacing[4],
};
```

## Component-Level Customization

### Using CSS Parts

Components expose CSS parts for deep customization:

```css
/* Target specific parts of a component */
ai-button::part(button) {
  background: linear-gradient(to right, #ff6b6b, #ff8e53);
  border-radius: 2rem;
  padding: 1rem 2rem;
}

ai-chat-message::part(bubble) {
  background: #f0f0f0;
  border-radius: 1rem;
}

ai-prompt-input::part(input) {
  font-family: 'Comic Sans MS', cursive;
}
```

**Reference:** [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)

### Using Slots

Components provide slots for custom content:

```html
<ai-button>
  <span slot="prefix">🚀</span>
  Launch AI
  <span slot="suffix">✨</span>
</ai-button>

<ai-chat-message role="ai" showActions>
  AI response here...
  <div slot="actions">
    <button>Custom Action</button>
  </div>
</ai-chat-message>
```

## Brand Customization Examples

### Example 1: Corporate Blue Theme

```css
:root {
  --ai-primary-color: #0066cc;
  --ai-gradient: linear-gradient(135deg, #0066cc 0%, #004c99 100%);
  --ai-border-radius: 0.25rem;
  --ai-font-family: 'Arial', sans-serif;
}
```

### Example 2: Playful Purple Theme

```css
:root {
  --ai-primary-color: #9333ea;
  --ai-gradient: linear-gradient(135deg, #9333ea 0%, #db2777 100%);
  --ai-border-radius: 1rem;
  --ai-font-family: 'Poppins', sans-serif;
}

ai-button::part(button) {
  box-shadow: 0 4px 14px 0 rgba(147, 51, 234, 0.39);
}
```

### Example 3: Minimal Theme

```css
:root {
  --ai-primary-color: #000000;
  --ai-gradient: linear-gradient(135deg, #000000 0%, #434343 100%);
  --ai-border-radius: 0;
  --ai-shadow-sm: none;
  --ai-shadow-md: none;
}

ai-button::part(button) {
  border: 2px solid currentColor;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Dark Mode

### Automatic Dark Mode

The design system respects `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --ai-text-primary: #f9fafb;
    --ai-text-secondary: #d1d5db;
    --ai-bg-primary: #111827;
    --ai-bg-secondary: #1f2937;
    --ai-border-default: #374151;
  }
}
```

### Manual Dark Mode Toggle

```javascript
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// CSS
:root[data-theme='dark'] {
  --ai-text-primary: #f9fafb;
  --ai-bg-primary: #111827;
  /* ... */
}
```

## AI Visual Identity Customization

### AI Gradient

Customize the signature AI gradient:

```css
:root {
  --ai-gradient: linear-gradient(135deg, #your-start-color 0%, #your-end-color 100%);
}
```

### Confidence Colors

Customize confidence level colors:

```css
:root {
  --ai-confidence-high: #your-green;
  --ai-confidence-medium: #your-orange;
  --ai-confidence-low: #your-red;
}
```

### AI Animations

Customize AI-specific animations:

```css
ai-label::part(label) {
  animation: your-custom-animation 2s infinite;
}

@keyframes your-custom-animation {
  /* Your animation */
}
```

## Typography Customization

### Custom Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');

:root {
  --ai-font-family: 'Your Font', sans-serif;
  --ai-font-mono: 'Your Mono Font', monospace;
}
```

### Font Scales

```css
:root {
  --ai-text-xs: 0.75rem;
  --ai-text-sm: 0.875rem;
  --ai-text-base: 1rem;
  --ai-text-lg: 1.125rem;
  --ai-text-xl: 1.25rem;
}
```

## Component Variants

### Creating Custom Variants

```typescript
// Extend component with custom variant
import { AIButton } from '@ai-first-ds/react';

const CustomButton = styled(AIButton)`
  &[variant='custom'] {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    font-weight: bold;
  }
`;

// Use it
<CustomButton variant="custom">Custom Style</CustomButton>;
```

## Responsive Customization

```css
/* Mobile-first approach */
:root {
  --ai-spacing-unit: 0.25rem;
}

@media (min-width: 768px) {
  :root {
    --ai-spacing-unit: 0.5rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --ai-spacing-unit: 1rem;
  }
}
```

## Advanced Customization

### Shadow DOM Styling

For deep customization, use CSS parts:

```css
/* Style specific parts of components */
ai-chat-interface::part(header) {
  background: your-custom-gradient;
}

ai-chat-interface::part(messages) {
  background-image: url('your-background.png');
}

ai-chat-interface::part(input) {
  border: 2px solid your-color;
}
```

### Custom Themes with JavaScript

```javascript
const themes = {
  corporate: {
    primary: '#0066cc',
    gradient: 'linear-gradient(135deg, #0066cc 0%, #004c99 100%)',
    radius: '0.25rem',
  },
  playful: {
    primary: '#9333ea',
    gradient: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
    radius: '1rem',
  },
};

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(themes[theme]).forEach(([key, value]) => {
    root.style.setProperty(`--ai-${key}`, value);
  });
}

// Apply theme
applyTheme('corporate');
```

## Best Practices

### Do's ✅

- Start with CSS custom properties
- Use Tailwind for rapid iteration
- Test customizations in both light and dark modes
- Maintain accessibility when customizing
- Document your custom theme

### Don'ts ❌

- Don't override internal component styles directly
- Don't break accessibility for aesthetics
- Don't ignore color contrast requirements
- Don't hardcode colors without dark mode consideration

## Examples

See the [`examples/`](../examples/) directory for:

- Vanilla JavaScript customization
- React app with theming
- Dark mode implementation
- Brand-specific themes

## Need Help?

- [GitHub Discussions](https://github.com/AishwaryShrivastav/AI-First-Design-System/discussions)
- [Customization Examples](../examples/)
- [Design Tokens Reference](https://github.com/AishwaryShrivastav/AI-First-Design-System/tree/main/packages/tokens)

## References

- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [Design Tokens Specification](https://www.w3.org/community/design-tokens/)
- [Tailwind Customization](https://tailwindcss.com/docs/theme)
