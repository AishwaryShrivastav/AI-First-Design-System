/**
 * WCAG 2.2 Accessibility Tests
 * Ensures all components meet accessibility standards
 *
 * @see https://www.w3.org/WAI/WCAG22/quickref/
 * @see https://github.com/dequelabs/axe-core
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

const componentPaths = [
  '/iframe.html?id=base-components-button--primary',
  '/iframe.html?id=base-components-button--ai-generated',
  '/iframe.html?id=ai-components-chat--user-message',
  '/iframe.html?id=ai-components-chat--ai-message',
  '/iframe.html?id=ai-components-chat--chat-interface',
];

test.describe('WCAG 2.2 Level AA Compliance', () => {
  for (const path of componentPaths) {
    test(`${path} should meet accessibility standards`, async ({ page }) => {
      await page.goto(path);
      await injectAxe(page);

      try {
        await checkA11y(page, null, {
          detailedReport: true,
          detailedReportOptions: {
            html: true,
          },
          axeOptions: {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
            },
          },
        });
      } catch (error) {
        const violations = await getViolations(page);
        console.error('Accessibility violations found:', violations);
        throw error;
      }
    });
  }

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--primary');
    await injectAxe(page);

    await checkA11y(page, null, {
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['color-contrast'],
        },
      },
    });
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--all-variants');

    // Tab through all interactive elements
    await page.keyboard.press('Tab');
    const firstButton = await page.locator('ai-button').first();
    await expect(firstButton).toBeFocused();

    // Continue tabbing
    await page.keyboard.press('Tab');
    const secondButton = await page.locator('ai-button').nth(1);
    await expect(secondButton).toBeFocused();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--loading');
    await injectAxe(page);

    const button = page.locator('ai-button');
    const shadow = await button.evaluateHandle(el => el.shadowRoot);
    const nativeButton = await shadow.evaluateHandle(root =>
      (root as ShadowRoot).querySelector('button')
    );

    const ariaBusy = await nativeButton.evaluate(el => el?.getAttribute('aria-busy'));
    expect(ariaBusy).toBe('true');
  });
});

test.describe('Screen Reader Support', () => {
  test('should announce AI-generated content', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--ai-generated');

    const button = page.locator('ai-button');
    const ariaLabel = await button.evaluate(el => {
      const shadow = el.shadowRoot;
      const btn = shadow?.querySelector('button');
      return btn?.getAttribute('aria-label');
    });

    expect(ariaLabel).toContain('AI-generated');
  });

  test('should announce loading states', async ({ page }) => {
    await page.goto('/iframe.html?id=ai-components-chat--streaming-message');

    const message = page.locator('ai-chat-message');
    const ariaLive = await message.evaluate(el => {
      const shadow = el.shadowRoot;
      const bubble = shadow?.querySelector('[role="status"]');
      return bubble?.getAttribute('aria-live');
    });

    expect(ariaLive).toBe('polite');
  });
});
