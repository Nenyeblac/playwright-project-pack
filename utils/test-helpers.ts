import {Page} from '@playwright/test';
import {LoginPage} from '../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../page-objects/saucedemo/ProductsPage';
import { SauceDemoUsers } from './saucedemo-data';

export async function loginAsStandardUser(page: Page) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        SauceDemoUsers.standard.username,
        SauceDemoUsers.standard.password
    );
}

export async function addProductToCart(page: Page, products: string[]) {
    const productsPage = new ProductsPage(page);
    for(const product of products){
        await productsPage.addProductToCartByName(product);
    }  
}