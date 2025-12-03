import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for AI-First Design System
 *
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.test.ts'],
    exclude: ['tests/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.stories.ts',
        '**/*.config.ts',
        '**/vitest.setup.ts',
      ],
    },
  },
});
