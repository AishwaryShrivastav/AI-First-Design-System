# Contributing to AI-First Design System

Thank you for your interest in contributing! This guide will help you get started.

## 🎯 Design Principles

All contributions must adhere to our core AI-first design principles:

1. **Transparency** - Users must know when AI is involved
   - Reference: [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)

2. **Explainability** - AI decisions should be understandable
   - Reference: [SAP Fiori Explainable AI](https://experience.sap.com/fiori-design-web/explainable-ai/)

3. **Human-Centered** - AI enhances, doesn't replace
   - Reference: [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)

4. **Contextual Assistance** - Help when and where needed
   - Reference: [Emplifi Soul Design System](https://soul.emplifi.io/)

5. **User Control** - Users can override AI
   - Reference: [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)

## 📋 Requirements

**Version**: 0.2.0  
**Components**: 15

Every component and contribution must include:

1. **Accessibility** - WCAG 2.2 Level AA compliance
   - Reference: [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

2. **Documentation** - Clear API docs and usage examples
   - Component API documentation
   - Accessibility notes
   - Usage examples (vanilla, React, Vue)
   - Best practices
   - AI-specific considerations
   - Design rationale with references to trusted sources

3. **Tests** - Comprehensive test coverage
   - Unit tests (Vitest)
   - Visual regression tests
   - Accessibility tests (axe-core)
   - E2E tests for complex interactions

4. **Type Safety** - Full TypeScript support
   - Proper type definitions
   - JSDoc comments
   - IntelliSense support

## 🚀 Getting Started

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-first-design-system.git
cd ai-first-design-system

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test

# Start Storybook
npm run storybook
```

### Project Structure

```
ai-first-design-system/
├── packages/
│   ├── core/          # Web Components
│   ├── react/         # React wrappers
│   ├── vue/           # Vue wrappers
│   ├── svelte/        # Svelte wrappers
│   ├── tokens/        # Design tokens
│   ├── icons/         # Icon library
│   └── storybook/     # Documentation
├── docs/              # Additional documentation
└── examples/          # Example applications
```

## 🧩 Adding a New Component

### 1. Create the Web Component

Create a new file in `packages/core/src/components/`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * AI-aware button component
 *
 * @element ai-button
 *
 * @prop {string} variant - Button variant (primary, secondary, ghost)
 * @prop {boolean} loading - Show loading state
 * @prop {boolean} aiGenerated - Mark as AI-generated action
 * @prop {number} confidence - AI confidence level (0-1)
 *
 * @slot - Button content
 *
 * @fires click - Emitted when button is clicked
 *
 * @cssprop --ai-button-bg - Background color
 * @cssprop --ai-button-text - Text color
 *
 * @accessibility
 * - Keyboard accessible (Enter/Space)
 * - Screen reader support
 * - ARIA attributes
 *
 * @reference
 * - WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
 * - ARIA Button: https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
@customElement('ai-button')
export class AIButton extends LitElement {
  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) aiGenerated = false;
  @property({ type: Number }) confidence?: number;

  static styles = css`
    :host {
      display: inline-block;
    }
    /* Add styles */
  `;

  render() {
    return html`
      <button
        part="button"
        class="ai-button"
        ?disabled=${this.loading}
        aria-busy=${this.loading}
        aria-label=${this.aiGenerated ? 'AI-generated action' : undefined}
      >
        <slot></slot>
      </button>
    `;
  }
}
```

### 2. Add Tests

Create `packages/core/src/components/ai-button.test.ts`:

```typescript
import { fixture, expect, html } from '@open-wc/testing';
import { AIButton } from './ai-button';

describe('AIButton', () => {
  it('renders correctly', async () => {
    const el = await fixture<AIButton>(html`<ai-button>Click me</ai-button>`);
    expect(el).to.exist;
  });

  it('is accessible', async () => {
    const el = await fixture<AIButton>(html`<ai-button>Click me</ai-button>`);
    await expect(el).to.be.accessible();
  });

  // More tests...
});
```

### 3. Add Stories

Create `packages/storybook/stories/ai-button.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai-button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'ai-button',
  tags: ['autodocs'],
};

export default meta;

export const Primary: StoryObj = {
  render: () => html`<ai-button variant="primary">Click me</ai-button>`,
};

export const AIGenerated: StoryObj = {
  render: () => html` <ai-button aiGenerated confidence="0.95"> AI Suggested Action </ai-button> `,
};
```

### 4. Add Storybook Story

Create a comprehensive Storybook story following our standards:

**Location**: `packages/storybook/stories/[category]/[component-name].stories.ts`

**Requirements**:

- Use the template at `packages/storybook/.storybook/templates/story.template.ts`
- Include all props in argTypes with proper controls
- Create multiple story variants (Default, Variants, States, AllVariants, RealWorldExample, BestPractices)
- Add comprehensive JSDoc with accessibility info, best practices, and research references
- Follow the [Storybook Guide](./packages/storybook/STORYBOOK_GUIDE.md) for complete standards

**Example**:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/base/ai-button';

const meta: Meta = {
  title: 'Base Components/Button',
  component: 'ai-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual variant',
    },
    // ... more argTypes
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: args => html`<ai-button variant=${args.variant}>Click me</ai-button>`,
};
```

### 5. Add Documentation

Add MDX documentation in `packages/storybook/docs/` (optional):

```mdx
# Button Component

## Overview

The Button component is an AI-enhanced button that supports...

## Accessibility

- Keyboard navigation
- Screen reader support
- ARIA attributes

References:

- [WCAG 2.2 Button](https://www.w3.org/WAI/WCAG22/...)
- [ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Usage

### Vanilla JavaScript

\`\`\`html
<ai-button>Click me</ai-button>
\`\`\`

### React

\`\`\`jsx
import { AIButton } from '@ai-first-ds/react';

<AIButton>Click me</AIButton>
\`\`\`
```

## 📝 Documentation Standards

All code and decisions must be backed by trusted sources:

- Link to W3C specifications
- Reference ARIA patterns
- Cite design system precedents (Carbon, PatternFly, etc.)
- Include accessibility guidelines
- Document AI-specific considerations

## ✅ Pull Request Checklist

- [ ] Code follows project conventions
- [ ] All tests pass (`npm test`)
- [ ] Accessibility tests pass
- [ ] Documentation is complete
- [ ] Storybook stories added (see [Storybook Guide](./packages/storybook/STORYBOOK_GUIDE.md))
- [ ] Design rationale with references included
- [ ] TypeScript types are correct
- [ ] No linting errors
- [ ] Changeset added (for version bumps)

## 🐛 Reporting Issues

When reporting issues, please include:

1. Component name and version
2. Framework (if applicable)
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots or code examples

## 💬 Questions?

- Open a [GitHub Discussion](https://github.com/yourusername/ai-first-design-system/discussions)
- Join our [Discord](https://discord.gg/your-invite)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
