/**
 * Tests for AIButton component
 * 
 * @vitest-environment jsdom
 */

import { describe, it, expect } from 'vitest';
import './ai-button';
import type { AIButton } from './ai-button';

/**
 * Helper to create and render a button
 */
function createButton(props: Partial<AIButton> = {}): AIButton {
  const button = document.createElement('ai-button') as AIButton;
  Object.assign(button, props);
  document.body.appendChild(button);
  return button;
}

describe('AIButton', () => {
  it('should render', () => {
    const button = createButton();
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('ai-button');
    document.body.removeChild(button);
  });

  it('should have default variant', () => {
    const button = createButton();
    expect(button.variant).toBe('primary');
    document.body.removeChild(button);
  });

  it('should accept different variants', () => {
    const button = createButton({ variant: 'secondary' });
    expect(button.variant).toBe('secondary');
    document.body.removeChild(button);
  });

  it('should be disabled when disabled prop is true', () => {
    const button = createButton({ disabled: true });
    expect(button.disabled).toBe(true);
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton?.disabled).toBe(true);
    document.body.removeChild(button);
  });

  it('should show loading state', () => {
    const button = createButton({ loading: true });
    expect(button.loading).toBe(true);
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton?.disabled).toBe(true);
    document.body.removeChild(button);
  });

  it('should show AI indicator when aiGenerated is true', () => {
    const button = createButton({ aiGenerated: true });
    expect(button.aiGenerated).toBe(true);
    const aiIndicator = button.shadowRoot?.querySelector('.ai-indicator');
    expect(aiIndicator).toBeTruthy();
    document.body.removeChild(button);
  });

  it('should display confidence level', () => {
    const button = createButton({ aiGenerated: true, confidence: 0.95 });
    expect(button.confidence).toBe(0.95);
    const aiIndicator = button.shadowRoot?.querySelector('.ai-indicator');
    expect(aiIndicator?.textContent).toContain('95%');
    document.body.removeChild(button);
  });

  it('should have accessible attributes', () => {
    const button = createButton({ loading: true });
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton?.getAttribute('aria-busy')).toBe('true');
    document.body.removeChild(button);
  });
});

