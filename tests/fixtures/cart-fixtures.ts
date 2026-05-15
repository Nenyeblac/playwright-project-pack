// FIXTURES WITH SETUP AND TEARDOWN

import {test as base} from '@playwright/test';

import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../page-objects/saucedemo/CartPage';
import { SauceDemoUsers } from '../../utils/saucedemo-data';

type CartFixtures = {
    cartWithProducts: CartPage;
};

export const test = base.extend<CartFixtures>({
    cartWithProducts: async ({page}, use) => {

        //Setup: Login and add products
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(
            SauceDemoUsers.standard.username,
            SauceDemoUsers.standard.password
        );

        const productPage = new ProductsPage(page);
        await productPage.addProductToCartByName("Sauce Labs Backpack");
        await productPage.addProductToCartByName("Sauce Labs Bike Light");
        await productPage.goToCart();

        const cartPage = new CartPage(page)
        //provide cartPage to test
        await use(cartPage);

        //Teardown: clear cart (if needed). 
        
        // This runs after the test completes
        console.log('Test completed, cart can be cleaned up here');
    },
});

export{expect} from '@playwright/test';