import React, { useRef, useEffect } from 'react';
import type { ButtonVariant, Confidence } from '@ai-first-ds/core';

/**
 * React wrapper for ai-button component
 *
 * @see {@link https://lit.dev/docs/frameworks/react/ | Using Lit with React}
 */
export interface AIButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  aiGenerated?: boolean;
  confidence?: Confidence;
  children?: React.ReactNode;
}

export const AIButton = React.forwardRef<HTMLElement, AIButtonProps>(
  ({ variant, disabled, loading, aiGenerated, confidence, children, ...props }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Sync props to custom element properties
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customElement = element as any;
      if (variant !== undefined) customElement.variant = variant;
      if (disabled !== undefined) customElement.disabled = disabled;
      if (loading !== undefined) customElement.loading = loading;
      if (aiGenerated !== undefined) customElement.aiGenerated = aiGenerated;
      if (confidence !== undefined) customElement.confidence = confidence;
    }, [variant, disabled, loading, aiGenerated, confidence]);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(elementRef.current);
        } else {
          ref.current = elementRef.current;
        }
      }
    }, [ref]);

    return React.createElement(
      'ai-button',
      {
        ref: elementRef,
        ...props,
      },
      children
    );
  }
);

AIButton.displayName = 'AIButton';
