import { test, expect, Page } from '@playwright/test';

const waitForTable = async (page: Page) => {
  const skeleton = page.locator('[data-testid="skeleton-table"]');
  await expect(skeleton).toBeVisible();
  await expect(skeleton).not.toBeVisible();
};

const expectTableToHaveRows = async (page: Page) => {
  const rows = page.locator('table tbody tr');
  await expect(rows.first()).toBeVisible();
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);
};

test.describe('IssuesList E2E', () => {
  test('should display issues in table on first load', async ({ page }) => {
    await page.goto('/');
    await waitForTable(page);
    await expectTableToHaveRows(page);
  });

  test('filters only open issues', async ({ page }) => {
    await page.goto('/');
    await waitForTable(page);

    await page.getByRole('button', { name: 'Open' }).click();
    await waitForTable(page);

    const rows = page.locator('table tbody tr');

    await expect(rows.filter({ hasText: 'OPEN' })).not.toHaveCount(0);
    await expect(rows.filter({ hasText: 'CLOSED' })).toHaveCount(0);
  });

  test('filters only closed issues', async ({ page }) => {
    await page.goto('/');
    await waitForTable(page);

    await page.getByRole('button', { name: 'Closed' }).click();
    await waitForTable(page);

    const rows = page.locator('table tbody tr');

    await expect(rows.filter({ hasText: 'CLOSED' })).not.toHaveCount(0);
    await expect(rows.filter({ hasText: 'OPEN' })).toHaveCount(0);
  });

  test('search filter shows issue and opens modal with title', async ({ page }) => {
    await page.goto('/');
    await waitForTable(page);

    const query = '[React 19] Error when use';
    await page.getByRole('textbox', { name: 'Search Issues' }).fill(query);
    await waitForTable(page);

    const issueCell = page.getByRole('cell', { name: query });
    await expect(issueCell).toBeVisible();
    await issueCell.click();

    await expect(
      page.getByRole('heading', {
        name: '[React 19] Error when use create-react-app',
      })
    ).toBeVisible();
  });
});
