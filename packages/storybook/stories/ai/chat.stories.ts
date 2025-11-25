import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@ai-first-ds/core/components/ai/ai-chat-message';
import '@ai-first-ds/core/components/ai/ai-chat-interface';

/**
 * AI chat components for conversational interfaces.
 *
 * ## Features
 * - Message bubbles (user/AI/system)
 * - Streaming text support
 * - Action buttons (copy, regenerate, feedback)
 * - Typing indicators
 *
 * ## References
 * - [IBM Carbon Chat UI](https://carbondesignsystem.com/)
 * - [Modern AI chat patterns](https://www.chatgpt.com)
 * - [ARIA Live Regions](https://www.w3.org/WAI/ARIA/apg/)
 */
const meta: Meta = {
  title: 'AI Components/Chat',
  component: 'ai-chat-message',
  tags: ['autodocs'],
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
