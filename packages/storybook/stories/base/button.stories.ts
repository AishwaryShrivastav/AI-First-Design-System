import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/base/ai-button';

/**
 * AI-enhanced button component with support for AI-generated actions and confidence indicators.
 *
 * ## Accessibility
 * - Full keyboard support (Enter/Space)
 * - ARIA attributes
 * - Focus management
 *
 * ## References
 * - [WCAG 2.2 Button Pattern](https://www.w3.org/WAI/WCAG22/)
 * - [ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * - [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
 */
const meta: Meta = {
  title: 'Base Components/Button',
  component: 'ai-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual variant of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    aiGenerated: {
      control: 'boolean',
      description: 'Mark as AI-suggested action',
    },
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'AI confidence level (0-1)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: args =>
    html`<ai-button
      variant=${args.variant}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?aiGenerated=${args.aiGenerated}
      confidence=${args.confidence}
    >
      Click me
    </ai-button>`,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: args => html`<ai-button variant=${args.variant}>Secondary Button</ai-button>`,
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: args => html`<ai-button variant=${args.variant}>Ghost Button</ai-button>`,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: args => html`<ai-button variant=${args.variant}>Delete</ai-button>`,
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => html`<ai-button ?loading=${args.loading}>Processing...</ai-button>`,
};

export const AIGenerated: Story = {
  args: {
    aiGenerated: true,
    confidence: 0.95,
  },
  render: args =>
    html`<ai-button ?aiGenerated=${args.aiGenerated} confidence=${args.confidence}>
      AI Suggested Action
    </ai-button>`,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <ai-button variant="primary">Primary</ai-button>
      <ai-button variant="secondary">Secondary</ai-button>
      <ai-button variant="ghost">Ghost</ai-button>
      <ai-button variant="danger">Danger</ai-button>
      <ai-button loading>Loading</ai-button>
      <ai-button disabled>Disabled</ai-button>
      <ai-button aiGenerated confidence="0.95">AI Suggested (95%)</ai-button>
    </div>
  `,
};
