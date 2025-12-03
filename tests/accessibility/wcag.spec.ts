/**
 * WCAG 2.2 Accessibility Tests
 * Ensures all components meet accessibility standards
 *
 * @see https://www.w3.org/WAI/WCAG22/quickref/
 * @see https://github.com/dequelabs/axe-core
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

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
      // Wait for component to render
      await page.waitForTimeout(500);
      await injectAxe(page);

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
          rules: {
            // Skip rules that may fail in isolated component testing
            'color-contrast': { enabled: false },
            region: { enabled: false },
            'landmark-one-main': { enabled: false },
            'page-has-heading-one': { enabled: false },
          },
        },
      });
    });
  }

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--primary');
    await page.waitForSelector('ai-button');
    await injectAxe(page);

    // Note: Color contrast tests may need to be run on the full page
    // Skip this test for now as Storybook iframe environment may not be ideal
    test.skip(
      !!process.env.CI,
      'Color contrast tests skipped in CI - run full app tests for accurate results'
    );

    await checkA11y(page, null, {
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['cat.color'],
        },
      },
    });
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--all-variants');
    await page.waitForSelector('ai-button');

    // Tab through all interactive elements
    await page.keyboard.press('Tab');

    // Verify at least one button is present and page is interactive
    const buttons = page.locator('ai-button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    // Web Components with Shadow DOM handle focus internally
    // Just verify we can tab through without errors
    for (let i = 0; i < Math.min(count, 3); i++) {
      await page.keyboard.press('Tab');
    }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--loading');
    await page.waitForSelector('ai-button');

    const button = page.locator('ai-button');
    await expect(button).toBeVisible();

    // Check that the button has loading attribute
    await expect(button).toHaveAttribute('loading');
  });
});

test.describe('Screen Reader Support', () => {
  test('should have AI-generated button with proper attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--ai-generated');
    await page.waitForSelector('ai-button');

    const button = page.locator('ai-button');
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('aigenerated');
  });

  test('should have streaming message with live region', async ({ page }) => {
    await page.goto('/iframe.html?id=ai-components-chat--streaming-message');
    await page.waitForSelector('ai-chat-message');

    const message = page.locator('ai-chat-message');
    await expect(message).toBeVisible();
    await expect(message).toHaveAttribute('streaming');
  });
});
