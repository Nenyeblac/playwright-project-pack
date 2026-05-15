import {test, expect} from '../../fixtures/saucedemo';
//import { ProductsPage } from '../../../page-objects/saucedemo/ProductsPage';

test('add product to cart', async({authenticatedPage, productsPage}) => {

    //Already logged in through authenticatedPage fixtures
    await productsPage.addProductToCartByName('Sauce Labs Backpack');
    
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('1');
});