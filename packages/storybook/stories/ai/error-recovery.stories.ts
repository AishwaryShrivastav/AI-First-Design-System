import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/ai/ai-error-recovery';

/**
 * AI Error Recovery Component
 *
 * Provides graceful error handling for AI failures with clear explanations,
 * recovery suggestions, and fallback options to maintain user flow.
 *
 * ## Features
 * - Multiple error types (timeout, invalid, api, generation)
 * - Human-readable error messages
 * - Retry functionality
 * - Fallback options
 * - Recovery suggestions
 *
 * ## Accessibility
 * - ARIA alert role for error announcements
 * - Keyboard navigation for actions
 * - Screen reader friendly error descriptions
 *
 * ## References
 * - ideatheorem.com (2024): Proactive error management in AI UX
 * - Slash.co (2024): Fallback options for AI failures
 * - [Microsoft HAX #8](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): Graceful handling of errors
 */
const meta: Meta = {
  title: 'AI Components/Error Recovery',
  component: 'ai-error-recovery',
  tags: ['autodocs'],
  argTypes: {
    errorType: {
      control: 'select',
      options: ['timeout', 'invalid', 'api', 'generation'],
      description: 'Type of error',
    },
    errorMessage: {
      control: 'text',
      description: 'Human-readable error description',
    },
    showFallback: {
      control: 'boolean',
      description: 'Display fallback option',
    },
    allowRetry: {
      control: 'boolean',
      description: 'Enable retry button',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    errorType: 'generation',
    errorMessage: 'An error occurred while processing your request',
    showFallback: true,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const TimeoutError: Story = {
  args: {
    errorType: 'timeout',
    errorMessage: 'The AI response took too long to generate. Please try again.',
    showFallback: true,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const InvalidInputError: Story = {
  args: {
    errorType: 'invalid',
    errorMessage: 'The input provided is invalid or contains unsupported content.',
    showFallback: true,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const APIError: Story = {
  args: {
    errorType: 'api',
    errorMessage: 'Unable to connect to the AI service. Please check your connection.',
    showFallback: true,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const GenerationError: Story = {
  args: {
    errorType: 'generation',
    errorMessage: 'The AI encountered an error while generating a response.',
    showFallback: true,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const NoRetry: Story = {
  args: {
    errorType: 'api',
    errorMessage: 'Service temporarily unavailable. Please try again later.',
    showFallback: true,
    allowRetry: false,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const NoFallback: Story = {
  args: {
    errorType: 'generation',
    errorMessage: 'An error occurred. Please try again.',
    showFallback: false,
    allowRetry: true,
  },
  render: args =>
    html`<ai-error-recovery
      errorType=${args.errorType}
      errorMessage=${args.errorMessage}
      ?showFallback=${args.showFallback}
      ?allowRetry=${args.allowRetry}
    ></ai-error-recovery>`,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 500px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
      <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Chat Interface</h3>
      <div
        style="padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb; margin-bottom: 1rem;"
      >
        <p style="margin: 0; line-height: 1.6;">
          User: Can you help me understand quantum computing?
        </p>
      </div>
      <ai-error-recovery
        errorType="timeout"
        errorMessage="The response is taking longer than expected. Would you like to try again or use a simpler query?"
        showFallback
        allowRetry
      ></ai-error-recovery>
    </div>
  `,
};

export const AllErrorTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Timeout</h4>
        <ai-error-recovery
          errorType="timeout"
          errorMessage="Request timed out"
          showFallback
          allowRetry
        ></ai-error-recovery>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Invalid Input</h4>
        <ai-error-recovery
          errorType="invalid"
          errorMessage="Invalid input provided"
          showFallback
          allowRetry
        ></ai-error-recovery>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">API Error</h4>
        <ai-error-recovery
          errorType="api"
          errorMessage="API connection failed"
          showFallback
          allowRetry
        ></ai-error-recovery>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">
          Generation Error
        </h4>
        <ai-error-recovery
          errorType="generation"
          errorMessage="Failed to generate response"
          showFallback
          allowRetry
        ></ai-error-recovery>
      </div>
    </div>
  `,
};
