/**
 * Component metadata type definitions for AI tool discoverability.
 *
 * These types enable AI coding tools to understand component structure,
 * usage patterns, and design rationale through structured data.
 *
 * @reference
 * - Design Systems Collective: "Building AI-Ready Design Systems with Structured Data" (2024)
 * - Supernova: "Making Design Systems AI-Ready" (2024)
 */

/**
 * WCAG compliance level
 */
export type WCAGLevel = 'A' | 'AA' | 'AAA';

/**
 * Component category for organization
 */
export type ComponentCategory =
  | 'base' // Base UI components (button, input, etc.)
  | 'ai-specific' // AI-specific components (chat, explainability, etc.)
  | 'layout' // Layout components
  | 'feedback' // Feedback components
  | 'navigation' // Navigation components
  | 'data-display'; // Data display components

/**
 * Component maturity status
 */
export type ComponentStatus = 'stable' | 'beta' | 'experimental' | 'deprecated';

/**
 * Usage context where component is commonly used
 */
export type UsageContext =
  | 'conversational' // Chat interfaces, dialogs
  | 'data-entry' // Forms, inputs
  | 'informational' // Displays, cards
  | 'navigation' // Menus, links
  | 'feedback' // Alerts, notifications
  | 'interactive'; // Buttons, controls

/**
 * Property metadata for component props
 */
export interface PropertyMetadata {
  name: string;
  type: string;
  required: boolean;
  default?: string | number | boolean;
  description: string;
  /**
   * Examples of valid values
   */
  examples?: Array<string | number | boolean>;
}

/**
 * Event metadata for component-fired events
 */
export interface EventMetadata {
  name: string;
  description: string;
  /**
   * Detail type for CustomEvent
   */
  detailType?: string;
}

/**
 * Slot metadata for content slots
 */
export interface SlotMetadata {
  name: string;
  description: string;
  /**
   * Whether this slot is required
   */
  required?: boolean;
}

/**
 * CSS custom property metadata
 */
export interface CSSPropertyMetadata {
  name: string;
  description: string;
  default?: string;
  /**
   * Examples of valid values
   */
  examples?: string[];
}

/**
 * Research citation for design decisions
 */
export interface ResearchCitation {
  /**
   * Source title or name
   */
  title: string;
  /**
   * URL to resource
   */
  url: string;
  /**
   * Type of source
   */
  type: 'paper' | 'design-system' | 'guideline' | 'specification';
  /**
   * Brief description of what this citation supports
   */
  rationale: string;
}

/**
 * Accessibility information
 */
export interface AccessibilityMetadata {
  /**
   * WCAG compliance level
   */
  wcagLevel: WCAGLevel;
  /**
   * ARIA roles used
   */
  ariaRoles?: string[];
  /**
   * Keyboard navigation support
   */
  keyboardNavigation: string[];
  /**
   * Screen reader considerations
   */
  screenReaderNotes?: string;
}

/**
 * Related component information
 */
export interface RelatedComponent {
  /**
   * Component element name
   */
  name: string;
  /**
   * Relationship type
   */
  relationship: 'parent' | 'child' | 'sibling' | 'alternative' | 'complement';
  /**
   * Description of relationship
   */
  description: string;
}

/**
 * Complete component metadata
 *
 * This structure provides comprehensive information about a component
 * in a machine-readable format optimized for AI tool consumption.
 */
export interface ComponentMetadata {
  /**
   * Component element name (e.g., 'ai-button')
   */
  name: string;

  /**
   * Display name for documentation
   */
  displayName: string;

  /**
   * Brief description
   */
  description: string;

  /**
   * Category classification
   */
  category: ComponentCategory;

  /**
   * Maturity status
   */
  status: ComponentStatus;

  /**
   * Version when component was introduced
   */
  since: string;

  /**
   * Usage contexts where this component is commonly used
   */
  usageContexts: UsageContext[];

  /**
   * Component properties/attributes
   */
  properties: PropertyMetadata[];

  /**
   * Events fired by component
   */
  events: EventMetadata[];

  /**
   * Content slots
   */
  slots: SlotMetadata[];

  /**
   * CSS custom properties for theming
   */
  cssProperties: CSSPropertyMetadata[];

  /**
   * Accessibility information
   */
  accessibility: AccessibilityMetadata;

  /**
   * Research citations justifying design decisions
   */
  research: ResearchCitation[];

  /**
   * Related components
   */
  relatedComponents: RelatedComponent[];

  /**
   * Code examples
   */
  examples: {
    /**
     * Framework/environment
     */
    framework: 'vanilla' | 'react' | 'vue' | 'svelte';
    /**
     * Example code
     */
    code: string;
    /**
     * Description of example
     */
    description: string;
  }[];

  /**
   * Best practices and recommendations
   */
  bestPractices?: string[];

  /**
   * Common pitfalls to avoid
   */
  pitfalls?: string[];

  /**
   * Tags for searchability
   */
  tags: string[];
}

/**
 * Design token metadata
 */
export interface TokenMetadata {
  /**
   * Token name
   */
  name: string;

  /**
   * Token value
   */
  value: string;

  /**
   * Token category
   */
  category: 'color' | 'typography' | 'spacing' | 'ai-specific' | 'animation';

  /**
   * Description
   */
  description: string;

  /**
   * Usage examples
   */
  usage?: string[];
}

/**
 * Complete component registry
 */
export interface ComponentRegistry {
  /**
   * Registry version
   */
  version: string;

  /**
   * Generation timestamp
   */
  generated: string;

  /**
   * All components
   */
  components: ComponentMetadata[];

  /**
   * All design tokens
   */
  tokens: TokenMetadata[];
}
