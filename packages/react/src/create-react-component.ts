/**
 * Utility to create React wrappers for web components
 * 
 * This helper simplifies the creation of React wrappers by handling
 * property synchronization and ref forwarding automatically.
 * 
 * @packageDocumentation
 * 
 * @reference
 * - Lit React Integration: https://lit.dev/docs/frameworks/react/
 * - Web Components in React: https://reactjs.org/docs/web-components.html
 */

import React, { useRef, useEffect } from 'react';

/**
 * Creates a React component wrapper for a web component
 * 
 * @param tagName - The custom element tag name
 * @param propNames - Array of property names to sync from React props to element properties
 * @returns React component
 */
export function createReactComponent<T extends HTMLElement, P extends Record<string, any>>(
  tagName: string,
  propNames: (keyof P)[]
) {
  const Component = React.forwardRef<T, P & { children?: React.ReactNode }>(
    (props, ref) => {
      const elementRef = useRef<T>(null);
      const { children, ...restProps } = props;

      // Sync props to custom element properties
      useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        propNames.forEach(propName => {
          if (props[propName] !== undefined) {
            (element as any)[propName] = props[propName];
          }
        });
      }, propNames.map(name => props[name]));

      // Forward ref
      useEffect(() => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(elementRef.current);
          } else {
            ref.current = elementRef.current;
          }
        }
      }, [ref]);

      // Extract event handlers (onEventName)
      const eventHandlers: Record<string, any> = {};
      const elementProps: Record<string, any> = {};

      Object.keys(restProps).forEach(key => {
        if (key.startsWith('on') && typeof restProps[key] === 'function') {
          // Convert React event name to native event name
          // e.g., onClick -> click, onMessageSend -> message-send
          const eventName = key
            .slice(2)
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase()
            .slice(1);
          eventHandlers[eventName] = restProps[key];
        } else if (!propNames.includes(key as keyof P)) {
          elementProps[key] = restProps[key];
        }
      });

      // Attach event listeners
      useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const listeners: Array<[string, EventListener]> = [];

        Object.entries(eventHandlers).forEach(([eventName, handler]) => {
          element.addEventListener(eventName, handler);
          listeners.push([eventName, handler]);
        });

        return () => {
          listeners.forEach(([eventName, handler]) => {
            element?.removeEventListener(eventName, handler);
          });
        };
      }, [JSON.stringify(eventHandlers)]);

      return React.createElement(
        tagName,
        {
          ref: elementRef,
          ...elementProps,
        },
        children
      );
    }
  );

  Component.displayName = tagName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return Component;
}

