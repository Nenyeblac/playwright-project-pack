
import{test, expect} from '@playwright/test';

test('Login to Sauce Demo', async ({page}) => {

await page.goto('https://www.saucedemo.com');

await page.getByPlaceholder('Username').fill('standard_user');

await page.getByPlaceholder('Password').fill('secret_sauce');

await page.getByRole('button', {name: 'Login'}).click;

await page.waitForURL('**/inventory.html');

await expect(page.getByText('Products')).toBeVisible();
});