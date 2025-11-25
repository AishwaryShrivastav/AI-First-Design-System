/**
 * AI-specific design tokens
 * 
 * @packageDocumentation
 * 
 * @reference
 * - IBM Carbon for AI: https://carbondesignsystem.com/guidelines/carbon-for-ai/
 * - Microsoft HAX Toolkit: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 */

export const aiTokens = {
  /**
   * AI confidence level colors
   * Used to visualize AI certainty in decisions
   */
  confidence: {
    high: '#22c55e', // Green for >80%
    medium: '#f59e0b', // Orange for 50-80%
    low: '#ef4444', // Red for <50%
  },

  /**
   * AI state colors
   */
  states: {
    thinking: '#6366f1', // Indigo
    generating: '#8b5cf6', // Purple
    streaming: '#a855f7', // Purple-pink
    complete: '#22c55e', // Green
    error: '#ef4444', // Red
  },

  /**
   * AI gradients for visual identity
   */
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },

  /**
   * AI indicator sizes
   */
  indicatorSizes: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },

  /**
   * AI processing animation durations
   */
  processing: {
    thinkingDuration: '2s',
    streamingSpeed: '20ms',
    pulseInterval: '2s',
  },

  /**
   * Confidence thresholds
   */
  thresholds: {
    highConfidence: 0.8,
    mediumConfidence: 0.5,
    lowConfidence: 0.3,
  },
} as const;

export type AIToken = typeof aiTokens;

