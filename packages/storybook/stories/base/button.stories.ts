import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/base/ai-button';

/**
 * AI-enhanced button component with support for AI-generated actions and confidence indicators.
 *
 * ## Features
 * - Multiple visual variants (primary, secondary, ghost, danger)
 * - AI-generated action indicators with confidence scores
 * - Loading states
 * - Disabled states
 * - Full keyboard accessibility
 *
 * ## Accessibility
 * - Full keyboard support (Enter/Space)
 * - ARIA attributes
 * - Focus management
 * - Screen reader announcements for AI-generated actions
 * - WCAG 2.2 Level AA compliant
 *
 * ## Best Practices
 * - Always use `aiGenerated` prop when the action is AI-suggested
 * - Show confidence levels when available to build user trust
 * - Provide manual alternatives for AI-suggested actions
 * - Use loading state for async operations
 *
 * ## Pitfalls to Avoid
 * - Don't hide AI involvement - transparency builds trust
 * - Don't use AI indicators for non-AI actions
 * - Don't disable buttons without clear feedback
 *
 * ## References
 * - [WCAG 2.2 Button Pattern](https://www.w3.org/WAI/WCAG22/)
 * - [ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * - [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
 * - [Microsoft HAX Guideline #1](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): Transparency
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
      table: {
        type: { summary: "'primary' | 'secondary' | 'ghost' | 'danger'" },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state (useful for async operations)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    aiGenerated: {
      control: 'boolean',
      description: 'Mark as AI-suggested action. Adds visual indicators and confidence display.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'AI confidence level (0-1). Displayed when aiGenerated is true.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
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

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Action Suggestions</h3>
      <p style="margin: 0 0 1.5rem 0; color: #6b7280; font-size: 0.875rem;">
        Based on your recent activity, we suggest:
      </p>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <ai-button variant="primary" aiGenerated confidence="0.92">
          Review Document (92% match)
        </ai-button>
        <ai-button variant="secondary" aiGenerated confidence="0.78">
          Schedule Meeting (78% match)
        </ai-button>
        <ai-button variant="ghost">Manual Action</ai-button>
      </div>
    </div>
  `,
};

export const BestPractices: Story = {
  render: () => html`
    <div style="max-width: 500px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        Best Practices Examples
      </h3>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
            ✓ Good: Clear AI indication with confidence
          </h4>
          <ai-button variant="primary" aiGenerated confidence="0.95">
            AI Suggested: Send Email
          </ai-button>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
            ✓ Good: Loading state for async operations
          </h4>
          <ai-button variant="primary" loading>Processing...</ai-button>
        </div>

        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
            ✓ Good: Manual alternative always available
          </h4>
          <div style="display: flex; gap: 0.5rem;">
            <ai-button variant="primary" aiGenerated confidence="0.88"> AI Suggestion </ai-button>
            <ai-button variant="secondary">Manual Entry</ai-button>
          </div>
        </div>
      </div>
    </div>
  `,
};
