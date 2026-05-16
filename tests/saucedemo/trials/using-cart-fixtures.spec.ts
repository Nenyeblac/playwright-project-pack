
import {test, expect} from '../../fixtures/cart-fixtures';

test('', async({page, cartWithProducts}) => {

    // Cart already has two items
    let itemCount = await cartWithProducts.getCartItemCount();
    expect(itemCount).toBe(2);

    //remove cart items
    await cartWithProducts.removeItemByName('Sauce Labs Backpack');
    itemCount = await cartWithProducts.getCartItemCount();
    expect(itemCount).toBe(1);
});