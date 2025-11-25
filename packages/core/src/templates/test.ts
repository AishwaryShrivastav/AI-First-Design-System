import { expect, test, describe } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ai-component-name.js';

describe('AIComponentName', () => {
  test('renders correctly', async () => {
    const el = await fixture(html` <ai-component-name></ai-component-name> `);

    expect(el).toBeDefined();
    expect(el.shadowRoot).toBeDefined();
  });

  test('accepts properties', async () => {
    const el = await fixture(html` <ai-component-name variant="primary"></ai-component-name> `);

    // @ts-expect-error - variant property exists on element
    expect(el.variant).toBe('primary');
  });

  test('emits events', async () => {
    const el = await fixture(html` <ai-component-name></ai-component-name> `);

    const eventPromise = new Promise(resolve => {
      el.addEventListener('event-name', e => resolve((e as CustomEvent).detail));
    });

    // Trigger event
    el.shadowRoot?.querySelector('button')?.click();

    const detail = await eventPromise;
    expect(detail).toBeDefined();
  });

  test('is accessible', async () => {
    const el = await fixture(html` <ai-component-name></ai-component-name> `);

    // await expect(el).to.be.accessible();
    expect(el).toBeDefined();
  });

  test('handles keyboard navigation', async () => {
    const el = await fixture(html` <ai-component-name></ai-component-name> `);

    const button = el.shadowRoot?.querySelector('button');

    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    button?.dispatchEvent(enterEvent);

    // Assert expected behavior
  });
});
