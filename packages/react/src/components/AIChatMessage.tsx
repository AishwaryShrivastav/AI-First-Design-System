import React, { useRef, useEffect } from 'react';
import type { AIRole } from '@ai-first-ds/core';

/**
 * React wrapper for ai-chat-message component
 */
export interface AIChatMessageProps extends React.HTMLAttributes<HTMLElement> {
  role?: AIRole;
  streaming?: boolean;
  timestamp?: string;
  showActions?: boolean;
  error?: boolean;
  children?: React.ReactNode;
}

export const AIChatMessage = React.forwardRef<HTMLElement, AIChatMessageProps>(
  ({ role, streaming, timestamp, showActions, error, children, ...props }, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customElement = element as any;
      if (role !== undefined) customElement.role = role;
      if (streaming !== undefined) customElement.streaming = streaming;
      if (timestamp !== undefined) customElement.timestamp = timestamp;
      if (showActions !== undefined) customElement.showActions = showActions;
      if (error !== undefined) customElement.error = error;
    }, [role, streaming, timestamp, showActions, error]);

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
      'ai-chat-message',
      {
        ref: elementRef,
        ...props,
      },
      children
    );
  }
);

AIChatMessage.displayName = 'AIChatMessage';
