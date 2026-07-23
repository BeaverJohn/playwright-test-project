import { test as setup } from '../../fixtures/index';

export const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ loginPage, page }) => { 
  await loginPage.goto();
  await loginPage.loginWithDefaultCreds();
  await page.context().storageState({ path: authFile });
});