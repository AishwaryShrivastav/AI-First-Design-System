/**
 * Storybook Story Template
 *
 * This template follows open source standards for component documentation.
 * Copy this file and customize it for your component.
 *
 * @see packages/storybook/STORYBOOK_GUIDE.md for detailed guidelines
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/[category]/[component-name]';

/**
 * [Component Display Name]
 *
 * [Brief description of what this component does and when to use it]
 *
 * ## Features
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * ## Accessibility
 * - [Accessibility feature 1]
 * - [Accessibility feature 2]
 * - [Accessibility feature 3]
 * - WCAG 2.2 Level AA compliant
 *
 * ## Best Practices
 * - [Best practice 1]
 * - [Best practice 2]
 * - [Best practice 3]
 *
 * ## Pitfalls to Avoid
 * - [Pitfall 1]
 * - [Pitfall 2]
 *
 * ## References
 * - [Reference 1 Name](URL): [Brief rationale]
 * - [Reference 2 Name](URL): [Brief rationale]
 * - [WCAG 2.2 Specification](URL)
 * - [ARIA Pattern](URL)
 */
const meta: Meta = {
  title: '[Category]/[Component Name]',
  component: '[component-name]',
  tags: ['autodocs'],
  argTypes: {
    // Add comprehensive argTypes for all props
    propName: {
      control: '[control-type]', // 'text', 'boolean', 'select', 'number', 'range', etc.
      options: ['option1', 'option2'], // For select controls
      description: 'Clear description of what this prop does',
      table: {
        type: { summary: 'string | number | boolean' },
        defaultValue: { summary: 'default-value' },
      },
    },
    // Add more argTypes for each prop
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default story - shows the component in its most common use case
 */
export const Default: Story = {
  args: {
    // Default args
  },
  render: args =>
    html`<[component-name]
      propName=${args.propName}
      ?booleanProp=${args.booleanProp}
    >
      Content
    </[component-name]>`,
};

/**
 * Variant stories - show different visual variants or configurations
 */
export const Variant1: Story = {
  args: {
    variant: 'variant1',
  },
  render: args => html`<[component-name] variant=${args.variant}></[component-name]>`,
};

export const Variant2: Story = {
  args: {
    variant: 'variant2',
  },
  render: args => html`<[component-name] variant=${args.variant}></[component-name]>`,
};

/**
 * State stories - show different states (loading, error, disabled, etc.)
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
  render: args => html`<[component-name] ?loading=${args.loading}></[component-name]>`,
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: args => html`<[component-name] ?error=${args.error}></[component-name]>`,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => html`<[component-name] ?disabled=${args.disabled}></[component-name]>`,
};

/**
 * All variants showcase - useful for visual regression testing
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <[component-name] variant="variant1"></[component-name]>
      <[component-name] variant="variant2"></[component-name]>
      <[component-name] variant="variant3"></[component-name]>
    </div>
  `,
};

/**
 * Real-world example - shows the component in a realistic use case
 */
export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        Example Use Case
      </h3>
      <[component-name]>
        <!-- Real-world content -->
      </[component-name]>
    </div>
  `,
};

/**
 * Best practices example - demonstrates recommended usage patterns
 */
export const BestPractices: Story = {
  render: () => html`
    <div style="max-width: 500px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Best Practices</h3>
      <!-- Show recommended patterns -->
    </div>
  `,
};
