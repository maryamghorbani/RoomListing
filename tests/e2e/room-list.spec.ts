import { test, expect } from '@playwright/test';

test('loads room listing and shows some rooms', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /room listing/i }),
  ).toBeVisible();

  const selectButtons = page.getByRole('button', { name: /select/i });
  await expect(selectButtons.first()).toBeVisible();
});
