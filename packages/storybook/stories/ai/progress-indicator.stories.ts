import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-progress-indicator';

/**
 * AI Progress Indicator Component
 *
 * Multi-stage progress indicator for AI processing workflows.
 * Shows step-by-step progress with ETA calculation, cancellable operations,
 * and clear visual feedback for each stage of AI processing.
 *
 * ## Features
 * - Multi-step progress visualization
 * - Three variants: steps, linear, circular
 * - ETA calculation and display
 * - Cancellable operations
 * - Real-time status updates
 * - AI-branded styling
 *
 * ## Accessibility
 * - role="progressbar" with proper ARIA attributes
 * - Live region for status updates
 * - Keyboard accessible cancel button
 * - Screen reader announces step changes
 *
 * ## References
 * - IBM Carbon for AI (2024): AI loading and progress patterns
 * - PatternFly AI Guidelines: Multi-step AI workflow visualization
 * - [Microsoft HAX #4](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): Show progress and time estimates
 */
const meta: Meta = {
  title: 'AI Components/Progress Indicator',
  component: 'ai-progress-indicator',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['steps', 'linear', 'circular'],
      description: 'Visual variant of the progress indicator',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
    cancellable: {
      control: 'boolean',
      description: 'Whether the operation can be cancelled',
    },
    showEta: {
      control: 'boolean',
      description: 'Show estimated time remaining',
    },
    statusMessage: {
      control: 'text',
      description: 'Current status message',
    },
  },
};

export default meta;
type Story = StoryObj;

const defaultSteps = [
  {
    id: '1',
    label: 'Analyzing Input',
    description: 'Processing your request',
    status: 'completed' as const,
  },
  {
    id: '2',
    label: 'AI Processing',
    description: 'Running model inference',
    status: 'active' as const,
    estimatedDuration: 30,
  },
  {
    id: '3',
    label: 'Generating Output',
    description: 'Creating response',
    status: 'pending' as const,
    estimatedDuration: 20,
  },
  {
    id: '4',
    label: 'Finalizing',
    description: 'Preparing results',
    status: 'pending' as const,
    estimatedDuration: 10,
  },
];

export const Default: Story = {
  render: () => html`
    <ai-progress-indicator
      .steps=${defaultSteps}
      currentStep=${1}
      showEta
      cancellable
    ></ai-progress-indicator>
  `,
};

export const StepsVariant: Story = {
  render: () => html`
    <ai-progress-indicator
      variant="steps"
      .steps=${defaultSteps}
      currentStep=${1}
      showEta
      cancellable
      statusMessage="Processing AI model..."
    ></ai-progress-indicator>
  `,
};

export const LinearVariant: Story = {
  render: () => html`
    <ai-progress-indicator
      variant="linear"
      .steps=${[
        { id: '1', label: 'Analyzing', status: 'completed' },
        { id: '2', label: 'Processing', status: 'active' },
        { id: '3', label: 'Complete', status: 'pending' },
      ]}
      currentStep=${1}
      showEta
      statusMessage="AI is analyzing your document..."
    ></ai-progress-indicator>
  `,
};

export const CircularVariant: Story = {
  render: () => html`
    <ai-progress-indicator
      variant="circular"
      .steps=${[
        { id: '1', label: 'Step 1', status: 'completed' },
        { id: '2', label: 'Step 2', status: 'completed' },
        { id: '3', label: 'Step 3', status: 'active' },
        { id: '4', label: 'Step 4', status: 'pending' },
      ]}
      currentStep=${2}
      showEta
    ></ai-progress-indicator>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Just Started</h4>
        <ai-progress-indicator
          variant="steps"
          .steps=${[
            { id: '1', label: 'Analyzing', status: 'active' },
            { id: '2', label: 'Processing', status: 'pending' },
            { id: '3', label: 'Generating', status: 'pending' },
          ]}
          currentStep=${0}
          showEta
          cancellable
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">In Progress</h4>
        <ai-progress-indicator
          variant="steps"
          .steps=${[
            { id: '1', label: 'Analyzing', status: 'completed' },
            { id: '2', label: 'Processing', status: 'active' },
            { id: '3', label: 'Generating', status: 'pending' },
          ]}
          currentStep=${1}
          showEta
          cancellable
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Nearly Complete</h4>
        <ai-progress-indicator
          variant="steps"
          .steps=${[
            { id: '1', label: 'Analyzing', status: 'completed' },
            { id: '2', label: 'Processing', status: 'completed' },
            { id: '3', label: 'Generating', status: 'active' },
          ]}
          currentStep=${2}
          showEta
          cancellable
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Completed</h4>
        <ai-progress-indicator
          variant="steps"
          .steps=${[
            { id: '1', label: 'Analyzing', status: 'completed' },
            { id: '2', label: 'Processing', status: 'completed' },
            { id: '3', label: 'Generating', status: 'completed' },
          ]}
          currentStep=${2}
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Error State</h4>
        <ai-progress-indicator
          variant="steps"
          .steps=${[
            { id: '1', label: 'Analyzing', status: 'completed' },
            { id: '2', label: 'Processing', status: 'error' },
            { id: '3', label: 'Generating', status: 'pending' },
          ]}
          currentStep=${1}
          statusMessage="An error occurred during processing"
        ></ai-progress-indicator>
      </div>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Small</h4>
        <ai-progress-indicator
          size="small"
          .steps=${[
            { id: '1', label: 'Step 1', status: 'completed' },
            { id: '2', label: 'Step 2', status: 'active' },
            { id: '3', label: 'Step 3', status: 'pending' },
          ]}
          currentStep=${1}
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Medium (default)</h4>
        <ai-progress-indicator
          size="medium"
          .steps=${[
            { id: '1', label: 'Step 1', status: 'completed' },
            { id: '2', label: 'Step 2', status: 'active' },
            { id: '3', label: 'Step 3', status: 'pending' },
          ]}
          currentStep=${1}
        ></ai-progress-indicator>
      </div>

      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Large</h4>
        <ai-progress-indicator
          size="large"
          .steps=${[
            { id: '1', label: 'Step 1', status: 'completed' },
            { id: '2', label: 'Step 2', status: 'active' },
            { id: '3', label: 'Step 3', status: 'pending' },
          ]}
          currentStep=${1}
        ></ai-progress-indicator>
      </div>
    </div>
  `,
};

export const CircularSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 3rem; align-items: start;">
      <div style="text-align: center;">
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Small</h4>
        <ai-progress-indicator
          variant="circular"
          size="small"
          .steps=${[
            { id: '1', label: 'Done', status: 'completed' },
            { id: '2', label: 'Active', status: 'active' },
            { id: '3', label: 'Pending', status: 'pending' },
          ]}
        ></ai-progress-indicator>
      </div>

      <div style="text-align: center;">
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Medium</h4>
        <ai-progress-indicator
          variant="circular"
          size="medium"
          .steps=${[
            { id: '1', label: 'Done', status: 'completed' },
            { id: '2', label: 'Active', status: 'active' },
            { id: '3', label: 'Pending', status: 'pending' },
          ]}
        ></ai-progress-indicator>
      </div>

      <div style="text-align: center;">
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Large</h4>
        <ai-progress-indicator
          variant="circular"
          size="large"
          .steps=${[
            { id: '1', label: 'Done', status: 'completed' },
            { id: '2', label: 'Active', status: 'active' },
            { id: '3', label: 'Pending', status: 'pending' },
          ]}
        ></ai-progress-indicator>
      </div>
    </div>
  `,
};

export const RealWorldExample: Story = {
  render: () => html`
    <div style="max-width: 700px; padding: 2rem; background: #f9fafb; border-radius: 0.75rem;">
      <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Generating Report</h3>
      <p style="margin: 0 0 1.5rem 0; color: #6b7280;">
        AI is analyzing your data and generating insights.
      </p>

      <ai-progress-indicator
        variant="steps"
        .steps=${[
          {
            id: '1',
            label: 'Data Collection',
            description: 'Gathering relevant data points',
            status: 'completed',
            estimatedDuration: 10,
          },
          {
            id: '2',
            label: 'Analysis',
            description: 'Running AI analysis',
            status: 'completed',
            estimatedDuration: 20,
          },
          {
            id: '3',
            label: 'Insight Generation',
            description: 'Identifying patterns and trends',
            status: 'active',
            estimatedDuration: 30,
          },
          {
            id: '4',
            label: 'Report Creation',
            description: 'Formatting final output',
            status: 'pending',
            estimatedDuration: 15,
          },
        ]}
        currentStep=${2}
        showEta
        cancellable
        statusMessage="Analyzing patterns in your data..."
      ></ai-progress-indicator>
    </div>
  `,
};

export const ImageGenerationExample: Story = {
  render: () => html`
    <div
      style="max-width: 500px; padding: 2rem; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 0.75rem; color: white;"
    >
      <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 600;">
        🎨 Creating Your Image
      </h3>
      <p style="margin: 0 0 1.5rem 0; opacity: 0.8; font-size: 0.875rem;">
        "A serene mountain landscape at sunset"
      </p>

      <ai-progress-indicator
        variant="circular"
        size="large"
        .steps=${[
          { id: '1', label: 'Parsing prompt', status: 'completed' },
          { id: '2', label: 'Generating', status: 'active' },
          { id: '3', label: 'Refining', status: 'pending' },
          { id: '4', label: 'Upscaling', status: 'pending' },
        ]}
        currentStep=${1}
        showEta
        cancellable
        statusMessage="Generating your image..."
      ></ai-progress-indicator>
    </div>
  `,
};

export const CodeAnalysisExample: Story = {
  render: () => html`
    <div
      style="max-width: 600px; padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;"
    >
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
        <span style="font-size: 1.25rem;">🔍</span>
        <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">AI Code Review</h3>
      </div>

      <ai-progress-indicator
        variant="linear"
        .steps=${[
          { id: '1', label: 'Parsing code', status: 'completed' },
          { id: '2', label: 'Security scan', status: 'completed' },
          { id: '3', label: 'Performance analysis', status: 'active' },
          { id: '4', label: 'Best practices', status: 'pending' },
          { id: '5', label: 'Generating report', status: 'pending' },
        ]}
        currentStep=${2}
        showEta
        cancellable
        statusMessage="Analyzing performance patterns..."
      ></ai-progress-indicator>
    </div>
  `,
};
