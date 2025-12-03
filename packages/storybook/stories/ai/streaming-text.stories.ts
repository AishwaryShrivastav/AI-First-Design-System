import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-streaming-text';

/**
 * Streaming text component that displays text token-by-token for AI responses.
 *
 * ## Features
 * - Token-by-token text streaming
 * - Configurable streaming speed
 * - Blinking cursor indicator
 * - Completion detection
 * - Smooth animation
 *
 * ## Accessibility
 * - aria-live for screen reader announcements
 * - Proper role and state attributes
 *
 * ## References
 * - Modern AI streaming patterns (ChatGPT, Claude)
 * - Vercel AI SDK streaming implementation
 * - [ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
 */
const meta: Meta = {
  title: 'AI Components/Streaming Text',
  component: 'ai-streaming-text',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Full text to stream',
    },
    streaming: {
      control: 'boolean',
      description: 'Whether currently streaming',
    },
    speed: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
      description: 'Streaming speed in ms per character (default: 20)',
    },
    showCursor: {
      control: 'boolean',
      description: 'Show blinking cursor during streaming',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    text: 'This is a streaming text example that demonstrates token-by-token generation.',
    streaming: true,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      speed=${args.speed || 20}
      ?showCursor=${args.showCursor}
    ></ai-streaming-text>`,
};

export const Streaming: Story = {
  args: {
    text: 'This text is being streamed token by token, just like real AI responses.',
    streaming: true,
    showCursor: true,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      speed=${args.speed || 20}
      ?showCursor=${args.showCursor}
    ></ai-streaming-text>`,
};

export const Complete: Story = {
  args: {
    text: 'This text has finished streaming and is now complete.',
    streaming: false,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      ?showCursor=${args.showCursor}
    ></ai-streaming-text>`,
};

export const FastSpeed: Story = {
  args: {
    text: 'This text streams very quickly.',
    streaming: true,
    speed: 10,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      speed=${args.speed}
    ></ai-streaming-text>`,
};

export const SlowSpeed: Story = {
  args: {
    text: 'This text streams slowly, character by character.',
    streaming: true,
    speed: 50,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      speed=${args.speed}
    ></ai-streaming-text>`,
};

export const WithoutCursor: Story = {
  args: {
    text: 'This streaming text does not show a cursor.',
    streaming: true,
    showCursor: false,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      ?showCursor=${args.showCursor}
    ></ai-streaming-text>`,
};

export const LongText: Story = {
  args: {
    text: 'Artificial intelligence is transforming the way we interact with technology. From natural language processing to computer vision, AI systems are becoming increasingly sophisticated. This streaming text demonstrates how AI responses can be displayed in real-time, providing users with immediate feedback as the system generates content. The token-by-token approach creates a more engaging and transparent user experience.',
    streaming: true,
  },
  render: args =>
    html`<ai-streaming-text
      text=${args.text}
      ?streaming=${args.streaming}
      speed=${args.speed || 20}
    ></ai-streaming-text>`,
};

export const InChatMessage: Story = {
  render: () => html`
    <div
      style="max-width: 500px; padding: 1rem; background: #f9fafb; border-radius: 0.5rem; border: 1px solid #e5e7eb;"
    >
      <div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #6b7280; font-weight: 500;">
        AI Assistant
      </div>
      <div style="background: white; padding: 1rem; border-radius: 0.375rem;">
        <ai-streaming-text
          text="I can help you understand how streaming text works in AI interfaces. This creates a more natural conversation flow."
          streaming
          speed="25"
        ></ai-streaming-text>
      </div>
    </div>
  `,
};

export const CodeExample: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 1rem; background: #1f2937; border-radius: 0.5rem;">
      <div style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #9ca3af;">
        Generating code...
      </div>
      <pre
        style="margin: 0; color: #e5e7eb; font-family: 'Monaco', monospace; font-size: 0.875rem;"
      >
<code><ai-streaming-text
  text="function calculateSum(a, b) {
  return a + b;
}"
  streaming
  speed="15"
></ai-streaming-text></code></pre>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 600px;">
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Streaming</h4>
        <ai-streaming-text
          text="This text is currently streaming..."
          streaming
          speed="20"
        ></ai-streaming-text>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Complete</h4>
        <ai-streaming-text
          text="This text has finished streaming."
          streaming="false"
        ></ai-streaming-text>
      </div>

      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Without Cursor</h4>
        <ai-streaming-text
          text="Streaming without cursor indicator"
          streaming
          showCursor="false"
        ></ai-streaming-text>
      </div>
    </div>
  `,
};
