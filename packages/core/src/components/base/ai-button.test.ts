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
async function createButton(props: Partial<AIButton> = {}): Promise<AIButton> {
  const button = document.createElement('ai-button') as AIButton;
  Object.assign(button, props);
  document.body.appendChild(button);
  await button.updateComplete;
  return button;
}

describe('AIButton', () => {
  it('should render', async () => {
    const button = await createButton();
    expect(button).toBeTruthy();
    expect(button.tagName.toLowerCase()).toBe('ai-button');
    button.remove();
  });

  it('should have default variant', async () => {
    const button = await createButton();
    expect(button.variant).toBe('primary');
    button.remove();
  });

  it('should accept different variants', async () => {
    const button = await createButton({ variant: 'secondary' });
    expect(button.variant).toBe('secondary');
    button.remove();
  });

  it('should be disabled when disabled prop is true', async () => {
    const button = await createButton({ disabled: true });
    expect(button.disabled).toBe(true);
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton).toBeTruthy();
    expect(nativeButton?.disabled).toBe(true);
    button.remove();
  });

  it('should show loading state', async () => {
    const button = await createButton({ loading: true });
    expect(button.loading).toBe(true);
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton).toBeTruthy();
    expect(nativeButton?.disabled).toBe(true);
    button.remove();
  });

  it('should show AI indicator when aiGenerated is true', async () => {
    const button = await createButton({ aiGenerated: true });
    expect(button.aiGenerated).toBe(true);
    const aiIndicator = button.shadowRoot?.querySelector('.ai-indicator');
    expect(aiIndicator).toBeTruthy();
    button.remove();
  });

  it('should display confidence level', async () => {
    const button = await createButton({ aiGenerated: true, confidence: 0.95 });
    expect(button.confidence).toBe(0.95);
    const aiIndicator = button.shadowRoot?.querySelector('.ai-indicator');
    expect(aiIndicator).toBeTruthy();
    expect(aiIndicator?.textContent ?? '').toContain('95%');
    button.remove();
  });

  it('should have accessible attributes', async () => {
    const button = await createButton({ loading: true });
    const nativeButton = button.shadowRoot?.querySelector('button');
    expect(nativeButton).toBeTruthy();
    expect(nativeButton?.getAttribute('aria-busy')).toBe('true');
    button.remove();
  });
});
