/**
 * AI-First Design System - Core Package
 *
 * A comprehensive, framework-agnostic design system built specifically for AI products.
 *
 * @packageDocumentation
 *
 * @see {@link https://lit.dev/ | Lit} for Web Components documentation
 * @see {@link https://www.w3.org/WAI/ARIA/apg/ | WAI-ARIA} for accessibility patterns
 *
 * @example
 * ```html
 * <script type="module">
 *   import 'ai-first-design-system';
 * </script>
 *
 * <ai-button variant="primary">Click me</ai-button>
 * <ai-chat-message role="ai">Hello!</ai-chat-message>
 * ```
 */

// Base Components
export * from './components/base/ai-button';
export * from './components/base/ai-input';
export * from './components/base/ai-badge';

// AI-Specific Components
export * from './components/ai/ai-chat-message';
export * from './components/ai/ai-chat-interface';
export * from './components/ai/ai-prompt-input';
export * from './components/ai/ai-label';
export * from './components/ai/ai-skeleton';
export * from './components/ai/ai-streaming-text';
export * from './components/ai/ai-explainability-panel';
export * from './components/ai/ai-feedback';
export * from './components/ai/ai-confidence-meter';
export * from './components/ai/ai-error-recovery';
export * from './components/ai/ai-variant-selector';
export * from './components/ai/ai-prompt-templates';

// Utilities
export * from './utils/types';
export * from './utils/constants';
