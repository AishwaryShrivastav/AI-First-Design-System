/**
 * Common types used across the design system
 *
 * @packageDocumentation
 */

/**
 * AI confidence level between 0 and 1
 */
export type Confidence = number;

/**
 * Role in AI conversation
 *
 * @reference Chat UI patterns from modern AI products (ChatGPT, Claude, Perplexity)
 */
export type AIRole = 'user' | 'ai' | 'system';

/**
 * AI processing state
 *
 * @reference PatternFly AI Guidelines - https://www.patternfly.org/patternfly-ai/ai-guidelines/
 */
export type AIState = 'idle' | 'thinking' | 'generating' | 'streaming' | 'complete' | 'error';

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Input sizes
 */
export type InputSize = 'small' | 'medium' | 'large';

/**
 * Theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * AI explainability disclosure level
 *
 * @reference SAP Fiori Explainable AI - https://experience.sap.com/fiori-design-web/explainable-ai/
 */
export type ExplainabilityLevel = 'what' | 'why' | 'how';
