/**
 * AI-specific design tokens
 *
 * Comprehensive tokens for AI-first interfaces based on 2024-2025 research.
 * These tokens support transparency, explainability, contextual awareness,
 * and conversational interfaces.
 *
 * @packageDocumentation
 *
 * @reference
 * - IBM Carbon for AI: https://carbondesignsystem.com/guidelines/carbon-for-ai/
 * - Microsoft HAX Toolkit: https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/
 * - Design Systems Collective: "AI-First Design Tokens" (2024)
 */

export const aiTokens = {
  /**
   * AI confidence level colors
   * Used to visualize AI certainty in decisions
   *
   * @reference IBM Carbon for AI - Confidence visualization
   */
  confidence: {
    high: '#22c55e', // Green for >80%
    medium: '#f59e0b', // Orange for 50-80%
    low: '#ef4444', // Red for <50%
    unknown: '#9ca3af', // Gray for unavailable
  },

  /**
   * AI state colors for different processing states
   */
  states: {
    thinking: '#6366f1', // Indigo - AI is processing
    generating: '#8b5cf6', // Purple - AI is creating content
    streaming: '#a855f7', // Purple-pink - Real-time output
    complete: '#22c55e', // Green - Task finished
    error: '#ef4444', // Red - Error occurred
    waiting: '#f59e0b', // Orange - Waiting for input
  },

  /**
   * AI gradients for visual identity and brand consistency
   *
   * @reference IBM Carbon for AI - Visual identity
   */
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    warning: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    thinking: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    streaming: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
  },

  /**
   * Transparency indicators - visual markers for AI involvement
   *
   * @reference Microsoft HAX #1 - Make clear what the system can do
   */
  transparency: {
    labelBg: 'rgba(102, 126, 234, 0.1)', // Light purple background
    labelBorder: 'rgba(102, 126, 234, 0.3)', // Purple border
    labelText: '#667eea', // Purple text
    indicatorSize: '0.5rem', // Small dot indicator
    badgeRadius: '0.25rem', // Rounded badge
  },

  /**
   * Contextual awareness - tokens for adaptive UI elements
   *
   * @reference Design Systems Collective (2024) - Context-aware design
   */
  contextual: {
    focusBorder: '#3b82f6', // Blue for focused AI elements
    hoverBg: 'rgba(59, 130, 246, 0.05)', // Subtle blue hover
    activeBg: 'rgba(59, 130, 246, 0.1)', // Stronger blue active
    suggestionBg: 'rgba(156, 163, 175, 0.1)', // Gray for suggestions
    suggestionText: '#6b7280', // Gray text for ghost text
  },

  /**
   * Conversational interface tokens
   *
   * @reference IBM Carbon Chat UI Patterns
   */
  conversation: {
    userMessageBg: '#f3f4f6', // Light gray for user
    aiMessageBg: '#eff6ff', // Light blue for AI
    systemMessageBg: '#fef3c7', // Light yellow for system
    messagePadding: '0.75rem 1rem', // Comfortable padding
    messageRadius: '0.75rem', // Rounded bubbles
    messageGap: '0.75rem', // Space between messages
    avatarSize: '2rem', // Avatar dimensions
    timestampColor: '#9ca3af', // Gray for timestamps
  },

  /**
   * Explainability UI tokens
   *
   * @reference SAP Fiori Explainable AI
   */
  explainability: {
    panelBg: '#ffffff', // White background
    panelBorder: '#e5e7eb', // Light gray border
    sectionBg: '#f9fafb', // Very light gray sections
    highlightBg: '#fef3c7', // Yellow for important info
    technicalBg: '#f3f4f6', // Gray for technical details
    iconColor: '#667eea', // Purple for XAI icons
  },

  /**
   * AI indicator sizes for different contexts
   */
  indicatorSizes: {
    xs: '0.375rem', // Extra small dot
    sm: '0.5rem', // Small badge
    md: '0.75rem', // Medium indicator
    lg: '1rem', // Large badge
    xl: '1.25rem', // Extra large
  },

  /**
   * AI processing animation durations
   *
   * @reference Modern AI UX (ChatGPT, Claude) - Streaming patterns
   */
  processing: {
    thinkingDuration: '2s', // Pulse animation for thinking
    streamingSpeed: '20ms', // Token-by-token speed
    pulseInterval: '2s', // Breathing animation
    fadeIn: '200ms', // Smooth appearance
    fadeOut: '150ms', // Smooth disappearance
    skeletonPulse: '1.5s', // Skeleton loader pulse
  },

  /**
   * Confidence thresholds for decision-making
   */
  thresholds: {
    highConfidence: 0.8, // Show as high confidence
    mediumConfidence: 0.5, // Show as medium confidence
    lowConfidence: 0.3, // Show as low confidence
    minDisplay: 0.1, // Minimum to display
  },

  /**
   * Adaptive layout tokens
   *
   * @reference Design Shack (2024) - Adaptive UIs
   */
  adaptive: {
    transitionSpeed: '300ms', // Smooth layout changes
    containerMaxWidth: '48rem', // Optimal reading width
    sidebarWidth: '16rem', // Contextual sidebar
    compactSpacing: '0.5rem', // Tight spacing
    comfortableSpacing: '1rem', // Normal spacing
    spaciousSpacing: '1.5rem', // Generous spacing
  },

  /**
   * Feedback and interaction tokens
   *
   * @reference Microsoft HAX #10 - User control
   */
  feedback: {
    positiveColor: '#22c55e', // Green for positive
    negativeColor: '#ef4444', // Red for negative
    neutralColor: '#9ca3af', // Gray for neutral
    hoverScale: '1.05', // Subtle scale on hover
    activeScale: '0.95', // Press effect
    feedbackIconSize: '1.25rem', // Thumbs up/down size
  },

  /**
   * Streaming text tokens
   */
  streaming: {
    cursorColor: '#667eea', // Purple cursor
    cursorWidth: '2px', // Thin cursor
    cursorBlink: '1s', // Blink speed
    characterDelay: '20ms', // Delay between chars
    wordDelay: '50ms', // Delay between words
  },

  /**
   * Skeleton loader tokens
   */
  skeleton: {
    baseColor: '#f3f4f6', // Light gray base
    highlightColor: '#e5e7eb', // Slightly darker highlight
    animationDuration: '1.5s', // Shimmer speed
    borderRadius: '0.375rem', // Rounded corners
  },
} as const;

export type AIToken = typeof aiTokens;
