import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-confidence-meter';

/**
 * AI Confidence Meter Component
 *
 * Visual display of AI confidence levels to build trust through transparency.
 * Shows probabilistic certainty with clear visual indicators and explanations.
 *
 * ## Features
 * - Visual confidence display (0-100%)
 * - Color-coded levels (high/medium/low)
 * - Optional percentage and label display
 * - Interactive variant for details
 * - Multiple size options
 *
 * ## Accessibility
 * - ARIA label with confidence value
 * - Semantic color coding (green/yellow/red)
 * - Keyboard accessible when interactive
 *
 * ## References
 * - IBM Carbon for AI (2024): Confidence visualization patterns
 * - raw.studio (2024): Building trust through transparency
 * - [Microsoft HAX #1](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): Make clear what the system can do
 */
const meta: Meta = {
  title: 'AI Components/Confidence Meter',
  component: 'ai-confidence-meter',
  tags: ['autodocs'],
  argTypes: {
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Confidence level (0-1)',
    },
    label: {
      control: 'text',
      description: 'Optional label for the confidence',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Display percentage value',
    },
    showLabel: {
      control: 'boolean',
      description: 'Display confidence label (High/Medium/Low)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow clicking for details',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    confidence: 0.85,
  },
  render: args =>
    html`<ai-confidence-meter
      confidence=${args.confidence}
      label=${args.label || ''}
      ?showPercentage=${args.showPercentage}
      ?showLabel=${args.showLabel}
      size=${args.size || 'medium'}
      ?interactive=${args.interactive}
    ></ai-confidence-meter>`,
};

export const HighConfidence: Story = {
  args: {
    confidence: 0.95,
    showPercentage: true,
    showLabel: true,
  },
  render: args =>
    html`<ai-confidence-meter
      confidence=${args.confidence}
      ?showPercentage=${args.showPercentage}
      ?showLabel=${args.showLabel}
    ></ai-confidence-meter>`,
};

export const MediumConfidence: Story = {
  args: {
    confidence: 0.65,
    showPercentage: true,
    showLabel: true,
  },
  render: args =>
    html`<ai-confidence-meter
      confidence=${args.confidence}
      ?showPercentage=${args.showPercentage}
      ?showLabel=${args.showLabel}
    ></ai-confidence-meter>`,
};

export const LowConfidence: Story = {
  args: {
    confidence: 0.35,
    showPercentage: true,
    showLabel: true,
  },
  render: args =>
    html`<ai-confidence-meter
      confidence=${args.confidence}
      ?showPercentage=${args.showPercentage}
      ?showLabel=${args.showLabel}
    ></ai-confidence-meter>`,
};

export const WithLabel: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <ai-confidence-meter confidence="0.92" label="Match Quality" showPercentage showLabel>
      </ai-confidence-meter>
      <ai-confidence-meter confidence="0.78" label="Relevance Score" showPercentage showLabel>
      </ai-confidence-meter>
      <ai-confidence-meter confidence="0.45" label="Accuracy" showPercentage showLabel>
      </ai-confidence-meter>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: start;">
      <ai-confidence-meter confidence="0.85" size="small" showPercentage showLabel>
      </ai-confidence-meter>
      <ai-confidence-meter confidence="0.85" size="medium" showPercentage showLabel>
      </ai-confidence-meter>
      <ai-confidence-meter confidence="0.85" size="large" showPercentage showLabel>
      </ai-confidence-meter>
    </div>
  `,
};

export const Interactive: Story = {
  args: {
    confidence: 0.88,
    interactive: true,
    showPercentage: true,
    showLabel: true,
  },
  render: args =>
    html`<ai-confidence-meter
      confidence=${args.confidence}
      ?interactive=${args.interactive}
      ?showPercentage=${args.showPercentage}
      ?showLabel=${args.showLabel}
    ></ai-confidence-meter>`,
};

export const ConfidenceLevels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 300px;">
      <div>
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Very High (95%)
        </div>
        <ai-confidence-meter confidence="0.95" showPercentage showLabel></ai-confidence-meter>
      </div>

      <div>
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">High (85%)</div>
        <ai-confidence-meter confidence="0.85" showPercentage showLabel></ai-confidence-meter>
      </div>

      <div>
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">
          Medium (65%)
        </div>
        <ai-confidence-meter confidence="0.65" showPercentage showLabel></ai-confidence-meter>
      </div>

      <div>
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Low (35%)</div>
        <ai-confidence-meter confidence="0.35" showPercentage showLabel></ai-confidence-meter>
      </div>
    </div>
  `,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 400px; padding: 1.5rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Search Results</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div
          style="padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;"
        >
          <div
            style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;"
          >
            <strong>Result 1</strong>
            <ai-confidence-meter
              confidence="0.92"
              showPercentage
              size="small"
            ></ai-confidence-meter>
          </div>
          <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
            High confidence match for your query.
          </p>
        </div>

        <div
          style="padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;"
        >
          <div
            style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;"
          >
            <strong>Result 2</strong>
            <ai-confidence-meter
              confidence="0.68"
              showPercentage
              size="small"
            ></ai-confidence-meter>
          </div>
          <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">Medium confidence match.</p>
        </div>
      </div>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
          Percentage Only
        </h4>
        <ai-confidence-meter confidence="0.85" showPercentage></ai-confidence-meter>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Label Only</h4>
        <ai-confidence-meter confidence="0.85" showLabel></ai-confidence-meter>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
          Both Percentage and Label
        </h4>
        <ai-confidence-meter confidence="0.85" showPercentage showLabel></ai-confidence-meter>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
          With Custom Label
        </h4>
        <ai-confidence-meter
          confidence="0.88"
          label="Match Score"
          showPercentage
          showLabel
        ></ai-confidence-meter>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Interactive</h4>
        <ai-confidence-meter
          confidence="0.90"
          showPercentage
          showLabel
          interactive
        ></ai-confidence-meter>
      </div>
    </div>
  `,
};
