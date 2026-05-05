import {test, expect} from '@playwright/test';

import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { SauceDemoUsers } from '../../utils/saucedemo-data';
import{CheckoutPage} from '../../page-objects/saucedemo/CheckoutPage';
//for testing using JSON File
import productsData from '../../test-data/saucedemo-products.json';
//for faker for dynamic data
import{faker} from '@faker-js/faker';


test('successful login redirects to products page',async({page}) => {

    //ARRANGE - Set up the test
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    //ACT - Perfom the action
    await loginPage.login('standard_user', 'secret_sauce');

    //ASSERT - Verify the results
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toHaveText('Products');

    //Verify we see products
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
})


//Group related SauceDemo tests together - Test using saucedemo data instead of hardcording test data
//Test suites format with describe() - test.describe

test.describe('SauceDemo Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('successful login with standard user', async({page}) =>{
        await loginPage.login(
            SauceDemoUsers.standard.username,
            SauceDemoUsers.standard.password
        );
        await expect(page).toHaveURL(/inventory\.html/);
    });

    test('login fails with invalid credentials', async({page}) => {
        await loginPage.login('invalid_user', 'wrong_password');
        const isErrorVisible = await loginPage.isErrorVisible();
        expect(isErrorVisible).toBeTruthy();

        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Username and password do not match');
    });

    test('login fails with locked out user', async({page}) => {
        await loginPage.login(
            SauceDemoUsers.locked.username,
            SauceDemoUsers.locked.password
        );
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Sorry, this user has been locked out');
    });

    test('login fails with empty username', async({page}) => {
        await loginPage.login('', SauceDemoUsers.standard.password);
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Username is required');

    });

})


//Using test life cycle hooks

//test.beforeEach() - Runs before each test. E.g
test.beforeEach( async({page}) =>{

    //login before each test
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
});

//test.afterEach() - Runs after each test. E.g
test.afterEach(async({page}, testInfo) => {

    //Take screenshot on failure
    if(testInfo.status !== testInfo.expectedStatus){
        await page.screenshot({
            path: 'screenshots/${testInfo.title}.png'
        });
    }
});

//test.beforeAll() - Runs once before all tests. E.g
test.beforeAll( async({browser}) => {

    //set up shared state
    console.log('Starting test suite');
});

//test.afterAll() - Runs once after all tests
test.afterAll( async({browser}) =>{

    //clean up
    console.log('Test suite completed');
});



//Common Playwright Assertions

test('common playwright assertions', async({page}) =>{

//1.URL assertions

//Exact URL 
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

//URL contains
await expect(page).toHaveURL(/inventory/);

//URL matches pattern
await expect(page).toHaveURL(/.*\.com\/inventory\.html/);


//2.Text Assertions

//Exact text
await expect(page.locator('.title')).toHaveText('Products');

//Contains text
await expect(page.locator('.error')).toContainText('Username and password');

//Array of texts
await expect(page.locator('product-name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light'
]);


//3.Visibility Assertions

//Element is visible
await expect(page.locator('.shopping_cart_badge')).toBeVisible();

//Element is hidden
await expect(page.locator('.error-message')).toBeHidden();

//Element is attached to DOM
await expect(page.locator('#login-button')).toBeAttached();


//4. Count Assertions

//Exact counts
await expect(page.locator('.inventory_item')).toHaveCount(6);

//Atleast
const count = await page.locator('.cart_item').count();
expect(count).toBeGreaterThan(0);

//5. Attribute Assertions

//Has attribute
await expect(page.locator('#login-button')).toHaveAttribute('type', 'submit');

//Has class
await expect(page.locator('.inventory_item')).toHaveClass('/selected/');

//Has value
await expect(page.locator('#user-name')).toHaveValue('standard_user');


//6. State assertions

//Enabled
await expect(page.locator('#login-button')).toBeEnabled();

//Disabled
await expect(page.locator('#checkout')).toBeDisabled();

//checked (for checkboxes/radio)
await expect(page.locator('#term')).toBeChecked();

//Editable
await expect(page.locator('#user-name')).toBeEditable();

})

//Soft Assertions - work best with locator-based expects
//continue test execution even if assertion fails:

test('multiple validations with soft assertions', async({page}) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const productsPage = new ProductsPage(page);
    //soft assertions - test continues even if these fail
    await expect.soft(page).toHaveURL(/inventory/);
    await expect.soft(productsPage.pageTitle).toHaveText('Products');

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    //All soft assertion failures are reported at the end
})


//Data-Driven Testing

//Using Arrays

const testUsers = [
    {username: 'standard_user', password: 'secret_sauce', shouldSucceed: true},
    {username: 'locked_out_user', password: 'secret_sauce', shouldSucceed: false},
    {username: 'problem_user', password: 'secret_sauce', shouldSucceed: true},
    {username: 'invalid_user', password: 'wrong_password', shouldSucceed: false},
];

test.describe('SauceDemo Login with Multiple Users', () => {
    for(const user of testUsers){

        test(`login test for ${user.username}`, async({page}) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(user.username, user.password);

            if(user.shouldSucceed){
                await expect(page).toHaveURL(/inventory/);
            } else {
                const isErrorVisible = await loginPage.isErrorVisible();
                expect(isErrorVisible).toBeTruthy();
            }
        });
    }
});

//Using JSON Files

test.describe('SauceDemo Products from JSON', () => {

    test.beforeEach(async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    for(const product of productsData){
        test(`can add ${product.name}`, async({page}) => {
            const productsPage = new ProductsPage(page);
            await productsPage.addProductToCartByName(product.name);

            const isInCart = await productsPage.isProductInCart(product.name);
            expect(isInCart).toBe(product.expectedInCart);

            const price = await productsPage.getProductPrice(product.name);
            expect(price).toBe(product.price);
        });
    }
});


//Using Faker for Dynamic Data
//run npm install --save-dev @faker-js/faker

test.describe('SauceDemo Checkout with Faker', () => {
    
    //Generate random data
    const checkoutData = {
        firstName: faker.person.firstName(),
        lastName:  faker.person.lastName(),
        postalCode: faker.location.zipCode()
    };

    //login and add products 

    // ...
    
    test('fill in shipping information', async({page}) => {
         const checkoutPage = new CheckoutPage(page);
         await checkoutPage.fillShippingInformation(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
         );
         await checkoutPage.clickContinue();

         //verify we can proceed with radom data
         await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('checkout with multiple random users', async({page}) => {
        for(let i = 0; i < 5; i++){
            const userData = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                postalCode: faker.location.zipCode('#####')
            };
            console.log(`Test ${i + 1}: ${userData.firstName} ${userData.lastName}`);

            //Run test with this data

            // ...
        }
    });
   
});