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
    await injectAxe(page);
  });

  test('should render primary button', async ({ page }) => {
    const button = page.locator('ai-button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click me');
  });

  test('should be clickable', async ({ page }) => {
    const button = page.locator('ai-button');
    await button.click();
    // Button should respond to click (you can add more assertions based on behavior)
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('ai-button');
    await button.focus();
    await expect(button).toBeFocused();
    
    // Press Enter
    await page.keyboard.press('Enter');
    
    // Press Space
    await page.keyboard.press('Space');
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Run axe accessibility tests
    await checkA11y(page, 'ai-button', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test('should show loading state', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--loading');
    const button = page.locator('ai-button');
    await expect(button).toHaveAttribute('loading');
    const spinner = button.locator('.loading-spinner');
    await expect(spinner).toBeVisible();
  });

  test('should show AI indicator', async ({ page }) => {
    await page.goto('/iframe.html?id=base-components-button--ai-generated');
    const button = page.locator('ai-button');
    const aiIndicator = button.locator('.ai-indicator');
    await expect(aiIndicator).toBeVisible();
  });

  test('should handle different variants', async ({ page }) => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'];
    
    for (const variant of variants) {
      await page.goto(`/iframe.html?id=base-components-button--${variant}`);
      const button = page.locator('ai-button');
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('variant', variant);
    }
  });

  test('should match visual snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('button-primary.png');
  });
});

