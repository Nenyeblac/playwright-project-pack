

import { test, expect } from '@playwright/test';
 
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
 
test.describe('SauceDemo Login Tests', () => {
 
test('successful login with standard user', async ({ page }) => {
 
const loginPage = new LoginPage(page);
 
await loginPage.goto();
 
await loginPage.login('standard_user', 'secret_sauce');
 
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
 
await expect(page.locator('.title')).toHaveText('Products');
 
});
 
test('login fails with invalid credentials', async ({ page }) => {
 
const loginPage = new LoginPage(page);
 
await loginPage.goto();
 
await loginPage.login('invalid_user', 'wrong_password');
 
const isErrorVisible = await loginPage.isErrorVisible();
 
expect(isErrorVisible).toBeTruthy();
 
const errorText = await loginPage.getErrorMessage();
 
expect(errorText).toContain('Username and password do not match');
 
});
 
test('login fails with locked out user', async ({ page }) => {
 
const loginPage = new LoginPage(page);
 
await loginPage.goto();
 
await loginPage.login('locked_out_user', 'secret_sauce');
 
const errorText = await loginPage.getErrorMessage();
 
expect(errorText).toContain('Sorry, this user has been locked out');
 
});
 
test('can clear error message', async ({ page }) => {
 
const loginPage = new LoginPage(page);
 
await loginPage.goto();
 
await loginPage.login('invalid_user', 'wrong');
 
await expect(loginPage.errorMessage).toBeVisible();
 
await loginPage.clearError();
 
await expect(loginPage.errorMessage).not.toBeVisible();
 
});

test.afterEach(async({page}, testInfo) => {
    if(testInfo.status !== testInfo.expectedStatus){
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot',{
            body: screenshot,
            contentType: 'image/png'
        });
    }
})
 
});



// import{test, expect, Page} from '@playwright/test';
// import { SauceDemoUsers } from '../utils/test-data';

// test('Login to Sauce Demo', async ({page}) => {

// await page.goto('https://www.saucedemo.com');

// await page.getByPlaceholder('Username').fill('standard_user');

// await page.getByPlaceholder('Password').fill('secret_sauce');

// await page.getByRole('button', {name: 'Login'}).click;

// await page.waitForURL('**/inventory.html');

// await expect(page.getByText('Products')).toBeVisible();
// });


// test('login with test data helper', async ({page}) => {

//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('#user-name').fill(SauceDemoUsers.saucedemo.standard.username);
//     await page.locator('#password').fill(SauceDemoUsers.saucedemo.standard.password);
//     await page.locator('#login-button').click();
//     await expect(page).toHaveURL('/inventory.html');

// })