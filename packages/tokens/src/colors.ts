/**
 * Color tokens for the design system
 * 
 * @packageDocumentation
 * 
 * @reference
 * - WCAG 2.2 Color Contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
 * - Tailwind CSS Colors: https://tailwindcss.com/docs/customizing-colors
 */

export const colors = {
  /**
   * Primary brand color palette
   */
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  /**
   * Secondary/neutral gray palette
   */
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  /**
   * Success state colors
   */
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  /**
   * Warning state colors
   */
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  /**
   * Error/danger state colors
   */
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  /**
   * AI-specific gradient colors
   * Used for AI indicators, labels, and highlights
   * 
   * @reference IBM Carbon for AI visual identity
   */
  ai: {
    purple: {
      start: '#667eea',
      end: '#764ba2',
    },
    blue: {
      start: '#4facfe',
      end: '#00f2fe',
    },
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },

  /**
   * Semantic color aliases
   */
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
  },

  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
    inverse: '#111827',
  },

  border: {
    light: '#f3f4f6',
    default: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
} as const;

export type ColorToken = typeof colors;
export type ColorScale = keyof typeof colors;

