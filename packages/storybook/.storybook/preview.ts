import type { Preview } from '@storybook/web-components';
// Import all components to ensure they're registered
// These imports register the custom elements via @customElement decorator
import '@ai-first-ds/core/components/base/ai-button';
import '@ai-first-ds/core/components/base/ai-input';
import '@ai-first-ds/core/components/base/ai-badge';
import '@ai-first-ds/core/components/ai/ai-chat-message';
import '@ai-first-ds/core/components/ai/ai-chat-interface';
import '@ai-first-ds/core/components/ai/ai-prompt-input';
import '@ai-first-ds/core/components/ai/ai-label';
import '@ai-first-ds/core/components/ai/ai-skeleton';
import '@ai-first-ds/core/components/ai/ai-streaming-text';
import '@ai-first-ds/core/components/ai/ai-explainability-panel';
import '@ai-first-ds/core/components/ai/ai-feedback';
import '@ai-first-ds/core/components/ai/ai-confidence-meter';
import '@ai-first-ds/core/components/ai/ai-error-recovery';
import '@ai-first-ds/core/components/ai/ai-variant-selector';
import '@ai-first-ds/core/components/ai/ai-prompt-templates';

/**
 * Storybook preview configuration
 *
 * @see https://storybook.js.org/docs/configure/overview#configure-story-rendering
 */
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
