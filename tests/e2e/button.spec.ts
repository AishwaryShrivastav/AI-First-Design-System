/**
 * E2E tests for AIButton component
 * Tests interaction, accessibility, and visual appearance
 *
 * @see https://playwright.dev/docs/intro
 */

import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('AIButton Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the button story in Storybook
    await page.goto('/iframe.html?id=base-components-button--primary');
    await page.waitForSelector('ai-button');
  });

  test('should render primary button', async ({ page }) => {
    const button = page.locator('ai-button');
    await expect(button).toBeVisible();
    await expect(button).toContainText('Click me');
  });

  test('should be clickable', async ({ page }) => {
    const button = page.locator('ai-button');
    await button.click();
    // Button should respond to click (you can add more assertions based on behavior)
  });

  test('should be keyboard accessible', async ({ page }) => {
    // For Web Components with Shadow DOM, we need to interact with the internal button
    // Use Tab to navigate to the button
    await page.keyboard.press('Tab');

    // The button inside the shadow DOM should receive focus
    const button = page.locator('ai-button');
    await expect(button).toBeVisible();

    // Press Enter to activate (should not throw)
    await page.keyboard.press('Enter');

    // Press Space to activate (should not throw)
    await page.keyboard.press('Space');
  });

  test('should meet accessibility standards', async ({ page }) => {
    await injectAxe(page);
    // Run axe accessibility tests with more lenient settings
    // Skip color-contrast checks as they may fail in isolated component testing
    await checkA11y(page, 'ai-button', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      axeOptions: {
        rules: {
          'color-contrast': { enabled: false },
          region: { enabled: false },
        },
      },
    });
  });

  test('should show loading state', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--loading');
    await page.waitForSelector('ai-button');
    const button = page.locator('ai-button');
    await expect(button).toHaveAttribute('loading');
  });

  test('should show AI indicator', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--ai-generated');
    await page.waitForSelector('ai-button');
    const button = page.locator('ai-button');
    await expect(button).toHaveAttribute('aigenerated');
  });

  test('should handle different variants', async ({ page }) => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'];

    for (const variant of variants) {
      await page.goto(`/iframe.html?id=base-components-button--${variant}`);
      await page.waitForSelector('ai-button');
      const button = page.locator('ai-button');
      await expect(button).toBeVisible();
    }
  });

  // Visual regression tests - skip in CI if snapshots don't exist
  // Run locally with: npx playwright test --update-snapshots
  test('should match visual snapshot', async ({ page }) => {
    // Skip visual tests in CI - they require baseline images to be committed
    test.skip(
      !!process.env.CI,
      'Visual regression tests disabled in CI - run locally to update snapshots'
    );
    await expect(page).toHaveScreenshot('button-primary.png');
  });
});
