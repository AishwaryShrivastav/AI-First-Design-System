import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/base/ai-badge';

/**
 * AI-enhanced badge component for displaying labels, confidence scores, and AI indicators.
 *
 * ## Features
 * - Multiple visual variants (info, success, warning, error, ai)
 * - AI gradient indicator with shimmer animation
 * - Confidence score visualization
 * - Dot indicator for status
 * - Customizable colors via CSS variables
 *
 * ## Accessibility
 * - Uses semantic HTML
 * - Sufficient color contrast (WCAG AA)
 * - aria-label for confidence scores
 *
 * ## References
 * - [WCAG 2.2 Color Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
 * - [IBM Carbon for AI Labels](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
 * - [Material Design Badges](https://m3.material.io/components/badges/overview)
 */
const meta: Meta = {
  title: 'Base Components/Badge',
  component: 'ai-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'ai'],
      description: 'Visual variant',
    },
    aiIndicator: {
      control: 'boolean',
      description: 'Show AI gradient indicator',
    },
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      description: 'AI confidence level (0-1)',
    },
    dot: {
      control: 'boolean',
      description: 'Show a dot indicator',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'info',
  },
  render: args =>
    html`<ai-badge
      variant=${args.variant}
      ?aiIndicator=${args.aiIndicator}
      confidence=${args.confidence}
      ?dot=${args.dot}
    >
      Badge
    </ai-badge>`,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      <ai-badge variant="info">Info</ai-badge>
      <ai-badge variant="success">Success</ai-badge>
      <ai-badge variant="warning">Warning</ai-badge>
      <ai-badge variant="error">Error</ai-badge>
      <ai-badge variant="ai">AI</ai-badge>
    </div>
  `,
};

export const WithDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      <ai-badge variant="info" dot>Online</ai-badge>
      <ai-badge variant="success" dot>Active</ai-badge>
      <ai-badge variant="warning" dot>Pending</ai-badge>
      <ai-badge variant="error" dot>Offline</ai-badge>
    </div>
  `,
};

export const WithAIIndicator: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
      <ai-badge aiIndicator>AI Generated</ai-badge>
      <ai-badge aiIndicator>Powered by AI</ai-badge>
      <ai-badge variant="ai">AI Content</ai-badge>
    </div>
  `,
};

export const WithConfidence: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ai-badge aiIndicator confidence="0.95">High Confidence (95%)</ai-badge>
      <ai-badge aiIndicator confidence="0.75">Medium Confidence (75%)</ai-badge>
      <ai-badge aiIndicator confidence="0.50">Low Confidence (50%)</ai-badge>
    </div>
  `,
};

export const ConfidenceLevels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 300px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Very High:</span>
        <ai-badge aiIndicator confidence="0.98">98%</ai-badge>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>High:</span>
        <ai-badge aiIndicator confidence="0.85">85%</ai-badge>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Medium:</span>
        <ai-badge aiIndicator confidence="0.65">65%</ai-badge>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Low:</span>
        <ai-badge aiIndicator confidence="0.35">35%</ai-badge>
      </div>
    </div>
  `,
};

export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 500;">
          Document Status
        </h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <ai-badge variant="success" dot>Published</ai-badge>
          <ai-badge variant="info">Draft</ai-badge>
          <ai-badge variant="warning">Review</ai-badge>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 500;">
          AI Content Labels
        </h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <ai-badge aiIndicator>AI Generated</ai-badge>
          <ai-badge aiIndicator confidence="0.92">92% Confidence</ai-badge>
          <ai-badge variant="ai">GPT-4</ai-badge>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 500;">System Status</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <ai-badge variant="success" dot>Operational</ai-badge>
          <ai-badge variant="warning" dot>Degraded</ai-badge>
          <ai-badge variant="error" dot>Down</ai-badge>
        </div>
      </div>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">
          Standard Variants
        </h4>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <ai-badge variant="info">Info</ai-badge>
          <ai-badge variant="success">Success</ai-badge>
          <ai-badge variant="warning">Warning</ai-badge>
          <ai-badge variant="error">Error</ai-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">AI Variants</h4>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <ai-badge variant="ai">AI</ai-badge>
          <ai-badge aiIndicator>With Indicator</ai-badge>
          <ai-badge aiIndicator confidence="0.88">With Confidence</ai-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">
          With Dot Indicator
        </h4>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <ai-badge variant="info" dot>Info</ai-badge>
          <ai-badge variant="success" dot>Success</ai-badge>
          <ai-badge variant="warning" dot>Warning</ai-badge>
          <ai-badge variant="error" dot>Error</ai-badge>
        </div>
      </div>
    </div>
  `,
};
