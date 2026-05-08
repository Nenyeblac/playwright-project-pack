import{test, expect} from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com';

test.describe('FakeStore API Tests', () => {

    test('GET - fetch all products', async({request}) => {

        const response = await request.get(`${BASE_URL}/products`);
        expect(response).toBe(200);

        const products = await response.json();
        expect(products).toBeInstanceOf(Array);
        expect(products.length).toBeGreaterThan(0);

    });

    test('GET - fetch single product', async({request}) => {

        const response = await request.get(`${BASE_URL}/product/1`);
        expect(response.status()).toBe(200);

        const product = await response.json();
        expect(product.id).toBe(1);
        expect(product.title).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.category).toBeTruthy();
    });

    test('GET - fetch all categories', async({request}) =>{

        const response = await request.get(`${BASE_URL}/products/categories`);
        expect(response.status()).toBe(200);

        const categories = await response.json();
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toContain('electronics');
    });

    test('GET - fetch products in category', async({request}) => {

        const response = await request.get(`${BASE_URL}/products/category/electronics`);
        expect((await response).status()).toBe(200);

        const products = await response.json();
        expect(products).toBeInstanceOf(Array);

        //verify all products are electronics
        for(const product of products){
            expect(product.category).toBe('electronics');
        }
    });

    test('POST - add new product', async({request}) => {
        const newProduct = {
            title: 'Test Product',
            price: 13.5,
            description: 'Test Description',
            image: 'https://i.pravatar.cc',
            category: 'electronics'
        };

        const response = await request.post(`${BASE_URL}/products`, {
            data: newProduct
        });
        expect(response.status()).toBe(200);

        const product = await response.json();
        expect(product.id).toBeTruthy();
    });

    test('GET - fetch user cart', async({request}) => {
        
        const response = await request.get(`${BASE_URL}/carts/1`);
        expect(response.status()).toBe(200);

        const cart = await response.json();
        expect(cart.id).toBe(1);
        expect(cart.userId).toBeTruthy;
        expect(cart.products).toBeInstanceOf(Array);
    });

    test('POST - user login', async({request}) => {

        const credentials ={
            username: 'mor_2314',
            password: '83r5^_'
        };

        const response = await request.post(`${BASE_URL}/auth/login`, {
            data: credentials
        });
        expect(response.status()).toBe(200);

        const result = await response.json();
        expect(result.token).toBeTruthy();
    });

});