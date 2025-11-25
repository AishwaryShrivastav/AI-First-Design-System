import type { Preview } from '@storybook/web-components';
import '@ai-first-ds/core';

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
