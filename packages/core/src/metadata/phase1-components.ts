/**
 * Comprehensive metadata for all AI UX components (2024-2025 research-backed)
 *
 * This file contains detailed metadata for new Phase 1 components and
 * expanded metadata for previously stubbed components.
 */

import type { ComponentMetadata } from './types.js';

/**
 * AI Prompt Templates component metadata
 */
export const aiPromptTemplatesMetadata: ComponentMetadata = {
  name: 'ai-prompt-templates',
  displayName: 'AI Prompt Templates',
  description:
    'Categorized prompt templates to help users craft effective AI prompts with examples and usage tracking',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',
  usageContexts: ['conversational'],

  properties: [
    {
      name: 'category',
      type: 'string',
      required: false,
      default: 'all',
      description: 'Current template category filter',
      examples: ['all', 'writing', 'coding', 'learning', 'creative'],
    },
    {
      name: 'showExamples',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show example outputs for templates',
    },
  ],

  events: [
    {
      name: 'template-selected',
      description: 'Fired when user selects a template',
      detailType: '{ id: string; prompt: string; category: string }',
    },
    {
      name: 'template-customized',
      description: 'Fired when user modifies a template',
      detailType: '{ id: string; customPrompt: string }',
    },
  ],

  slots: [],

  cssProperties: [],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['region'],
    keyboardNavigation: ['Tab', 'Enter'],
    screenReaderNotes: 'Announces template categories and usage statistics',
  },

  research: [
    {
      title: 'Google Material AI Patterns (2024) - Prompt Engineering Assistance',
      url: 'https://material.io/blog/ai-design-patterns',
      type: 'design-system',
      rationale: 'Template-based prompt guidance helps users craft effective AI prompts',
    },
    {
      title: 'aiuxpatterns.com - Prompt Guidance Best Practices',
      url: 'https://aiuxpatterns.com',
      type: 'guideline',
      rationale: 'Categorized templates and examples reduce cognitive load',
    },
    {
      title: 'Slash.co (2024) - Onboarding for AI Prompts',
      url: 'https://slash.co/ai-ux-patterns',
      type: 'paper',
      rationale: 'Templates serve as onboarding mechanism for new AI users',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-prompt-input',
      relationship: 'complement',
      description: 'Templates populate prompt input component',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-prompt-templates category="writing"></ai-prompt-templates>`,
      description: 'Show writing-category templates',
    },
    {
      framework: 'react',
      code: `import { AIPromptTemplates } from '@ai-first-ds/react';\n\nfunction App() {\n  return (\n    <AIPromptTemplates \n      category="coding"\n      showExamples\n      onTemplateSelected={(e) => console.log(e.detail)}\n    />\n  );\n}`,
      description: 'React integration with event handling',
    },
  ],

  bestPractices: [
    'Organize templates by user intent/task type',
    'Show usage statistics to highlight popular templates',
    'Allow template customization before use',
    'Provide examples of successful outputs',
  ],

  pitfalls: [
    "Don't overwhelm with too many categories",
    "Don't hide advanced templates from expert users",
  ],

  tags: ['prompt', 'template', 'guidance', 'onboarding', 'ai', 'conversational'],
};

/**
 * AI Variant Selector component metadata
 */
export const aiVariantSelectorMetadata: ComponentMetadata = {
  name: 'ai-variant-selector',
  displayName: 'AI Variant Selector',
  description:
    'Explore generative variability by displaying multiple AI outputs with preference-based regeneration',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',
  usageContexts: ['conversational', 'interactive'],

  properties: [
    {
      name: 'variants',
      type: 'Array<{id: string; content: string; confidence?: number; attributes?: Record<string, string>}>',
      required: true,
      description: 'Array of AI-generated variant options',
    },
    {
      name: 'showPreferences',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Show preference controls for regeneration',
    },
    {
      name: 'allowCompare',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Enable variant comparison view',
    },
  ],

  events: [
    {
      name: 'variant-selected',
      description: 'Fired when user selects a variant',
      detailType: '{ variant: object }',
    },
    {
      name: 'regenerate',
      description: 'Fired when user requests regeneration',
      detailType: '{ preferences: { tone: string; length: string; style: string } }',
    },
    {
      name: 'compare',
      description: 'Fired when comparison view is toggled',
      detailType: '{ variants: Array }',
    },
  ],

  slots: [],

  cssProperties: [],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['region', 'button'],
    keyboardNavigation: ['Tab', 'Enter', 'Space'],
    screenReaderNotes: 'Announces variant count and confidence levels',
  },

  research: [
    {
      title: 'Google AI UX Patterns (2024) - Generative Variability',
      url: 'https://ai.google/ux-patterns',
      type: 'design-system',
      rationale: 'Multiple outputs let users explore AI creative range',
    },
    {
      title: 'shapeof.ai - Exploration Patterns in Generative AI',
      url: 'https://shapeof.ai',
      type: 'paper',
      rationale: 'Comparison views help users understand output differences',
    },
    {
      title: 'Microsoft HAX #10 - User Control Over AI Outputs',
      url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
      type: 'guideline',
      rationale: 'Preference-based regeneration gives users agency',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-confidence-meter',
      relationship: 'complement',
      description: 'Show confidence for each variant',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-variant-selector \n  .variants=\${[\n    { id: '1', content: 'Option 1...', confidence: 0.95 },\n    { id: '2', content: 'Option 2...', confidence: 0.87 }\n  ]}\n  showPreferences\n  allowCompare\n></ai-variant-selector>`,
      description: 'Display variants with preferences',
    },
    {
      framework: 'react',
      code: `import { AIVariantSelector } from '@ai-first-ds/react';\n\nfunction App() {\n  const [variants, setVariants] = useState([...]);\n  \n  return (\n    <AIVariantSelector \n      variants={variants}\n      showPreferences\n      onRegenerate={(e) => {\n        regenerateWithPreferences(e.detail.preferences);\n      }}\n    />\n  );\n}`,
      description: 'React integration with regeneration',
    },
  ],

  bestPractices: [
    'Show 3-5 variants for optimal choice',
    'Display confidence scores for transparency',
    'Enable preference refinement',
    'Provide comparison mode for similar outputs',
  ],

  pitfalls: [
    "Don't show too many variants (overwhelming)",
    "Don't hide confidence levels",
    "Don't auto-select without user action",
  ],

  tags: ['variant', 'generation', 'comparison', 'ai', 'exploration', 'variability'],
};

/**
 * AI Error Recovery component metadata
 */
export const aiErrorRecoveryMetadata: ComponentMetadata = {
  name: 'ai-error-recovery',
  displayName: 'AI Error Recovery',
  description:
    'Graceful error handling with explanations, recovery suggestions, and fallback options',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',
  usageContexts: ['informational', 'feedback'],

  properties: [
    {
      name: 'errorType',
      type: "'timeout' | 'invalid' | 'api' | 'generation'",
      required: false,
      default: 'generation',
      description: 'Type of error that occurred',
      examples: ['timeout', 'invalid', 'api', 'generation'],
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      default: 'An error occurred while processing your request',
      description: 'Human-readable error description',
    },
    {
      name: 'showFallback',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Display fallback option',
    },
    {
      name: 'allowRetry',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enable retry button',
    },
  ],

  events: [
    {
      name: 'retry',
      description: 'Fired when user requests retry',
      detailType: '{ errorType: string }',
    },
    {
      name: 'fallback',
      description: 'Fired when user chooses non-AI alternative',
      detailType: '{ errorType: string }',
    },
    {
      name: 'report',
      description: 'Fired when user reports the error',
      detailType: '{ errorType: string; errorMessage: string }',
    },
  ],

  slots: [],

  cssProperties: [],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['alert'],
    keyboardNavigation: ['Tab', 'Enter'],
    screenReaderNotes: 'Uses aria-live for immediate error announcement',
  },

  research: [
    {
      title: 'ideatheorem.com (2024) - Proactive Error Management in AI UX',
      url: 'https://ideatheorem.com/ai-ux-patterns',
      type: 'paper',
      rationale: 'Clear error explanations and recovery paths maintain user trust',
    },
    {
      title: 'Slash.co (2024) - Fallback Options for AI Failures',
      url: 'https://slash.co/ai-fallbacks',
      type: 'guideline',
      rationale: 'Non-AI alternatives ensure task completion despite failures',
    },
    {
      title: 'Microsoft HAX #8 - Graceful Handling of Errors',
      url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
      type: 'guideline',
      rationale: 'Contextual suggestions help users recover from errors',
    },
  ],

  relatedComponents: [],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-error-recovery \n  errorType="timeout"\n  errorMessage="AI response took too long"\n  showFallback\n  allowRetry\n></ai-error-recovery>`,
      description: 'Timeout error with fallback',
    },
    {
      framework: 'react',
      code: `import { AIErrorRecovery } from '@ai-first-ds/react';\n\nfunction App() {\n  const [error, setError] = useState(null);\n  \n  if (error) {\n    return (\n      <AIErrorRecovery \n        errorType={error.type}\n        errorMessage={error.message}\n        onRetry={() => retryRequest()}\n        onFallback={() => useFallbackMethod()}\n      />\n    );\n  }\n  \n  return <AIInterface />;\n}`,
      description: 'React error boundary integration',
    },
  ],

  bestPractices: [
    'Provide specific, actionable recovery suggestions',
    'Always offer fallback to non-AI methods',
    'Explain errors in user-friendly language',
    'Track error types for improvement',
  ],

  pitfalls: [
    "Don't use generic error messages",
    "Don't hide retry options",
    "Don't force users to wait without alternatives",
  ],

  tags: ['error', 'recovery', 'fallback', 'reliability', 'ai', 'trust'],
};

/**
 * AI Confidence Meter component metadata
 */
export const aiConfidenceMeterMetadata: ComponentMetadata = {
  name: 'ai-confidence-meter',
  displayName: 'AI Confidence Meter',
  description:
    'Visual confidence level display with circular and linear meters to build transparency and trust',
  category: 'ai-specific',
  status: 'stable',
  since: '0.2.0',
  usageContexts: ['informational'],

  properties: [
    {
      name: 'confidence',
      type: 'number',
      required: true,
      description: 'Confidence level (0-1)',
      examples: [0.95, 0.75, 0.5],
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Optional label for the confidence',
    },
    {
      name: 'showPercentage',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Display percentage value',
    },
    {
      name: 'showLabel',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Display confidence label (High/Medium/Low)',
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: 'medium',
      description: 'Size variant',
      examples: ['small', 'medium', 'large'],
    },
    {
      name: 'interactive',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Allow clicking for details',
    },
  ],

  events: [
    {
      name: 'confidence-click',
      description: 'Fired when user clicks for more details',
      detailType: '{ confidence: number; level: string }',
    },
  ],

  slots: [],

  cssProperties: [],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['status', 'button'],
    keyboardNavigation: ['Enter', 'Space'],
    screenReaderNotes: 'Announces confidence value and level',
  },

  research: [
    {
      title: 'IBM Carbon for AI (2024) - Confidence Visualization Patterns',
      url: 'https://carbondesignsystem.com/guidelines/carbon-for-ai/',
      type: 'design-system',
      rationale: 'Visual confidence indicators build trust through transparency',
    },
    {
      title: 'raw.studio (2024) - Building Trust Through Transparency',
      url: 'https://raw.studio/ai-transparency',
      type: 'paper',
      rationale: 'Showing AI certainty helps users make informed decisions',
    },
    {
      title: 'Microsoft HAX #1 - Make Clear What the System Can Do',
      url: 'https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/',
      type: 'guideline',
      rationale: 'Confidence levels set appropriate user expectations',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-button',
      relationship: 'complement',
      description: 'Can display confidence for AI-suggested actions',
    },
    {
      name: 'ai-variant-selector',
      relationship: 'complement',
      description: 'Show confidence for each variant option',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-confidence-meter \n  confidence="0.95"\n  label="Match Quality"\n  showPercentage\n  showLabel\n></ai-confidence-meter>`,
      description: 'High confidence display',
    },
    {
      framework: 'react',
      code: `import { AIConfidenceMeter } from '@ai-first-ds/react';\n\nfunction AIResult({ result }) {\n  return (\n    <div>\n      <AIConfidenceMeter \n        confidence={result.confidence}\n        label="Prediction Confidence"\n        size="large"\n        interactive\n        onConfidenceClick={(e) => showDetails(e.detail)}\n      />\n      <p>{result.content}</p>\n    </div>\n  );\n}`,
      description: 'React integration with result',
    },
  ],

  bestPractices: [
    'Always show confidence for AI predictions',
    'Use color coding (green/yellow/red) for quick understanding',
    'Provide details on click when interactive',
    'Set appropriate thresholds (0.8+ high, 0.5-0.8 medium, <0.5 low)',
  ],

  pitfalls: [
    "Don't hide low confidence scores",
    "Don't use misleading visualizations",
    "Don't show false precision (e.g., 0.9542 instead of 95%)",
  ],

  tags: ['confidence', 'transparency', 'trust', 'visualization', 'ai', 'probability'],
};
