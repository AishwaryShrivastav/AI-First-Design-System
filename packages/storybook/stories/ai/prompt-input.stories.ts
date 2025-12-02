import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/ai/ai-prompt-input';

/**
 * Advanced prompt input component designed for AI interactions.
 *
 * ## Features
 * - Multi-line auto-expanding input
 * - Token/character count display
 * - Prompt template integration
 * - Keyboard shortcuts (Cmd/Ctrl + Enter to submit)
 * - Loading states
 * - AI-specific optimizations
 *
 * ## Accessibility
 * - Keyboard shortcuts (Cmd/Ctrl + Enter to submit)
 * - Screen reader support
 * - Focus management
 * - ARIA labels for actions
 *
 * ## References
 * - Modern AI product UX (ChatGPT, Claude, Perplexity)
 * - [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
 * - [Microsoft HAX Guideline #5](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)
 */
const meta: Meta = {
  title: 'AI Components/Prompt Input',
  component: 'ai-prompt-input',
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
    disabled: {
      control: 'boolean',
      description: 'Whether input is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    showTokenCount: {
      control: 'boolean',
      description: 'Show token/character count',
    },
    maxTokens: {
      control: { type: 'number', min: 0, max: 10000, step: 100 },
      description: 'Maximum tokens allowed',
    },
    multiline: {
      control: 'boolean',
      description: 'Allow multi-line input (auto-expanding)',
    },
    showTemplates: {
      control: 'boolean',
      description: 'Show prompt templates',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Type your prompt...',
  },
  render: args =>
    html`<ai-prompt-input
      value=${args.value || ''}
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      ?showTokenCount=${args.showTokenCount}
      maxTokens=${args.maxTokens}
      ?multiline=${args.multiline}
      ?showTemplates=${args.showTemplates}
    ></ai-prompt-input>`,
};

export const WithTokenCount: Story = {
  args: {
    value: 'Explain how machine learning works',
    showTokenCount: true,
    maxTokens: 4000,
  },
  render: args =>
    html`<ai-prompt-input
      value=${args.value}
      ?showTokenCount=${args.showTokenCount}
      maxTokens=${args.maxTokens}
    ></ai-prompt-input>`,
};

export const SingleLine: Story = {
  args: {
    value: 'What is artificial intelligence?',
    multiline: false,
  },
  render: args =>
    html`<ai-prompt-input value=${args.value} ?multiline=${args.multiline}></ai-prompt-input>`,
};

export const MultiLine: Story = {
  args: {
    value:
      'Write a comprehensive guide about:\n1. Machine learning basics\n2. Deep learning\n3. Neural networks',
    multiline: true,
  },
  render: args =>
    html`<ai-prompt-input value=${args.value} ?multiline=${args.multiline}></ai-prompt-input>`,
};

export const Loading: Story = {
  args: {
    value: 'Processing your request...',
    loading: true,
    disabled: true,
  },
  render: args =>
    html`<ai-prompt-input
      value=${args.value}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
    ></ai-prompt-input>`,
};

export const Disabled: Story = {
  args: {
    value: 'This input is disabled',
    disabled: true,
  },
  render: args =>
    html`<ai-prompt-input value=${args.value} ?disabled=${args.disabled}></ai-prompt-input>`,
};

export const WithTemplates: Story = {
  args: {
    placeholder: 'Select a template or type your own...',
    showTemplates: true,
  },
  render: args =>
    html`<ai-prompt-input
      placeholder=${args.placeholder}
      ?showTemplates=${args.showTemplates}
    ></ai-prompt-input>`,
};

export const LongPrompt: Story = {
  args: {
    value:
      'Create a detailed analysis of the following topics:\n\n1. The history of artificial intelligence\n2. Current state of AI technology\n3. Future implications and ethical considerations\n4. Practical applications in various industries',
    showTokenCount: true,
    maxTokens: 4000,
    multiline: true,
  },
  render: args =>
    html`<ai-prompt-input
      value=${args.value}
      ?showTokenCount=${args.showTokenCount}
      maxTokens=${args.maxTokens}
      ?multiline=${args.multiline}
    ></ai-prompt-input>`,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Ask AI Assistant</h3>
      <ai-prompt-input
        placeholder="What would you like to know?"
        showTokenCount
        maxTokens="4000"
        multiline
      ></ai-prompt-input>
      <p style="margin-top: 0.75rem; font-size: 0.875rem; color: #6b7280;">
        Press Cmd/Ctrl + Enter to submit
      </p>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Default</h4>
        <ai-prompt-input placeholder="Type your prompt..."></ai-prompt-input>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
          With Token Count
        </h4>
        <ai-prompt-input
          value="Explain quantum computing"
          showTokenCount
          maxTokens="4000"
        ></ai-prompt-input>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Loading</h4>
        <ai-prompt-input value="Processing..." loading disabled></ai-prompt-input>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Disabled</h4>
        <ai-prompt-input value="Cannot edit" disabled></ai-prompt-input>
      </div>
    </div>
  `,
};
