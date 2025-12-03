import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-feedback';

/**
 * AI feedback component for collecting user feedback on AI outputs.
 *
 * ## Features
 * - Simple thumbs up/down feedback
 * - Detailed feedback form with comments
 * - Inline and block layouts
 * - Submission handling
 * - User-friendly interface
 *
 * ## Accessibility
 * - Keyboard accessible
 * - ARIA labels
 * - Focus management
 *
 * ## References
 * - [Microsoft HAX Guideline #13](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
 * - [PatternFly AI Guidelines](https://www.patternfly.org/patternfly-ai/ai-guidelines/)
 * - [WCAG 2.2 Feedback Mechanisms](https://www.w3.org/WAI/WCAG22/Understanding/help)
 */
const meta: Meta = {
  title: 'AI Components/Feedback',
  component: 'ai-feedback',
  tags: ['autodocs'],
  argTypes: {
    simple: {
      control: 'boolean',
      description: 'Show simple thumbs up/down only',
    },
    detailed: {
      control: 'boolean',
      description: 'Show detailed feedback form',
    },
    inline: {
      control: 'boolean',
      description: 'Inline layout',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    simple: false,
    detailed: false,
  },
  render: args =>
    html`<ai-feedback
      ?simple=${args.simple}
      ?detailed=${args.detailed}
      ?inline=${args.inline}
    ></ai-feedback>`,
};

export const Simple: Story = {
  args: {
    simple: true,
  },
  render: args => html`<ai-feedback ?simple=${args.simple}></ai-feedback>`,
};

export const Detailed: Story = {
  args: {
    detailed: true,
  },
  render: args => html`<ai-feedback ?detailed=${args.detailed}></ai-feedback>`,
};

export const Inline: Story = {
  args: {
    simple: true,
    inline: true,
  },
  render: args => html`<ai-feedback ?simple=${args.simple} ?inline=${args.inline}></ai-feedback>`,
};

export const InChatMessage: Story = {
  render: () => html`
    <div
      style="max-width: 500px; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;"
    >
      <div
        style="background: white; padding: 1rem; border-radius: 0.375rem; margin-bottom: 0.75rem;"
      >
        <p style="margin: 0; line-height: 1.6;">
          This is an AI-generated response. Was this helpful?
        </p>
      </div>
      <ai-feedback simple inline></ai-feedback>
    </div>
  `,
};

export const DetailedFeedback: Story = {
  render: () => html`
    <div style="max-width: 500px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        How was this response?
      </h3>
      <ai-feedback detailed></ai-feedback>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Simple</h4>
        <ai-feedback simple></ai-feedback>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Simple Inline</h4>
        <ai-feedback simple inline></ai-feedback>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Detailed</h4>
        <ai-feedback detailed></ai-feedback>
      </div>
    </div>
  `,
};
