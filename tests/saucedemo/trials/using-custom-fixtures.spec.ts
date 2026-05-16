
import {test, expect} from '../../fixtures/auth-fixtures';
import {ProductsPage} from '../../../page-objects/saucedemo/ProductsPage';

test('add product with auto-login', async({page}) => {

    // Already logged in
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCartByName('Sauce Labs Backpack');

    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('1');
    
});

test('performance user experience', async({page}) => {
    const productsPage = new ProductsPage(page);

    const startTime = Date.now();
    
    await productsPage.addProductToCartByName('Sauce Labs Backpack');

    const endTime = Date.now();

    console.log(`Add to cart took: ${endTime-startTime}`);
});