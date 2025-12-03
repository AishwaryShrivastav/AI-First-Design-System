import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import 'ai-first-design-system/components/ai/ai-chat-message';
import 'ai-first-design-system/components/ai/ai-chat-interface';

/**
 * AI chat components for conversational interfaces.
 *
 * ## Features
 * - Message bubbles (user/AI/system)
 * - Streaming text support
 * - Action buttons (copy, regenerate, feedback)
 * - Typing indicators
 * - Error handling
 * - Timestamp display
 * - Complete chat interface component
 *
 * ## Accessibility
 * - ARIA live regions for streaming content
 * - Keyboard navigation
 * - Screen reader support
 * - Proper semantic roles
 * - Focus management
 *
 * ## Best Practices
 * - Always provide regenerate option for AI messages
 * - Use streaming for real-time responses
 * - Include feedback mechanisms to improve AI
 * - Show clear error states with recovery options
 * - Display timestamps for context
 *
 * ## Pitfalls to Avoid
 * - Don't remove user control options
 * - Don't hide AI response actions
 * - Don't forget error handling
 * - Don't skip accessibility features
 *
 * ## References
 * - [IBM Carbon Chat UI](https://carbondesignsystem.com/)
 * - [Modern AI chat patterns](https://www.chatgpt.com)
 * - [ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/)
 * - [Microsoft HAX Guideline #10](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/): User Control
 */
const meta: Meta = {
  title: 'AI Components/Chat',
  component: 'ai-chat-message',
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'ai', 'system'],
      description: 'Message sender role',
      table: {
        type: { summary: "'user' | 'ai' | 'system'" },
      },
    },
    streaming: {
      control: 'boolean',
      description: 'Show streaming indicator animation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons (copy, regenerate, feedback)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    timestamp: {
      control: 'text',
      description: 'Message timestamp',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const UserMessage: Story = {
  render: () => html`
    <ai-chat-message role="user" timestamp="2:30 PM">
      Hello! Can you help me understand how AI works?
    </ai-chat-message>
  `,
};

export const AIMessage: Story = {
  render: () => html`
    <ai-chat-message role="ai" showActions timestamp="2:31 PM">
      Of course! AI, or Artificial Intelligence, refers to computer systems designed to perform
      tasks that typically require human intelligence. These tasks include learning, reasoning,
      problem-solving, and understanding natural language.
    </ai-chat-message>
  `,
};

export const StreamingMessage: Story = {
  render: () => html`
    <ai-chat-message role="ai" streaming>
      I'm currently generating a response for you...
    </ai-chat-message>
  `,
};

export const ErrorMessage: Story = {
  render: () => html`
    <ai-chat-message role="ai" error>
      Sorry, I encountered an error while processing your request. Please try again.
    </ai-chat-message>
  `,
};

export const Conversation: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ai-chat-message role="user" timestamp="2:30 PM">
        What's the difference between machine learning and deep learning?
      </ai-chat-message>
      <ai-chat-message role="ai" showActions timestamp="2:31 PM">
        Great question! Machine learning is a subset of AI where computers learn from data without
        being explicitly programmed. Deep learning is a specialized type of machine learning that
        uses neural networks with multiple layers (hence "deep") to analyze data.
      </ai-chat-message>
      <ai-chat-message role="user" timestamp="2:32 PM">
        Can you give me an example?
      </ai-chat-message>
      <ai-chat-message role="ai" streaming> Certainly! Let me provide... </ai-chat-message>
    </div>
  `,
};

export const ChatInterface: Story = {
  render: () => html`
    <ai-chat-interface placeholder="Ask me anything about AI..." style="--ai-chat-height: 500px">
      <div slot="messages">
        <ai-chat-message role="ai">
          Hello! I'm your AI assistant. How can I help you today?
        </ai-chat-message>
        <ai-chat-message role="user" timestamp="Just now">
          Tell me about AI design systems
        </ai-chat-message>
        <ai-chat-message role="ai" showActions timestamp="Just now">
          AI design systems are collections of reusable components and guidelines specifically
          designed for AI-powered products. They include specialized components like chat
          interfaces, streaming text, confidence indicators, and explainability panels.
        </ai-chat-message>
      </div>
    </ai-chat-interface>
  `,
};

export const WithStreamingText: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ai-chat-message role="user" timestamp="2:30 PM">
        Explain how neural networks work
      </ai-chat-message>
      <ai-chat-message role="ai" showActions timestamp="2:31 PM" streaming>
        Neural networks are computing systems inspired by biological neural networks...
      </ai-chat-message>
    </div>
  `,
};

export const ErrorHandling: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <ai-chat-message role="user" timestamp="2:30 PM">
        Generate a complex analysis
      </ai-chat-message>
      <ai-chat-message role="ai" error timestamp="2:31 PM">
        I encountered an error while processing your request. This might be due to the complexity of
        the task or a temporary service issue. Please try rephrasing your request or try again
        later.
      </ai-chat-message>
    </div>
  `,
};

export const CompleteConversation: Story = {
  render: () => html`
    <div style="max-width: 600px; padding: 1rem; background: #f9fafb; border-radius: 0.5rem;">
      <ai-chat-message role="ai" timestamp="2:28 PM">
        Hello! I'm here to help. What would you like to know?
      </ai-chat-message>
      <ai-chat-message role="user" timestamp="2:29 PM"> What is machine learning? </ai-chat-message>
      <ai-chat-message role="ai" showActions timestamp="2:29 PM">
        Machine learning is a subset of artificial intelligence that enables systems to learn and
        improve from experience without being explicitly programmed.
      </ai-chat-message>
      <ai-chat-message role="user" timestamp="2:30 PM">
        Can you give me an example?
      </ai-chat-message>
      <ai-chat-message role="ai" showActions streaming timestamp="2:30 PM">
        Sure! A common example is email spam detection. The system learns from thousands of emails
        labeled as spam or not spam, and then automatically filters new emails...
      </ai-chat-message>
    </div>
  `,
};

export const RealWorldExample: Story = {
  render: () => html`
    <ai-chat-interface
      placeholder="Ask me anything..."
      style="--ai-chat-height: 600px; max-width: 800px; margin: 0 auto;"
    >
      <div slot="messages">
        <ai-chat-message role="ai" timestamp="10:00 AM">
          Welcome! I'm your AI assistant. I can help you with questions, analysis, writing, coding,
          and more. What would you like to explore today?
        </ai-chat-message>
        <ai-chat-message role="user" timestamp="10:01 AM">
          Help me understand the difference between supervised and unsupervised learning
        </ai-chat-message>
        <ai-chat-message role="ai" showActions timestamp="10:01 AM">
          Great question! Here's the key difference:

          <strong>Supervised Learning:</strong> The algorithm learns from labeled training data.
          It's like learning with a teacher who shows you examples with correct answers.

          <strong>Unsupervised Learning:</strong> The algorithm finds patterns in data without
          labels. It's like exploring data to discover hidden structures on your own. Would you like
          me to provide specific examples of each?
        </ai-chat-message>
        <ai-chat-message role="user" timestamp="10:02 AM">
          Yes, please give examples
        </ai-chat-message>
        <ai-chat-message role="ai" showActions streaming timestamp="10:02 AM">
          Here are some examples:

          <strong>Supervised Learning Examples:</strong>
          • Email spam detection (labeled: spam/not spam) • Image classification (labeled:
          cat/dog/bird) • Price prediction (labeled: actual prices)

          <strong>Unsupervised Learning Examples:</strong>
          • Customer segmentation (discover groups) • Anomaly detection (find unusual patterns) •
          Topic modeling (discover themes in text)
        </ai-chat-message>
      </div>
    </ai-chat-interface>
  `,
};
