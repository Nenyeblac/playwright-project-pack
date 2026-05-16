import {test, expect} from '@playwright/test';
import{LoginPage} from '../../page-objects/saucedemo/LoginPage.ts'

//Basic screenshot testing
test('visual test - login page', async({page}) => {
    await page.goto('https://www.saucedemo.com/');

    //take screenshot and compare
    await expect(page).toHaveScreenshot('login-page.png');
});

//Element screenshot
test('visual test - product card', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productCard = page.locator('.inventory_item').first();
    await expect(productCard).toHaveScreenshot('product-card.png');
});

//Full page screenshot
test('visual test - full products page', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveScreenshot('products-page-full.png', {
        fullPage: true
    });
});

//Screenshot with options
test('visual test with tolerance', async({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveScreenshot('login-tolerant.png', {
        maxDiffPixels: 100, //Allow 100 pixels to be different
        threshold: 0.2, //20% threshold
        animations: 'disabled' //Disable animations
    });
});