import type { StorybookConfig } from '@storybook/web-components-vite';
import { resolve } from 'path';

/**
 * Storybook configuration for AI-First Design System
 *
 * @see https://storybook.js.org/docs/configure
 */
const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    // Ensure proper resolution of package subpath exports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ai-first-ds/core': resolve(__dirname, '../../core/src'),
    };

    return config;
  },
};

export default config;
