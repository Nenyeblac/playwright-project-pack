//Reusable setup codes

import {test as base} from '@playwright/test';
import {LoginPage} from '../../page-objects/saucedemo/LoginPage.ts';
import {ProductsPage} from '../../page-objects/saucedemo/ProductsPage.ts';

type SauceDemoFixtures = {

    loginPage: LoginPage;
    productsPage: ProductsPage;
    authenticatedPage: void;
};

export const test = base.extend<SauceDemoFixtures>({

    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productsPage: async({page}, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    authenticatedPage: async({page, loginPage}, use) => {
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await use();
    },

});

export{expect} from '@playwright/test';
