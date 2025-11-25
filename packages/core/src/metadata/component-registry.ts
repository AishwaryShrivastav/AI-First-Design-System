/**
 * Component registry - central source of truth for all component metadata
 *
 * This registry provides structured,  machine-readable information about
 * all components in the design system, enabling AI tools to discover
 * and understand component capabilities.
 *
 * @reference
 * - Design Systems Collective: "Components as Data" (2024)
 */

import type { ComponentMetadata, ComponentRegistry } from './types.js';
import {
  aiInputMetadata,
  aiBadgeMetadata,
  aiPromptInputMetadata,
  aiChatInterfaceMetadata,
  aiExplainabilityPanelMetadata,
  aiFeedbackMetadata,
  aiLabelMetadata,
  aiStreamingTextMetadata,
  aiSkeletonMetadata,
} from './additional-components.js';

/**
 * AI Button component metadata
 */
const aiButtonMetadata: ComponentMetadata = {
  name: 'ai-button',
  displayName: 'AI Button',
  description:
    'AI-enhanced button component with confidence indicators and visual distinction for AI-generated actions',
  category: 'base',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['interactive', 'conversational'],

  properties: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'ghost'",
      required: false,
      default: 'primary',
      description: 'Button visual variant',
      examples: ['primary', 'secondary', 'ghost'],
    },
    {
      name: 'aiGenerated',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Mark this button as an AI-suggested action. Adds visual indicators',
      examples: [true, false],
    },
    {
      name: 'confidence',
      type: 'number',
      required: false,
      description: 'AI confidence level (0-1). Displayed when aiGenerated is true',
      examples: [0.95, 0.75, 0.5],
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show loading state',
      examples: [true, false],
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disable the button',
      examples: [true, false],
    },
  ],

  events: [
    {
      name: 'click',
      description: 'Fired when button is clicked',
    },
  ],

  slots: [
    {
      name: 'default',
      description: 'Button content',
      required: true,
    },
  ],

  cssProperties: [
    {
      name: '--ai-button-bg',
      description: 'Background color',
      default: 'var(--ai-primary-color)',
    },
    {
      name: '--ai-button-text',
      description: 'Text color',
      default: 'white',
    },
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['button'],
    keyboardNavigation: ['Enter', 'Space'],
    screenReaderNotes: 'Announces AI-generated status when aiGenerated prop is true',
  },

  research: [
    {
      title: 'IBM Carbon for AI - Transparency',
      url: 'https://carbondesignsystem.com/guidelines/carbon-for-ai/',
      type: 'design-system',
      rationale: 'Visual indication of AI involvement using gradients and labels',
    },
    {
      title: 'WCAG 2.2 - Button Pattern',
      url: 'https://www.w3.org/WAI/WCAG22/quickref/',
      type: 'specification',
      rationale: 'Keyboard accessibility and ARIA attributes',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-label',
      relationship: 'complement',
      description: 'Can be used alongside to explicitly label AI-generated actions',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-button variant="primary">Click me</ai-button>\n\n<ai-button aiGenerated confidence="0.95">\n  AI Suggested Action\n</ai-button>`,
      description: 'Basic button and AI-suggested button with confidence indicator',
    },
    {
      framework: 'react',
      code: `import { AIButton } from '@ai-first-ds/react';\n\nfunction App() {\n  return (\n    <>\n      <AIButton variant="primary">Click me</AIButton>\n      \n      <AIButton aiGenerated confidence={0.95}>\n        AI Suggested Action\n      </AIButton>\n    </>\n  );\n}`,
      description: 'React usage with TypeScript',
    },
  ],

  bestPractices: [
    'Always use aiGenerated prop when the action is AI-suggested',
    'Show confidence levels when available to build user trust',
    'Provide manual alternatives for AI-suggested actions',
  ],

  pitfalls: [
    "Don't hide AI involvement - transparency builds trust",
    "Don't use AI indicators for non-AI actions",
  ],

  tags: ['button', 'ai', 'interactive', 'action', 'cta', 'transparent'],
};

/**
 * AI Chat Message component metadata
 */
const aiChatMessageMetadata: ComponentMetadata = {
  name: 'ai-chat-message',
  displayName: 'AI Chat Message',
  description:
    'Chat message bubble component for conversational AI interfaces with streaming support and action buttons',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['conversational'],

  properties: [
    {
      name: 'role',
      type: "'user' | 'ai' | 'system'",
      required: true,
      description: 'Message sender role',
      examples: ['user', 'ai', 'system'],
    },
    {
      name: 'streaming',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show streaming indicator animation',
      examples: [true, false],
    },
    {
      name: 'showActions',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show action buttons (copy, regenerate, feedback)',
      examples: [true, false],
    },
    {
      name: 'timestamp',
      type: 'string',
      required: false,
      description: 'Message timestamp',
    },
  ],

  events: [
    {
      name: 'regenerate',
      description: 'Fired when user clicks regenerate button',
    },
    {
      name: 'copy',
      description: 'Fired when user clicks copy button',
    },
    {
      name: 'feedback',
      description: 'Fired when user provides feedback (thumbs up/down)',
      detailType: '{ positive: boolean }',
    },
  ],

  slots: [
    {
      name: 'default',
      description: 'Message content',
      required: true,
    },
    {
      name: 'actions',
      description: 'Custom action buttons',
      required: false,
    },
  ],

  cssProperties: [
    {
      name: '--ai-message-bg',
      description: 'Message background color',
    },
    {
      name: '--ai-message-text',
      description: 'Message text color',
    },
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['article'],
    keyboardNavigation: ['Tab'],
    screenReaderNotes: 'Uses aria-live for streaming content updates',
  },

  research: [
    {
      title: 'IBM Carbon Chat UI Patterns',
      url: 'https://carbondesignsystem.com/patterns/chatbot-pattern/',
      type: 'design-system',
      rationale: 'Chat message structure and visual design',
    },
    {
      title: 'Microsoft HAX Guideline #10 - User Control',
      url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
      type: 'guideline',
      rationale: 'Provide regenerate and feedback options for user control',
    },
    {
      title: 'ARIA Live Regions',
      url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/',
      type: 'specification',
      rationale: 'Announce streaming content to screen readers',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-chat-interface',
      relationship: 'parent',
      description: 'Complete chat interface that uses ai-chat-message',
    },
    {
      name: 'ai-streaming-text',
      relationship: 'complement',
      description: 'Can be used inside for token-by-token streaming',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-chat-message role="user">\n  What is machine learning?\n</ai-chat-message>\n\n<ai-chat-message role="ai" showActions streaming>\n  Machine learning is a subset of AI...\n</ai-chat-message>`,
      description: 'User question and AI response with actions',
    },
    {
      framework: 'react',
      code: `import { AIChatMessage } from '@ai-first-ds/react';\n\nfunction Chat() {\n  return (\n    <>\n      <AIChatMessage role="user">\n        What is machine learning?\n      </AIChatMessage>\n      \n      <AIChatMessage role="ai" showActions streaming>\n        Machine learning is a subset of AI...\n      </AIChatMessage>\n    </>\n  );\n}`,
      description: 'React chat messages',
    },
  ],

  bestPractices: [
    'Always provide regenerate option for AI messages',
    'Use streaming for real-time responses',
    'Include feedback mechanisms to improve AI',
  ],

  pitfalls: ["Don't remove user control options", "Don't hide AI response actions"],

  tags: ['chat', 'message', 'conversational', 'ai', 'streaming', 'feedback'],
};

/**
 * Component registry - add more components here
 */
export const componentRegistry: ComponentRegistry = {
  version: '0.1.0',
  generated: new Date().toISOString(),
  components: [
    aiButtonMetadata,
    aiChatMessageMetadata,
    aiInputMetadata,
    aiBadgeMetadata,
    aiPromptInputMetadata,
    aiChatInterfaceMetadata,
    aiExplainabilityPanelMetadata,
    aiFeedbackMetadata,
    aiLabelMetadata,
    aiStreamingTextMetadata,
    aiSkeletonMetadata,
  ],
  tokens: [
    // TODO: Import from tokens package
  ],
};

/**
 * Get component by name
 */
export function getComponentMetadata(name: string): ComponentMetadata | undefined {
  return componentRegistry.components.find((c: ComponentMetadata) => c.name === name);
}

/**
 * Search components
 */
export function searchComponentMetadata(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();

  return componentRegistry.components.filter(
    (component: ComponentMetadata) =>
      component.name.toLowerCase().includes(lowerQuery) ||
      component.displayName.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return componentRegistry.components.filter((c: ComponentMetadata) => c.category === category);
}
