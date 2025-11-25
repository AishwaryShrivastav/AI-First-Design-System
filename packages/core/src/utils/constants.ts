/**
 * Design system constants and configuration
 *
 * @packageDocumentation
 */

/**
 * AI-specific CSS classes prefix
 * Helps identify AI-generated or AI-related content visually
 *
 * @reference IBM Carbon for AI - https://carbondesignsystem.com/guidelines/carbon-for-ai/
 */
export const AI_PREFIX = 'ai-ds';

/**
 * Minimum confidence threshold for displaying AI-generated content
 * Below this threshold, additional warnings should be shown
 *
 * @reference Microsoft HAX Toolkit - https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 */
export const MIN_CONFIDENCE_THRESHOLD = 0.7;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Z-index scale for layering components
 */
export const Z_INDEX = {
  dropdown: 1000,
  modal: 1100,
  tooltip: 1200,
  toast: 1300,
} as const;

/**
 * Keyboard key codes
 */
export const KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
} as const;
