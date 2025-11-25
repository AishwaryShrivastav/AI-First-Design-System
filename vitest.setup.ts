/**
 * Vitest setup file
 * Runs before all tests
 *
 * @see https://vitest.dev/config/#setupfiles
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/dom';
import matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
