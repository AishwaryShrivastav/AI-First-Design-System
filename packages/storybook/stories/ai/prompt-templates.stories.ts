import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/ai/ai-prompt-templates';

/**
 * AI Prompt Templates Component
 *
 * Provides categorized prompt templates to help users craft effective prompts
 * for AI interactions. Supports template customization and tracks usage.
 *
 * ## Features
 * - Categorized prompt templates
 * - Template selection and customization
 * - Example outputs
 * - Usage tracking
 * - User-friendly interface
 *
 * ## Accessibility
 * - Keyboard navigation through templates
 * - ARIA labels for categories
 * - Screen reader support for template descriptions
 *
 * ## References
 * - Google Material AI Patterns (2024): Prompt engineering assistance
 * - aiuxpatterns.com: Prompt guidance best practices
 * - Slash.co (2024): Onboarding for AI prompts
 */
const meta: Meta = {
  title: 'AI Components/Prompt Templates',
  component: 'ai-prompt-templates',
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'text',
      description: 'Current template category filter',
    },
    showExamples: {
      control: 'boolean',
      description: 'Show example outputs for templates',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    category: 'all',
    showExamples: false,
  },
  render: args =>
    html`<ai-prompt-templates
      category=${args.category}
      ?showExamples=${args.showExamples}
    ></ai-prompt-templates>`,
};

export const WithExamples: Story = {
  args: {
    category: 'all',
    showExamples: true,
  },
  render: args =>
    html`<ai-prompt-templates
      category=${args.category}
      ?showExamples=${args.showExamples}
    ></ai-prompt-templates>`,
};

export const WritingCategory: Story = {
  args: {
    category: 'writing',
    showExamples: false,
  },
  render: args =>
    html`<ai-prompt-templates
      category=${args.category}
      ?showExamples=${args.showExamples}
    ></ai-prompt-templates>`,
};

export const CodingCategory: Story = {
  args: {
    category: 'coding',
    showExamples: false,
  },
  render: args =>
    html`<ai-prompt-templates
      category=${args.category}
      ?showExamples=${args.showExamples}
    ></ai-prompt-templates>`,
};

export const AnalysisCategory: Story = {
  args: {
    category: 'analysis',
    showExamples: false,
  },
  render: args =>
    html`<ai-prompt-templates
      category=${args.category}
      ?showExamples=${args.showExamples}
    ></ai-prompt-templates>`,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">
        Get Started with AI Prompts
      </h3>
      <p style="margin: 0 0 1.5rem 0; color: #6b7280; font-size: 0.875rem;">
        Choose a template to get started, or create your own custom prompt.
      </p>
      <ai-prompt-templates category="all" showExamples></ai-prompt-templates>
    </div>
  `,
};

export const InPromptInput: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Prompt Composer</h3>
      <div style="margin-bottom: 1.5rem;">
        <label
          style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;"
        >
          Or start with a template:
        </label>
        <ai-prompt-templates category="all"></ai-prompt-templates>
      </div>
    </div>
  `,
};

export const AllCategories: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">All Templates</h4>
        <ai-prompt-templates category="all"></ai-prompt-templates>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Writing</h4>
        <ai-prompt-templates category="writing"></ai-prompt-templates>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600;">Coding</h4>
        <ai-prompt-templates category="coding"></ai-prompt-templates>
      </div>
    </div>
  `,
};
