import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-variant-selector';

/**
 * AI Variant Selector Component
 *
 * Enables users to explore generative variability by displaying multiple
 * AI-generated options and allowing preference-based regeneration.
 *
 * ## Features
 * - Multiple AI-generated variants
 * - Variant comparison
 * - Preference-based regeneration
 * - Visual preview
 * - Selection handling
 *
 * ## Accessibility
 * - Keyboard navigation between variants
 * - ARIA labels for variant selection
 * - Screen reader announces variant count
 *
 * ## References
 * - Google AI UX Patterns (2024): Generative variability
 * - shapeof.ai: Exploration patterns in generative AI
 * - [Microsoft HAX #10](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): User control over AI outputs
 */
const meta: Meta = {
  title: 'AI Components/Variant Selector',
  component: 'ai-variant-selector',
  tags: ['autodocs'],
  argTypes: {
    showPreferences: {
      control: 'boolean',
      description: 'Show preference controls for regeneration',
    },
    allowCompare: {
      control: 'boolean',
      description: 'Enable variant comparison view',
    },
  },
};

export default meta;
type Story = StoryObj;

const sampleVariants = [
  {
    id: '1',
    content: 'This is the first AI-generated variant. It provides a concise explanation.',
    confidence: 0.92,
  },
  {
    id: '2',
    content:
      'This is the second variant with a more detailed approach, offering comprehensive information.',
    confidence: 0.88,
  },
  {
    id: '3',
    content: 'The third variant takes a different angle, focusing on practical applications.',
    confidence: 0.85,
  },
];

export const Default: Story = {
  args: {
    showPreferences: false,
    allowCompare: false,
  },
  render: args =>
    html`<ai-variant-selector
      .variants=${sampleVariants}
      ?showPreferences=${args.showPreferences}
      ?allowCompare=${args.allowCompare}
    ></ai-variant-selector>`,
};

export const WithPreferences: Story = {
  args: {
    showPreferences: true,
    allowCompare: false,
  },
  render: args =>
    html`<ai-variant-selector
      .variants=${sampleVariants}
      ?showPreferences=${args.showPreferences}
      ?allowCompare=${args.allowCompare}
    ></ai-variant-selector>`,
};

export const WithCompare: Story = {
  args: {
    showPreferences: false,
    allowCompare: true,
  },
  render: args =>
    html`<ai-variant-selector
      .variants=${sampleVariants}
      ?showPreferences=${args.showPreferences}
      ?allowCompare=${args.allowCompare}
    ></ai-variant-selector>`,
};

export const FullFeatured: Story = {
  args: {
    showPreferences: true,
    allowCompare: true,
  },
  render: args =>
    html`<ai-variant-selector
      .variants=${sampleVariants}
      ?showPreferences=${args.showPreferences}
      ?allowCompare=${args.allowCompare}
    ></ai-variant-selector>`,
};

export const SingleVariant: Story = {
  render: () =>
    html`<ai-variant-selector
      .variants=${[
        {
          id: '1',
          content: 'This is the only variant available.',
          confidence: 0.9,
        },
      ]}
      showPreferences
      allowCompare
    ></ai-variant-selector>`,
};

export const ManyVariants: Story = {
  render: () =>
    html`<ai-variant-selector
      .variants=${[
        { id: '1', content: 'Variant 1', confidence: 0.95 },
        { id: '2', content: 'Variant 2', confidence: 0.92 },
        { id: '3', content: 'Variant 3', confidence: 0.88 },
        { id: '4', content: 'Variant 4', confidence: 0.85 },
        { id: '5', content: 'Variant 5', confidence: 0.82 },
      ]}
      showPreferences
      allowCompare
    ></ai-variant-selector>`,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 700px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        Choose Your Preferred Response
      </h3>
      <p style="margin: 0 0 1.5rem 0; color: #6b7280; font-size: 0.875rem;">
        We've generated multiple variations. Select the one that best fits your needs, or request
        new variants with specific preferences.
      </p>
      <ai-variant-selector
        .variants=${[
          {
            id: '1',
            content:
              'Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
            confidence: 0.94,
          },
          {
            id: '2',
            content:
              'Machine learning allows computers to automatically learn and improve from data, making predictions or decisions based on patterns they discover.',
            confidence: 0.91,
          },
          {
            id: '3',
            content:
              'At its core, machine learning is about creating algorithms that can process data, identify patterns, and make intelligent decisions with minimal human intervention.',
            confidence: 0.89,
          },
        ]}
        showPreferences
        allowCompare
      ></ai-variant-selector>
    </div>
  `,
};

export const AllFeatures: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Basic</h4>
        <ai-variant-selector .variants=${sampleVariants}></ai-variant-selector>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">
          With Preferences
        </h4>
        <ai-variant-selector .variants=${sampleVariants} showPreferences></ai-variant-selector>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">
          With Compare Mode
        </h4>
        <ai-variant-selector .variants=${sampleVariants} allowCompare></ai-variant-selector>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Full Featured</h4>
        <ai-variant-selector
          .variants=${sampleVariants}
          showPreferences
          allowCompare
        ></ai-variant-selector>
      </div>
    </div>
  `,
};
