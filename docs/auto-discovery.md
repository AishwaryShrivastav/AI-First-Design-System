# Auto-Discovery Guide

## How Components Automatically Register

> Understanding the "magic" behind MCP server, Storybook, and component registry integration

---

## Overview

When you create a new component in this design system, it **automatically** becomes available in:

1. **MCP Server** - AI coding assistants (Claude, Cursor, etc.)
2. **Storybook** - Interactive documentation
3. **Component Registry** - Metadata API for programmatic access

**No manual configuration needed!** Just follow the conventions.

---

## How It Works

### The Auto-Discovery Flow

```
Create Component
      ↓
Follow Conventions
      ↓
┌─────────────────┬─────────────────┬─────────────────┐
│                 │                 │                 │
▼                 ▼                 ▼                 ▼
MCP Server    Storybook    Component      TypeScript
Exposes       Finds and    Registry       Autocomplete
via API       Documents    Indexes        Recognizes
```

---

## 1. MCP Server Auto-Discovery

### What is MCP?

**Model Context Protocol** - Enables AI coding assistants to discover and use components.

### How Components Get Exposed

```typescript
// packages/mcp-server/src/index.ts

import { componentRegistry } from '../core/src/metadata/component-registry.js';

// MCP server reads this registry
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: componentRegistry.components.map(/* ... */),
}));
```

**The Magic:**

- MCP server imports `componentRegistry`
- Registry contains all component metadata
- When you add metadata → MCP automatically exposes it

### What AI Tools Get

When an AI assistant queries the MCP server:

```json
{
  "name": "ai-confidence-meter",
  "displayName": "AI Confidence Meter",
  "description": "Visual confidence level display...",
  "properties": [...],
  "events": [...],
  "research": [
    {
      "title": "IBM Carbon for AI (2024)",
      "url": "https://...",
      "type": "design-system"
    }
  ],
  "examples": [...]
}
```

---

## 2. Storybook Auto-Discovery

### Convention-Based Discovery

Storybook automatically finds components that:

1. Follow `ai-*` naming convention
2. Use `@customElement()` decorator
3. Have JSDoc documentation

### How It Works

```typescript
// packages/storybook/.storybook/main.ts

export default {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../core/src/components/**/*.ts', // Scans for components
  ],
  // ...
};
```

**The Magic:**

- Storybook scans `packages/core/src/components/`
- Finds all files with `@customElement('ai-*')`
- Reads JSDoc for descriptions and props
- Auto-generates documentation

### Manual Stories (Optional)

You can create manual stories for more control:

```typescript
// packages/storybook/stories/ai-confidence-meter.stories.ts

import type { Meta, StoryObj } from '@storybook/web-components';
import '../../core/src/components/ai/ai-confidence-meter.js';

const meta: Meta = {
  title: 'AI-Specific/AI Confidence Meter',
  component: 'ai-confidence-meter',
  tags: ['autodocs'],
};

export default meta;
```

---

## 3. Component Registry Auto-Discovery

### The Registry System

```typescript
// packages/core/src/metadata/component-registry.ts

export const componentRegistry: ComponentRegistry = {
  version: '0.2.0',
  generated: new Date().toISOString(),
  components: [
    aiButtonMetadata,
    aiChatMessageMetadata,
    // ... all 15 components
    aiPromptTemplatesMetadata, // ← New components here
    aiVariantSelectorMetadata,
    aiErrorRecoveryMetadata,
    aiConfidenceMeterMetadata,
  ],
};
```

**The Magic:**

- You create metadata file
- Import it in `component-registry.ts`
- Add to `components` array
- Automatically available everywhere

---

## Required Conventions

### 1. Component Naming

**MUST use `ai-*` prefix:**

```typescript
// ✅ CORRECT
@customElement('ai-confidence-meter')
@customElement('ai-prompt-templates')

// ❌ WRONG
@customElement('confidence-meter')  // Missing ai- prefix
@customElement('ConfidenceMeter')   // Wrong format
```

### 2. Component Decorator

**MUST use `@customElement()` from Lit:**

```typescript
import { customElement } from 'lit/decorators.js';

@customElement('ai-my-component')
export class AIMyComponent extends LitElement {
  // ...
}
```

### 3. JSDoc Documentation

**MUST include comprehensive JSDoc:**

````typescript
/**
 * AI Confidence Meter Component
 *
 * Visual display of AI confidence levels to build trust through transparency.
 * Shows probabilistic certainty with clear visual indicators.
 *
 * @element ai-confidence-meter
 *
 * @fires confidence-click - Dispatched when user clicks for details
 *
 * @prop {number} confidence - Confidence level (0-1)
 * @prop {string} label - Optional label
 *
 * @example
 * ```html
 * <ai-confidence-meter confidence="0.95"></ai-confidence-meter>
 * ```
 *
 * @research IBM Carbon for AI (2024) - Confidence visualization
 * @research Microsoft HAX #1 - Make clear what system can do
 */
@customElement('ai-confidence-meter')
export class AIConfidenceMeter extends LitElement {
  // ...
}
````

### 4. Metadata File

**MUST create metadata file:**

```typescript
// packages/core/src/metadata/my-component-metadata.ts

import type { ComponentMetadata } from './types.js';

export const aiMyComponentMetadata: ComponentMetadata = {
  name: 'ai-my-component',
  displayName: 'AI My Component',
  description: 'Clear description',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',

  properties: [
    /* ... */
  ],
  events: [
    /* ... */
  ],
  research: [
    /* REQUIRED: 2+ citations */
  ],
  examples: [
    /* ... */
  ],
  // ... full metadata
};
```

### 5. Registry Import

**MUST import and register:**

```typescript
// packages/core/src/metadata/component-registry.ts

import { aiMyComponentMetadata } from './my-component-metadata.js';

export const componentRegistry: ComponentRegistry = {
  version: '0.2.0',
  components: [
    // ... existing components
    aiMyComponentMetadata, // ← Add here
  ],
};
```

---

## Step-by-Step: Adding a New Component

### Step 1: Create Component File

```bash
# Location
packages/core/src/components/ai/ai-new-component.ts
```

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * AI New Component
 *
 * @element ai-new-component
 * @research [Source 1]
 * @research [Source 2]
 */
@customElement('ai-new-component')
export class AINewComponent extends LitElement {
  @property({ type: String }) variant = 'default';

  static styles = css`
    /* ... */
  `;

  render() {
    return html`<!-- ... -->`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-new-component': AINewComponent;
  }
}
```

### Step 2: Create Metadata File

```bash
# Location
packages/core/src/metadata/new-component-metadata.ts
```

```typescript
import type { ComponentMetadata } from './types.js';

export const aiNewComponentMetadata: ComponentMetadata = {
  name: 'ai-new-component',
  displayName: 'AI New Component',
  description: 'Detailed description',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',
  usageContexts: ['conversational'],

  properties: [
    {
      name: 'variant',
      type: 'string',
      required: false,
      default: 'default',
      description: 'Visual variant',
    },
  ],

  events: [],
  slots: [],
  cssProperties: [],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: [],
    keyboardNavigation: ['Tab', 'Enter'],
    screenReaderNotes: 'Description',
  },

  research: [
    {
      title: 'Source 1 Title',
      url: 'https://...',
      type: 'design-system',
      rationale: 'Why this matters',
    },
    {
      title: 'Source 2 Title',
      url: 'https://...',
      type: 'guideline',
      rationale: 'Supporting evidence',
    },
  ],

  relatedComponents: [],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-new-component></ai-new-component>`,
      description: 'Basic usage',
    },
  ],

  bestPractices: ['Use for...', 'Consider...'],

  pitfalls: ["Don't use for..."],

  tags: ['ai', 'component'],
};
```

### Step 3: Register in Component Registry

```typescript
// packages/core/src/metadata/component-registry.ts

// 1. Add import
import { aiNewComponentMetadata } from './new-component-metadata.js';

// 2. Add to array
export const componentRegistry: ComponentRegistry = {
  version: '0.2.0',
  generated: new Date().toISOString(),
  components: [
    // ... existing
    aiNewComponentMetadata, // ← Add here
  ],
};
```

### Step 4: Verify Auto-Discovery

```bash
# Build MCP server
cd packages/mcp-server && npm run build

# Should compile without errors
# Component now available via MCP API

# Check Storybook
npm run storybook
# Navigate to component - should auto-appear
```

---

## Verification Checklist

After creating a component, verify:

- [ ] **Naming:** Component uses `ai-*` prefix
- [ ] **Decorator:** Has `@customElement('ai-component-name')`
- [ ] **JSDoc:** Comprehensive documentation
- [ ] **Metadata:** Complete metadata file created
- [ ] **Registry:** Imported and added to component registry
- [ ] **Research:** 2+ citations included
- [ ] **Build:** MCP server builds successfully
- [ ] **Storybook:** Component appears in Storybook

---

## Troubleshooting

### Component Not in MCP Server

**Check:**

1. Metadata exported with correct name
2. Imported in `component-registry.ts`
3. Added to `components` array
4. MCP server rebuilt (`npm run build`)

### Component Not in Storybook

**Check:**

1. Component uses `ai-*` prefix
2. Has `@customElement()` decorator
3. File in `packages/core/src/components/`
4. Storybook restarted (`npm run storybook`)

### TypeScript Errors

**Check:**

1. Metadata conforms to `ComponentMetadata` type
2. All required fields present
3. Research citations have valid types
4. UsageContexts use valid enum values

---

## Advanced: Custom MCP Tools

You can add custom MCP tools for components:

```typescript
// packages/mcp-server/src/index.ts

server.setRequestHandler(CallToolRequestSchema, async request => {
  if (request.params.name === 'custom_component_tool') {
    // Custom logic here
    return {
      content: [
        /* ... */
      ],
    };
  }
});
```

---

## Summary

**Auto-Discovery = Following Conventions**

1. **Name:** `ai-*` prefix
2. **Decorator:** `@customElement()`
3. **JSDoc:** Comprehensive docs
4. **Metadata:** Complete ComponentMetadata
5. **Registry:** Import + add to array

**Follow these → Everything else is automatic! ✨**

---

_For detailed component creation workflow, see: `docs/component-creation-guide.md`_
