import type { ComponentMetadata } from '../metadata/types.js';

/**
 * [Component Name] metadata
 */
export const aiComponentNameMetadata: ComponentMetadata = {
  name: 'ai-component-name',
  displayName: '[Component Display Name]',
  description: '[Detailed description of component purpose and usage]',
  category: 'ai-specific', // or 'base'
  status: 'stable', // or 'experimental', 'deprecated'
  since: '0.2.0', // Version when introduced
  usageContexts: ['conversational'], // See UsageContext type

  properties: [
    {
      name: 'variant',
      type: "'default' | 'primary'",
      required: false,
      default: 'default',
      description: 'Visual variant of the component',
      examples: ['default', 'primary'],
    },
    // ... more properties
  ],

  events: [
    {
      name: 'event-name',
      description: 'Fired when [event occurs]',
      detailType: '{ data: string }',
    },
    // ... more events
  ],

  slots: [
    {
      name: '', // Default slot
      description: 'Default content slot',
    },
    // ... more slots
  ],

  cssProperties: [
    {
      name: '--component-bg',
      description: 'Background color',
      default: '#ffffff',
    },
    // ... more CSS properties
  ],

  accessibility: {
    wcagLevel: 'AA',
    ariaRoles: ['button'], // or other roles
    keyboardNavigation: ['Tab', 'Enter', 'Space'],
    screenReaderNotes: 'Announces [what screen reader says]',
  },

  // CRITICAL: 2+ research citations required
  research: [
    {
      title: '[Source 1 Full Title with Year]',
      url: 'https://...',
      type: 'design-system', // or 'guideline', 'paper', 'specification'
      rationale:
        '[Why this research matters for this component. Be specific about what pattern or finding supports the design.]',
    },
    {
      title: '[Source 2 Full Title with Year]',
      url: 'https://...',
      type: 'guideline',
      rationale: '[Additional supporting evidence and how it applies.]',
    },
  ],

  relatedComponents: [
    {
      name: 'ai-related-component',
      relationship: 'complement', // or 'alternative', 'parent', 'child'
      description: 'How this relates',
    },
  ],

  examples: [
    {
      framework: 'vanilla',
      code: `<ai-component-name
  variant="primary"
></ai-component-name>`,
      description: 'Basic usage',
    },
    {
      framework: 'react',
      code: `import { AIComponentName } from '@ai-first-ds/react';

function App() {
  return (
    <AIComponentName
      variant="primary"
      onEventName={(e) => console.log(e.detail)}
    />
  );
}`,
      description: 'React integration',
    },
  ],

  bestPractices: [
    'Use [component] when [scenario]',
    'Consider [alternative] for [different scenario]',
    'Always provide [required prop/slot]',
    'Ensure [accessibility consideration]',
  ],

  pitfalls: [
    "Don't use [component] for [wrong scenario]",
    "Don't forget [critical prop]",
    'Avoid [common mistake]',
  ],

  tags: ['ai', 'component', 'relevant', 'keywords'],
};
