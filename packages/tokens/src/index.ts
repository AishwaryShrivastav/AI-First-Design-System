/**
 * AI-First Design System - Design Tokens
 * 
 * Centralized design tokens for colors, typography, spacing, and AI-specific styling.
 * 
 * @packageDocumentation
 * 
 * @see {@link https://www.w3.org/community/design-tokens/ | Design Tokens Community Group}
 * @see {@link https://tailwindcss.com/docs/customizing-colors | Tailwind CSS Customization}
 * 
 * @example
 * ```typescript
 * import { colors, spacing, typography } from '@ai-first-ds/tokens';
 * 
 * // Use in your styles
 * const buttonStyle = {
 *   background: colors.primary[500],
 *   padding: spacing[4],
 *   fontSize: typography.sizes.md,
 * };
 * ```
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './animation';
export * from './ai-tokens';

