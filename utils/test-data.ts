//Load environment variables

import * as dotenv from 'dotenv';

dotenv.config();

export const SauceDemoUsers = {

        saucedemo:{
        standard: {
        username: process.env.SAUCEDEMO_STANDARD_USER || 'standard_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
        },

        locked: {
        username: process.env.SAUCEDEMO_STANDARD_USER || 'locked_out_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
        },

        problem: {
        username: process.env.SAUCEDEMO_STANDARD_USER || 'problem_user',
        password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
        }
    },
        todomcv:{
        standard: {
        username: process.env.TODOMCV_STANDARD_USER || 'standard_user',
        password: process.env.TODOMCV_PASSWORD || 'secret_sauce',
        },

        locked: {
        username: process.env.TODOMCV_STANDARD_USER || 'locked_out_user',
        password: process.env.TODOMCV_PASSWORD || 'secret_sauce',
        },

        problem: {
        username: process.env.TODOMCV_STANDARD_USER || 'problem_user',
        password: process.env.TODOMCV_PASSWORD || 'secret_sauce',
        }
    }
        

   
};

export const TestURLs = {

    sauceDemo: process.env.BASE_URL || 'https://www.saucedemo.com',
    todoMCV: process.env.TODOMCV_BASE_URL || 'https://demo.playwright.dev/todomvc',
    theInternet: 'https://the-internet.herokuapp.com'
};

export const APIEndPoints = {

    jsonPlaceHolder: process.env.JSONPLACEHOLDER_API || 'https://jsonplaceholder.typicode.com',
    fakeStoreAPI: process.env.FAKESTORE_API || 'https://fakestoreapi.com',
    reqres: process.env.REQRES_API || 'https://reqres.in/api'
};