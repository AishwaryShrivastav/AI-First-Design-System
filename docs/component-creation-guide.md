# Component Creation Guide

## Complete Workflow for Adding New Components

> Step-by-step guide to creating research-backed, auto-discoverable components

---

## Overview

This guide walks you through creating a new component from scratch, ensuring it meets all quality standards and auto-discovers in MCP server, Storybook, and the component registry.

**Time estimate:** 2-4 hours for a complete component

---

## Prerequisites

```bash
# Ensure you have the repo cloned and dependencies installed
git clone https://github.com/AishwaryShrivastav/AI-First-Design-System.git
cd AI-First-Design-System
npm install

# Start development mode
npm run dev

# In another terminal, start Storybook
npm run storybook
```

---

## Step 1: Research & Planning (30-60 min)

### 1.1 Find Research

**Required:** 2+ citations from 2023-2025

Check these sources first:

- [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/) (2024)
- [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
- [Google AI UX Patterns](https://material.io/blog/ai-design-patterns) (2024)

See [`docs/research-requirements.md`](./research-requirements.md) for details.

### 1.2 Define Component Scope

Answer these questions:

- **What problem does it solve?**
- **Who is the target user?**
- **What are the key interactions?**
- **What research supports this pattern?**
- **How does it fit with existing components?**

### 1.3 Choose Component Name

**Format:** `ai-{descriptive-name}`

Examples:

- ✅ `ai-confidence-meter`
- ✅ `ai-prompt-templates`
- ✅ `ai-error-recovery`
- ❌ `confidence-meter` (missing `ai-` prefix)
- ❌ `ai-component` (too generic)

---

## Step 2: Create Component File (60-90 min)

### 2.1 File Location

```
packages/core/src/components/ai/ai-{component-name}.ts
```

### 2.2 Component Template

````typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * [Component Display Name]
 *
 * [Detailed description of what this component does and when to use it]
 *
 * @element ai-{component-name}
 *
 * @fires {event-name} - Dispatched when [event occurs]
 *
 * @prop {type} propName - Description of prop
 *
 * @slot - Default slot description
 * @slot slotName - Named slot description
 *
 * @csspart partName - Exposed shadow part
 *
 * @cssprop --custom-property - Description
 *
 * @example
 * ```html
 * <ai-{component-name}
 *   prop="value"
 * ></ai-{component-name}>
 * ```
 *
 * @accessibility
 * - WCAG AA compliant
 * - Keyboard navigable
 * - Screen reader accessible
 *
 * @research
 * - [Source 1 Name] ([Year]): [URL]
 * - [Source 2 Name] ([Year]): [URL]
 */
@customElement('ai-{component-name}')
export class AI{ComponentName} extends LitElement {
  /**
   * [Property description]
   */
  @property({ type: String }) variant: 'default' | 'primary' = 'default';

  /**
   * [Internal state description]
   */
  @state() private _internalState = false;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    /* Component-specific styles */
    .container {
      /* styles */
    }
  `;

  /**
   * [Lifecycle or custom method description]
   */
  private _handleEvent() {
    this.dispatchEvent(new CustomEvent('event-name', {
      bubbles: true,
      composed: true,
      detail: { /* ... */ },
    }));
  }

  render() {
    return html`
      <div class="container" part="container">
        <!-- Component template -->
        <slot></slot>
      </div>
    `;
  }
}

// TypeScript declaration for autocomplete
declare global {
  interface HTMLElementTagNameMap {
    'ai-{component-name}': AI{ComponentName};
  }
}
````

### 2.3 Key Implementation Points

**Accessibility:**

```typescript
// ARIA attributes
aria-label=${this.label || 'Default label'}
role="button"
tabindex="0"

// Keyboard handling
@keydown=${this._handleKeyDown}

private _handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this._handleClick();
  }
}
```

**Events:**

```typescript
this.dispatchEvent(
  new CustomEvent('my-event', {
    bubbles: true, // Bubbles through DOM
    composed: true, // Crosses shadow boundaries
    detail: { data }, // Event payload
  })
);
```

**Styling:**

```typescript
static styles = css`
  /* Use CSS custom properties for theming */
  :host {
    --component-bg: var(--ai-bg-primary, #ffffff);
    background: var(--component-bg);
  }

  /* Expose parts for external styling */
  .button {
    /* styles */
  }
`;

// In template
html`<button part="button">...</button>`;
```

---

## Step 3: Create Tests (30-45 min)

### 3.1 Test File Location

```
packages/core/src/components/ai/ai-{component-name}.test.ts
```

### 3.2 Test Template

```typescript
import { expect, test, describe } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ai-{component-name}.js';

describe('AI{ComponentName}', () => {
  test('renders correctly', async () => {
    const el = await fixture(html` <ai-{component-name}></ai-{component-name}> `);

    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  test('accepts properties', async () => {
    const el = await fixture(html` <ai-{component-name} variant="primary"></ai-{component-name}> `);

    expect(el.variant).toBe('primary');
  });

  test('emits events', async () => {
    const el = await fixture(html` <ai-{component-name}></ai-{component-name}> `);

    const eventPromise = new Promise(resolve => {
      el.addEventListener('event-name', e => resolve(e.detail));
    });

    // Trigger event
    el.shadowRoot.querySelector('button')?.click();

    const detail = await eventPromise;
    expect(detail).toBeDefined();
  });

  test('is accessible', async () => {
    const el = await fixture(html` <ai-{component-name}></ai-{component-name}> `);

    //await expect(el).to.be.accessible();
  });

  test('handles keyboard navigation', async () => {
    const el = await fixture(html` <ai-{component-name}></ai-{component-name}> `);

    const button = el.shadowRoot.querySelector('button');

    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    button?.dispatchEvent(enterEvent);

    // Assert expected behavior
  });
});
```

---

## Step 4: Create Metadata (45-60 min)

### 4.1 Metadata File Location

```
packages/core/src/metadata/ai-{component-name}-metadata.ts
```

### 4.2 Metadata Template

```typescript
import type { ComponentMetadata } from './types.js';

/**
 * [Component Name] metadata
 */
export const ai{ComponentName}Metadata: ComponentMetadata = {
  name: 'ai-{component-name}',
  displayName: '[Component Display Name]',
  description: '[Detailed description of component purpose and usage]',
  category: 'ai-specific', // or 'base'
  status: 'stable', // or 'experimental', 'deprecated'
  since: '0.2.0', // Version when introduced
  usageContexts: ['conversational'], // See UsageContext type

  properties: [
    {
      name: 'variant',
      type: "'default' | 'primary'",
      required: false,
      default: 'default',
      description: 'Visual variant of the component',
      examples: ['default', 'primary'],
    },
    // ... more properties
  ],

  events: [
    {
      name: 'event-name',
      description: 'Fired when [event occurs]',
      detailType: '{ data: string }',
    },
    // ... more events
  ],

  slots: [
    {
      name: '', // Default slot
      description: 'Default content slot',
    },
    // ... more slots
  ],

  cssProperties: [
    {
      name: '--component-bg',
      description: 'Background color',
      default: '#ffffff',
    },
    // ... more CSS properties
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['button'], // or other roles
    keyboardNavigation: ['Tab', 'Enter', 'Space'],
    screenReaderNotes: 'Announces [what screen reader says]',
  },

  // CRITICAL: 2+ research citations required
  research: [
    {
      title: '[Source 1 Full Title with Year]',
      url: 'https://...',
      type: 'design-system', // or 'guideline', 'paper', 'specification'
      rationale: '[Why this research matters for this component. Be specific about what pattern or finding supports the design.]',
    },
    {
      title: '[Source 2 Full Title with Year]',
      url: 'https://...',
      type: 'guideline',
      rationale: '[Additional supporting evidence and how it applies.]',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-related-component',
      relationship: 'complement', // or 'alternative', 'parent', 'child'
      description: 'How this relates',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-{component-name}
  variant="primary"
></ai-{component-name}>`,
      description: 'Basic usage',
    },
    {
      framework: 'react',
      code: `import { AI{ComponentName} } from '@ai-first-ds/react';

function App() {
  return (
    <AI{ComponentName}
      variant="primary"
      onEventName={(e) => console.log(e.detail)}
    />
  );
}`,
      description: 'React integration',
    },
  ],

  bestPractices: [
    'Use [component] when [scenario]',
    'Consider [alternative] for [different scenario]',
    'Always provide [required prop/slot]',
    'Ensure [accessibility consideration]',
  ],

  pitfalls: [
    "Don't use [component] for [wrong scenario]",
    "Don't forget [critical prop]",
    "Avoid [common mistake]",
  ],

  tags: ['ai', 'component', 'relevant', 'keywords'],
};
```

---

## Step 5: Register Component (10 min)

### 5.1 Import Metadata

```typescript
// packages/core/src/metadata/component-registry.ts

// Add import at top
import { ai{ComponentName}Metadata } from './ai-{component-name}-metadata.js';
```

### 5.2 Add to Registry

```typescript
// packages/core/src/metadata/component-registry.ts

export const componentRegistry: ComponentRegistry = {
  version: '0.2.0', // or next version
  generated: new Date().toISOString(),
  components: [
    // ... existing components
    ai{ComponentName}Metadata, // Add here
  ],
  tokens: [],
};
```

---

## Step 6: Update Documentation (15-20 min)

### 6.1 Update Component Index

```markdown
<!-- .ai/component-index.md -->

### [Category Name]

- **ai-{component-name}** - [Brief description]
  - Research: [Source 1], [Source 2]
  - Since: v0.2.0
```

### 6.2 Create Storybook Story (Optional)

```typescript
// packages/storybook/stories/ai-{component-name}.stories.ts

import type { Meta, StoryObj } from '@storybook/web-components';
import '../../core/src/components/ai/ai-{component-name}.js';

const meta: Meta = {
  title: 'AI-Specific/AI {Component Name}',
  component: 'ai-{component-name}',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
```

---

## Step 7: Build & Verify (15 min)

### 7.1 Build All Packages

```bash
# Build core package
cd packages/core && npm run build

# Build MCP server
cd ../mcp-server && npm run build

# Should complete without errors
```

### 7.2 Run Tests

```bash
# From root
npm test

# Run specific test
npm test packages/core/src/components/ai/ai-{component-name}.test.ts
```

### 7.3 Verify Storybook

```bash
npm run storybook

# Navigate to your component
# Should appear under AI-Specific category
```

### 7.4 Verify MCP Server

```bash
cd packages/mcp-server && npm run build

# Check for your component in dist/
# Should compile without errors
```

---

## Step 8: Quality Checklist

Before submitting PR, verify:

### Component Implementation

- [ ] Uses `ai-*` naming convention
- [ ] Has `@customElement()` decorator
- [ ] Comprehensive JSDoc documentation
- [ ] TypeScript strict mode compliant
- [ ] Accessible (WCAG AA)
- [ ] Keyboard navigable
- [ ] Emits semantic events
- [ ] Uses CSS custom properties for theming

### Testing

- [ ] Unit tests written
- [ ] Accessibility tests included
- [ ] Event tests included
- [ ] All tests pass

### Metadata

- [ ] Complete ComponentMetadata created
- [ ] 2+ research citations (2023-2025)
- [ ] Rationale for each citation
- [ ] Usage examples (vanilla + React)
- [ ] Best practices listed
- [ ] Pitfalls documented
- [ ] Tags for searchability

### Auto-Discovery

- [ ] Metadata imported in component-registry.ts
- [ ] Added to components array
- [ ] MCP server builds successfully
- [ ] Storybook shows component
- [ ] Component index updated

### Documentation

- [ ] `.ai/component-index.md` updated
- [ ] Storybook story created (optional)
- [ ] Examples are accurate
- [ ] Research is properly cited

---

## Common Issues & Solutions

### Issue: TypeScript errors in metadata

**Solution:** Ensure metadata conforms to ComponentMetadata type:

```bash
npm run typecheck
# Fix reported issues
```

### Issue: Component not in Storybook

**Solution:** Check:

1. Component uses `ai-*` prefix
2. Has `@customElement()` decorator
3. Storybook restarted
4. No syntax errors in component

### Issue: MCP server build fails

**Solution:** Check:

1. Metadata exported correctly
2. Imported in component-registry.ts
3. Research types are valid
4. UsageContexts use valid enum values

### Issue: Tests failing

**Solution:**

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Check for:
# - Incorrect element names
# - Missing await for fixture
# - Event name mismatches
```

---

## Advanced Topics

### Custom CSS Properties

```typescript
static styles = css`
  :host {
    /* Expose CSS variables */
    --component-padding: var(--spacing-4, 1rem);
    --component-bg: var(--color-background, #fff);

    padding: var(--component-padding);
    background: var(--component-bg);
  }
`;
```

### Shadow Parts

```typescript
// Expose parts for external styling
render() {
  return html`
    <div part="container">
      <button part="button">Click</button>
    </div>
  `;
}
```

External styling:

```css
ai-component::part(button) {
  color: red;
}
```

### Reactive Properties

```typescript
@property({ type: String })
set value(val: string) {
  const oldVal = this._value;
  this._value = val;
  this.requestUpdate('value', oldVal);
  this._validate();
}
get value() {
  return this._value;
}
private _value = '';
```

---

## Summary

**Component Creation Workflow:**

1. ✅ Research (2+ citations, 2023-2025)
2. ✅ Create component file (`ai-*` naming)
3. ✅ Write tests (unit + accessibility)
4. ✅ Create metadata (complete ComponentMetadata)
5. ✅ Register (import + add to registry)
6. ✅ Document (update component index)
7. ✅ Build & verify (all packages)
8. ✅ Quality check (complete checklist)

**Follow this workflow → Research-backed, auto-discoverable component! 🎉**

---

_See also:_

- [Auto-Discovery Guide](./auto-discovery.md)
- [Research Requirements](./research-requirements.md)
- [Agent Onboarding](../.ai/agent-onboarding.md)
