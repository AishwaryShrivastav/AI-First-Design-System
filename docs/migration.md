# Migration Guide

This guide helps you migrate from other design systems to the AI-First Design System.

## From Material-UI / MUI

### Component Mapping

| Material-UI | AI-First DS | Notes |
|-------------|-------------|-------|
| `Button` | `ai-button` | Add `variant` prop |
| `TextField` | `ai-input` | Use `aiSuggestions` for autocomplete |
| `Chip` | `ai-badge` | AI variants available |
| `Skeleton` | `ai-skeleton` | Built-in shimmer animation |

### Example Migration

**Before (Material-UI):**
```tsx
import { Button, TextField } from '@mui/material';

<Button variant="contained" color="primary">
  Click me
</Button>
<TextField label="Input" variant="outlined" />
```

**After (AI-First DS):**
```tsx
import { AIButton, AIInput } from '@ai-first-ds/react';

<AIButton variant="primary">
  Click me
</AIButton>
<AIInput placeholder="Input" />
```

## From Ant Design

### Component Mapping

| Ant Design | AI-First DS | Notes |
|------------|-------------|-------|
| `Button` | `ai-button` | Similar API |
| `Input` | `ai-input` | Add AI features |
| `Badge` | `ai-badge` | Confidence visualization |
| `Message` | `ai-chat-message` | Chat-optimized |

### Example Migration

**Before (Ant Design):**
```tsx
import { Button, Input, Badge } from 'antd';

<Button type="primary">Submit</Button>
<Input placeholder="Enter text" />
<Badge count={5} />
```

**After (AI-First DS):**
```tsx
import { AIButton, AIInput, AIBadge } from '@ai-first-ds/react';

<AIButton variant="primary">Submit</AIButton>
<AIInput placeholder="Enter text" />
<AIBadge variant="info">5</AIBadge>
```

## From Carbon Design System

The AI-First Design System is heavily inspired by Carbon for AI!

### Component Mapping

| Carbon | AI-First DS | Notes |
|--------|-------------|-------|
| `Button` | `ai-button` | Very similar |
| `TextInput` | `ai-input` | Enhanced with AI |
| `ChatMessage` | `ai-chat-message` | Based on Carbon Chat |
| `Tag` | `ai-badge` | Similar concept |

### Migration Notes

Carbon users will feel right at home! We've adopted many Carbon for AI patterns.

**Reference:** [Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)

## From Chakra UI

### Component Mapping

| Chakra UI | AI-First DS | Notes |
|-----------|-------------|-------|
| `Button` | `ai-button` | Use `variant` prop |
| `Input` | `ai-input` | Native web component |
| `Badge` | `ai-badge` | AI enhancements |
| `Skeleton` | `ai-skeleton` | Similar API |

### Theming Migration

**Before (Chakra):**
```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#3b82f6',
    },
  },
});

<ChakraProvider theme={theme}>
  <App />
</ChakraProvider>
```

**After (AI-First DS):**
```css
:root {
  --ai-primary-color: #3b82f6;
}
```

Or with Tailwind:
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3b82f6',
        },
      },
    },
  },
};
```

## Breaking Changes Between Versions

### 0.1.x to 0.2.x (Planned)

Currently in initial release (0.1.x). Future breaking changes will be documented here.

## Migration Strategies

### 1. Gradual Migration (Recommended)

Migrate one component at a time:

```tsx
// Start with one component
import { Button } from 'old-library';
import { AIButton } from '@ai-first-ds/react';

// Mix old and new
<Button>Old Button</Button>
<AIButton>New AI Button</AIButton>

// Gradually replace all buttons
```

### 2. Complete Migration

For new projects or major refactors:

1. Install AI-First DS
2. Remove old design system
3. Update all imports
4. Adjust props/APIs
5. Test thoroughly

### 3. Parallel Usage

Run both systems side-by-side:

```tsx
// Use old system for existing features
import { OldComponent } from 'old-system';

// Use AI-First DS for new AI features
import { AIButton } from '@ai-first-ds/react';
```

## Common Issues

### Issue: Styling Conflicts

**Problem:** Styles from old system conflict with AI-First DS

**Solution:**
```css
/* Scope old system styles */
.old-system {
  /* Old system styles */
}

/* AI-First DS uses Shadow DOM, so conflicts are minimal */
```

### Issue: Different Event Handling

**Problem:** Event names differ between systems

**Solution:**
```tsx
// Old system
<Button onClick={handler} />

// AI-First DS (React)
<AIButton onClick={handler} /> // Same!

// AI-First DS (Vanilla)
document.querySelector('ai-button')
  .addEventListener('click', handler);
```

### Issue: Missing Features

**Problem:** Component you need isn't available yet

**Solution:**
1. Check [ROADMAP.md](../ROADMAP.md) for planned components
2. [Request the feature](https://github.com/AishwaryShrivastav/AI-First-Design-System/issues/new?template=feature_request.yml)
3. Build it yourself and contribute!

## Need Help?

- [GitHub Discussions](https://github.com/AishwaryShrivastav/AI-First-Design-System/discussions)
- [File an issue](https://github.com/AishwaryShrivastav/AI-First-Design-System/issues)
- [View examples](../examples/)

## References

- [Migration Best Practices](https://www.patterns.dev/posts/migration-guide)
- [Design System Migration](https://bradfrost.com/blog/post/design-system-migration-strategies/)

