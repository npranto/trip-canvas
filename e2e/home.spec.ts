import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test('shows TripCanvas heading and intro copy', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'TripCanvas' })).toBeVisible();
    await expect(page.getByText(/AI-native travel planning prototype/i)).toBeVisible();
  });
});
