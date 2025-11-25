/**
 * Commitlint configuration
 * Ensures commit messages follow conventional commits format
 * 
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Other changes (dependencies, etc.)
        'revert',   // Revert a previous commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'core',
        'react',
        'vue',
        'svelte',
        'tokens',
        'storybook',
        'deps',
        'ci',
        'docs',
      ],
    ],
    'subject-case': [2, 'never', ['upper-case']],
    'header-max-length': [2, 'always', 100],
  },
};

