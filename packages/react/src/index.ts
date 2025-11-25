/**
 * AI-First Design System - React Package
 *
 * React wrappers for web components
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import { AIButton, AIChatMessage } from '@ai-first-ds/react';
 *
 * function App() {
 *   return (
 *     <>
 *       <AIButton variant="primary">Click me</AIButton>
 *       <AIChatMessage role="ai">Hello!</AIChatMessage>
 *     </>
 *   );
 * }
 * ```
 */

// Import core components to register custom elements
import '@ai-first-ds/core';

// Export React wrappers
export * from './components/AIButton';
export * from './components/AIInput';
export * from './components/AIBadge';
export * from './components/AIChatMessage';
export * from './components/AIChatInterface';
export * from './components/AIPromptInput';
export * from './components/AILabel';
export * from './components/AISkeleton';
export * from './components/AIStreamingText';
export * from './components/AIExplainabilityPanel';
export * from './components/AIFeedback';

// Re-export types from core
export type {
  Confidence,
  AIRole,
  AIState,
  ButtonVariant,
  InputSize,
  ThemeMode,
  ExplainabilityLevel,
} from '@ai-first-ds/core';
