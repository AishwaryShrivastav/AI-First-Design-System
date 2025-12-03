import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-toast';

/**
 * AI Toast Notification Component
 *
 * Displays transient notifications for AI events, status updates, and feedback.
 * Designed specifically for AI product workflows with support for streaming updates,
 * action buttons, and AI-specific styling.
 *
 * ## Features
 * - Multiple types: info, success, warning, error, ai
 * - AI-generated content indicators
 * - Confidence level display
 * - Streaming indicator for real-time updates
 * - Auto-dismiss with progress bar
 * - Action buttons
 * - Dismissible
 *
 * ## Accessibility
 * - role="alert" for important notifications
 * - role="status" for informational updates
 * - Keyboard dismissible (Escape key)
 * - Screen reader compatible
 *
 * ## References
 * - WAI-ARIA Alert Pattern
 * - IBM Carbon Notification (2024): Toast design patterns
 * - [Microsoft HAX #2](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): Make clear when AI is uncertain
 */
const meta: Meta = {
  title: 'AI Components/Toast',
  component: 'ai-toast',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'ai'],
      description: 'Type/severity of the toast',
    },
    title: {
      control: 'text',
      description: 'Toast title',
    },
    message: {
      control: 'text',
      description: 'Toast message content',
    },
    duration: {
      control: { type: 'number', min: 0, step: 1000 },
      description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether toast can be manually dismissed',
    },
    actionLabel: {
      control: 'text',
      description: 'Label for action button',
    },
    aiGenerated: {
      control: 'boolean',
      description: 'Whether notification is AI-generated',
    },
    confidence: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'AI confidence level',
    },
    streaming: {
      control: 'boolean',
      description: 'Show streaming indicator',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'This is an informational toast notification.',
    dismissible: true,
    duration: 0,
  },
  render: args => html`
    <ai-toast
      type=${args.type}
      title=${args.title}
      message=${args.message}
      ?dismissible=${args.dismissible}
      duration=${args.duration}
    ></ai-toast>
  `,
};

export const AllTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <ai-toast
        type="info"
        title="Information"
        message="Your document has been saved."
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="success"
        title="Success"
        message="AI analysis completed successfully."
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="warning"
        title="Warning"
        message="AI confidence is lower than usual for this result."
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="error"
        title="Error"
        message="Failed to connect to AI service. Please try again."
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="ai"
        title="AI Insight"
        message="Based on your data, I found 3 optimization opportunities."
        dismissible
        duration="0"
        aiGenerated
      ></ai-toast>
    </div>
  `,
};

export const AIGenerated: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <ai-toast
        type="ai"
        title="AI Analysis Complete"
        message="Found 5 potential improvements in your code."
        aiGenerated
        confidence="0.92"
        actionLabel="View Results"
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="ai"
        title="Smart Suggestion"
        message="Consider using a different approach for better performance."
        aiGenerated
        confidence="0.78"
        dismissible
        duration="0"
      ></ai-toast>
    </div>
  `,
};

export const WithActions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <ai-toast
        type="ai"
        title="AI Suggestion Available"
        message="I can help you optimize this query for better performance."
        aiGenerated
        actionLabel="Apply Suggestion"
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="success"
        title="Export Ready"
        message="Your report has been generated and is ready to download."
        actionLabel="Download"
        dismissible
        duration="0"
      ></ai-toast>
    </div>
  `,
};

export const StreamingState: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <ai-toast
        type="ai"
        title="AI Generating"
        message="Creating your personalized recommendations"
        aiGenerated
        streaming
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="info"
        title="Processing"
        message="Analyzing document content"
        streaming
        duration="0"
      ></ai-toast>
    </div>
  `,
};

export const WithConfidenceLevels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <ai-toast
        type="ai"
        title="High Confidence"
        message="This recommendation is highly reliable."
        aiGenerated
        confidence="0.95"
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="ai"
        title="Medium Confidence"
        message="This suggestion may need human verification."
        aiGenerated
        confidence="0.72"
        dismissible
        duration="0"
      ></ai-toast>

      <ai-toast
        type="ai"
        title="Low Confidence"
        message="AI is uncertain - please review carefully."
        aiGenerated
        confidence="0.45"
        dismissible
        duration="0"
      ></ai-toast>
    </div>
  `,
};

export const AutoDismiss: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      <p style="margin: 0 0 1rem 0; color: #6b7280; font-size: 0.875rem;">
        These toasts will auto-dismiss. Watch the progress bar at the bottom.
      </p>

      <ai-toast
        type="success"
        title="Auto-dismiss (5s)"
        message="This toast will disappear in 5 seconds."
        duration="5000"
        dismissible
      ></ai-toast>

      <ai-toast
        type="info"
        title="Quick notification (3s)"
        message="This one disappears faster."
        duration="3000"
        dismissible
      ></ai-toast>
    </div>
  `,
};

export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 420px;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">
          AI Code Assistant
        </h4>
        <ai-toast
          type="ai"
          title="Code Optimization Found"
          message="This function can be simplified using array.reduce(). Would you like me to refactor it?"
          aiGenerated
          confidence="0.89"
          actionLabel="Apply Fix"
          dismissible
          duration="0"
        ></ai-toast>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">
          AI Content Generator
        </h4>
        <ai-toast
          type="ai"
          title="Content Generated"
          message="I've created 3 variations of your marketing copy. Click to review."
          aiGenerated
          confidence="0.94"
          actionLabel="Review Content"
          dismissible
          duration="0"
        ></ai-toast>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">
          AI Error Detection
        </h4>
        <ai-toast
          type="warning"
          title="Potential Issue Detected"
          message="AI detected a possible data inconsistency in row 247. Manual review recommended."
          aiGenerated
          confidence="0.67"
          actionLabel="View Details"
          dismissible
          duration="0"
        ></ai-toast>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #6b7280;">
          Streaming Response
        </h4>
        <ai-toast
          type="ai"
          title="AI Thinking..."
          message="Generating comprehensive analysis"
          aiGenerated
          streaming
          dismissible
          duration="0"
        ></ai-toast>
      </div>
    </div>
  `,
};

export const NonDismissible: Story = {
  render: () => html`
    <ai-toast
      type="warning"
      title="Critical Update Required"
      message="Please update your API key to continue using AI features."
      actionLabel="Update Now"
      duration="0"
    ></ai-toast>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <ai-toast
      type="ai"
      title="Detailed Analysis Complete"
      message="After analyzing 1,247 data points across 15 categories, I've identified 8 actionable insights. The most significant finding relates to user engagement patterns during peak hours, suggesting a 23% improvement opportunity."
      aiGenerated
      confidence="0.91"
      actionLabel="View Full Report"
      dismissible
      duration="0"
    ></ai-toast>
  `,
};
