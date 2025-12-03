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

type WebComponentProps<P> = P & { children?: React.ReactNode };

/**
 * Creates a React component wrapper for a web component
 *
 * @param tagName - The custom element tag name
 * @param propNames - Array of property names to sync from React props to element properties
 * @returns React component
 */
export function createReactComponent<T extends HTMLElement, P>(
  tagName: string,
  propNames: (keyof P)[]
) {
  const Component = React.forwardRef<T, WebComponentProps<P>>((props, ref) => {
    const elementRef = useRef<T>(null);
    const typedProps = props as WebComponentProps<P>;
    const { children, ...restProps } = typedProps;

    // Sync props to custom element properties
    useEffect(
      () => {
        const element = elementRef.current;
        if (!element) return;

        const customElement = element as Record<string, unknown>;
        propNames.forEach(propName => {
          const value = typedProps[propName];
          if (value !== undefined) {
            customElement[propName as string] = value;
          }
        });
      },
      propNames.map(name => typedProps[name])
    );

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

    const eventHandlers: Record<string, EventListener> = {};
    const elementProps: Record<string, unknown> = {};
    const restPropsRecord = restProps as Record<string, unknown>;

    Object.keys(restPropsRecord).forEach(key => {
      const value = restPropsRecord[key];
      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key
          .slice(2)
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()
          .slice(1);
        eventHandlers[eventName] = value as EventListener;
      } else if (!propNames.includes(key as keyof P)) {
        elementProps[key] = value;
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
      children as React.ReactNode
    );
  });

  Component.displayName = tagName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return Component;
}
