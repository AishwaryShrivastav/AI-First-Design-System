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

      if (role !== undefined) (element as any).role = role;
      if (streaming !== undefined) (element as any).streaming = streaming;
      if (timestamp !== undefined) (element as any).timestamp = timestamp;
      if (showActions !== undefined) (element as any).showActions = showActions;
      if (error !== undefined) (element as any).error = error;
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

