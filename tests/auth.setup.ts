import { test as setup, expect } from '@playwright/test';
import * as path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Go to Landing page
  await page.goto('/');

  // Navigate to login
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('menuitem', { name: 'Login ke POS Penjualan &' }).click();

  // Perform login
  const username = process.env.POS_USER || '';
  const password = process.env.POS_PASS || '';

  await page.getByRole('textbox', { name: 'Username or Email' }).click();
  await page.getByRole('textbox', { name: 'Username or Email' }).fill(username);
  
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait until the dashboard loads, marked by the Select Store button or similar
  await expect(page.getByRole('button', { name: 'Select Store' })).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
