import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/base/ai-input';

/**
 * AI-enhanced input component with support for suggestions and autocomplete.
 *
 * ## Features
 * - Standard input with validation states
 * - AI-powered inline suggestions (ghost text)
 * - Size variants (small, medium, large)
 * - Prefix and suffix slots for icons/actions
 * - Full keyboard accessibility
 *
 * ## Accessibility
 * - Proper label association (use with external label)
 * - aria-invalid when error
 * - aria-describedby for error messages
 * - Keyboard navigation (Tab to accept suggestion)
 *
 * ## References
 * - [WCAG 2.2 Input Labels](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)
 * - [ARIA Textbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/textbox/)
 * - GitHub Copilot UX patterns for inline suggestions
 * - [IBM Carbon Input Components](https://carbondesignsystem.com/components/text-input/)
 */
const meta: Meta = {
  title: 'Base Components/Input',
  component: 'ai-input',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    aiSuggestions: {
      control: 'boolean',
      description: 'Enable AI-powered suggestions',
    },
    suggestion: {
      control: 'text',
      description: 'Current AI suggestion (ghost text)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  render: args =>
    html`<ai-input
      value=${args.value || ''}
      placeholder=${args.placeholder}
      size=${args.size}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?aiSuggestions=${args.aiSuggestions}
      suggestion=${args.suggestion || ''}
    ></ai-input>`,
};

export const WithValue: Story = {
  args: {
    value: 'Hello, world!',
  },
  render: args => html`<ai-input value=${args.value}></ai-input>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <ai-input size="small" placeholder="Small input"></ai-input>
      <ai-input size="medium" placeholder="Medium input"></ai-input>
      <ai-input size="large" placeholder="Large input"></ai-input>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <ai-input placeholder="Normal state"></ai-input>
      <ai-input placeholder="Error state" error></ai-input>
      <ai-input placeholder="Disabled state" disabled value="Cannot edit"></ai-input>
    </div>
  `,
};

export const WithAISuggestions: Story = {
  args: {
    value: 'What is',
    aiSuggestions: true,
    suggestion: ' machine learning?',
  },
  render: args =>
    html`<ai-input
      value=${args.value}
      ?aiSuggestions=${args.aiSuggestions}
      suggestion=${args.suggestion}
      placeholder="Start typing..."
    ></ai-input>`,
};

export const WithPrefix: Story = {
  render: () => html`
    <ai-input placeholder="Search...">
      <span slot="prefix" style="color: #6b7280;">🔍</span>
    </ai-input>
  `,
};

export const WithSuffix: Story = {
  render: () => html`
    <ai-input placeholder="Enter email..." type="email">
      <span slot="suffix" style="color: #6b7280;">✉️</span>
    </ai-input>
  `,
};

export const WithPrefixAndSuffix: Story = {
  render: () => html`
    <ai-input placeholder="Search..." value="example">
      <span slot="prefix" style="color: #6b7280;">🔍</span>
      <span slot="suffix" style="color: #6b7280; cursor: pointer;">✕</span>
    </ai-input>
  `,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
        Email Address
      </label>
      <ai-input placeholder="you@example.com" type="email" size="medium"></ai-input>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
        We'll never share your email.
      </p>
    </div>
  `,
};

export const AIAutocompleteExample: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
        Ask a question
      </label>
      <ai-input
        value="How do I"
        aiSuggestions
        suggestion=" implement authentication?"
        placeholder="Type your question..."
      ></ai-input>
      <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280;">
        Press Tab to accept suggestion
      </p>
    </div>
  `,
};
