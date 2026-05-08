import{test, expect} from '@playwright/test';


const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('JSONPlaceholder API Tests', () => {

    test('GET - fetch all posts', async({request}) => {

        const response = await request.get(`${BASE_URL}/posts`);
        expect(response.status()).toBe(200);

        const posts = await response.json();
        expect(posts).toBeInstanceOf(Array);
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0]).toHaveProperty('UserId');
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
        expect(posts[0]).toHaveProperty('body');
    });

    test('GET - fetch single post', async({request}) =>{

        const response = await request.get(`${BASE_URL}/posts/1`);
        expect(response.status()).toBe(200);

        const post = await response.json();
        expect(post.id).toBe(1)
        expect(post.UserId).toBe(1);
        expect(post.title).toBeTruthy();
        expect(post.body).toBeTruthy();
    });

    test('POST - create new post', async({request}) => {

        const newPost = {
            title: 'Test Post',
            body: 'This is a test post created by Playwright',
            userId: 1
        };

        const response = await request.post(`${BASE_URL}/posts`, {
            data: newPost
        });
        expect(response.status).toBe(201);

        const createdPost = await response.json();
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.body).toBe(newPost.body);
        expect(createdPost.userId).toBe(newPost.userId);
        expect(createdPost.id).toBeTruthy();
    });

    test('PUT - update existing post', async({request}) => {

        const updatedPost = {
            id: 1,
            title: 'Updated Title',
            body: 'Updated body content',
            userId: 1
        };

        const response = await request.put(`${BASE_URL}/posts/1`, {
            data: updatedPost
        });
        expect(response.status()).toBe(200);

        const post = await response.json();
        expect(post.title).toBe(updatedPost.title);
        expect(post.body).toBe(updatedPost.body);
    });

    test('DELETE - remove post', async({request}) => {

        const response = await request.delete(`${BASE_URL}/posts/1`);
        expect(response.status()).toBe(200);
    });

    test('GET - fetch post for specific user', async({request}) => {

        const response = await request.get(`${BASE_URL}/posts?userId=1`);
        expect(response.status()).toBe(200);

        const posts = await response.json();
        expect(posts).toBeInstanceOf(Array);

        //verify all posts belong to user 1
        for(const post of posts)
            expect(post.userId).toBe(1);
    })
})