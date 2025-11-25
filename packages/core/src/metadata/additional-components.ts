/**
 * Additional component metadata for remaining components
 *
 * This file contains detailed metadata for all components not yet documented
 * in the main component-registry.ts file.
 */

import type { ComponentMetadata } from './types.js';

/**
 * AI Input component metadata
 */
export const aiInputMetadata: ComponentMetadata = {
  name: 'ai-input',
  displayName: 'AI Input',
  description: 'Input field with AI suggestions and autocomplete capabilities',
  category: 'base',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['data-entry', 'conversational'],

  properties: [
    {
      name: 'value',
      type: 'string',
      required: false,
      default: '',
      description: 'Current input value',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text',
    },
    {
      name: 'aiSuggestions',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enable AI-powered suggestions',
      examples: [true, false],
    },
    {
      name: 'suggestion',
      type: 'string',
      required: false,
      description: 'Current AI suggestion (ghost text)',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Disable the input',
    },
    {
      name: 'error',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show error state',
    },
  ],

  events: [
    {
      name: 'input',
      description: 'Fired when input value changes',
    },
    {
      name: 'change',
      description: 'Fired when input loses focus with changed value',
    },
    {
      name: 'ai-suggestion',
      description: 'Fired when AI suggestion is accepted',
      detailType: '{ accepted: boolean; value: string }',
    },
  ],

  slots: [
    {
      name: 'prefix',
      description: 'Content before input',
      required: false,
    },
    {
      name: 'suffix',
      description: 'Content after input',
      required: false,
    },
  ],

  cssProperties: [
    {
      name: '--ai-input-bg',
      description: 'Background color',
      default: 'white',
    },
    {
      name: '--ai-input-border',
      description: 'Border style',
      default: '1px solid #d1d5db',
    },
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['textbox'],
    keyboardNavigation: ['Tab (accept suggestion)'],
    screenReaderNotes: 'Announces suggestions when available',
  },

  research: [
    {
      title: 'GitHub Copilot UX Patterns',
      url: 'https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/',
      type: 'design-system',
      rationale: 'Ghost text pattern for inline AI suggestions',
    },
    {
      title: 'Microsoft HAX Guideline #5 - Contextual Assistance',
      url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
      type: 'guideline',
      rationale: 'Provide help when and where needed',
    },
    {
      title: 'WCAG 2.2 - Input Labels',
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions',
      type: 'specification',
      rationale: 'Proper labeling and instructions',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-prompt-input',
      relationship: 'alternative',
      description: 'Advanced prompt input for complex AI interactions',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-input placeholder="Enter text..."></ai-input>\n\n<ai-input aiSuggestions suggestion="Complete this..."></ai-input>`,
      description: 'Basic input and AI-enhanced input with suggestions',
    },
    {
      framework: 'react',
      code: `import { AIInput } from '@ai-first-ds/react';\n\nfunction App() {\n  return (\n    <AIInput \n      aiSuggestions \n      suggestion="Complete this..."\n      placeholder="Type here..."\n    />\n  );\n}`,
      description: 'React usage with AI suggestions',
    },
  ],

  bestPractices: [
    'Show ghost text for AI suggestions',
    'Allow Tab key to accept suggestions',
    'Provide clear visual distinction for AI content',
  ],

  pitfalls: [
    "Don't auto-accept suggestions without user action",
    "Don't hide that suggestions are AI-generated",
  ],

  tags: ['input', 'form', 'ai', 'suggestions', 'autocomplete', 'data-entry'],
};

/**
 * AI Badge component metadata
 */
export const aiBadgeMetadata: ComponentMetadata = {
  name: 'ai-badge',
  displayName: 'AI Badge',
  description: 'Badge component with confidence visualization for AI-related status',
  category: 'base',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['informational'],

  properties: [
    {
      name: 'variant',
      type: "'default' | 'success' | 'warning' | 'error' | 'info'",
      required: false,
      default: 'default',
      description: 'Badge color variant',
      examples: ['default', 'success', 'warning'],
    },
    {
      name: 'confidence',
      type: 'number',
      required: false,
      description: 'Confidence level (0-1) to visualize',
      examples: [0.95, 0.75, 0.5],
    },
  ],

  events: [],

  slots: [
    {
      name: 'default',
      description: 'Badge content',
      required: true,
    },
  ],

  cssProperties: [
    {
      name: '--ai-badge-bg',
      description: 'Background color',
    },
    {
      name: '--ai-badge-text',
      description: 'Text color',
    },
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['status'],
    keyboardNavigation: [],
    screenReaderNotes: 'Announces badge content and confidence level',
  },

  research: [
    {
      title: 'IBM Carbon for AI - Confidence Indicators',
      url: 'https://carbondesignsystem.com/guidelines/carbon-for-ai/',
      type: 'design-system',
      rationale: 'Visual confidence representation',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-label',
      relationship: 'sibling',
      description: 'Similar purpose but different visual treatment',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-badge variant="success">Active</ai-badge>\n\n<ai-badge confidence="0.95">High Confidence</ai-badge>`,
      description: 'Status badge and confidence badge',
    },
    {
      framework: 'react',
      code: `import { AIBadge } from '@ai-first-ds/react';\n\nfunction App() {\n  return <AIBadge confidence={0.95}>High Confidence</AIBadge>;\n}`,
      description: 'React confidence badge',
    },
  ],

  bestPractices: [
    'Use confidence prop to show AI certainty',
    'Choose appropriate variant for context',
  ],

  pitfalls: ["Don't overuse badges - they lose impact"],

  tags: ['badge', 'label', 'status', 'confidence', 'indicator'],
};

// Note: Due to file size, creating stub metadata for remaining components
// These should be expanded with full details in production

export const aiPromptInputMetadata: ComponentMetadata = {
  name: 'ai-prompt-input',
  displayName: 'AI Prompt Input',
  description: 'Advanced prompt input with templates and multi-line support',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['conversational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['prompt', 'input', 'ai', 'conversational'],
};

export const aiChatInterfaceMetadata: ComponentMetadata = {
  name: 'ai-chat-interface',
  displayName: 'AI Chat Interface',
  description: 'Complete chat interface with message history and input',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['conversational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['chat', 'interface', 'conversational', 'ai'],
};

export const aiExplainabilityPanelMetadata: ComponentMetadata = {
  name: 'ai-explainability-panel',
  displayName: 'AI Explainability Panel',
  description: 'Progressive disclosure panel for AI explanations (What/Why/How)',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['informational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['explainability', 'transparency', 'ai', 'xai'],
};

export const aiFeedbackMetadata: ComponentMetadata = {
  name: 'ai-feedback',
  displayName: 'AI Feedback',
  description: 'User feedback collection for AI outputs',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['feedback'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['feedback', 'ai', 'user-control'],
};

export const aiLabelMetadata: ComponentMetadata = {
  name: 'ai-label',
  displayName: 'AI Label',
  description: 'Visual indicator for AI-generated content',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['informational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['label', 'transparency', 'ai', 'indicator'],
};

export const aiStreamingTextMetadata: ComponentMetadata = {
  name: 'ai-streaming-text',
  displayName: 'AI Streaming Text',
  description: 'Token-by-token text streaming visualization',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['conversational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['streaming', 'text', 'ai', 'animation'],
};

export const aiSkeletonMetadata: ComponentMetadata = {
  name: 'ai-skeleton',
  displayName: 'AI Skeleton',
  description: 'AI-aware skeleton loader with streaming indicators',
  category: 'ai-specific',
  status: 'stable',
  since: '0.1.0',
  usageContexts: ['informational'],
  properties: [],
  events: [],
  slots: [],
  cssProperties: [],
  accessibility: { wcagLevel: 'AA', keyboardNavigation: [] },
  research: [],
  relatedComponents: [],
  examples: [],
  tags: ['skeleton', 'loading', 'ai', 'placeholder'],
};
