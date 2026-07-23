import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ProductsPage } from '../pages/ProductsPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { HomePage } from '../pages/HomePage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type MyFixtures = {
    loginPage: LoginPage;
    signupPage: SignupPage;
    productsPage: ProductsPage;
    accountCreatedPage: AccountCreatedPage;
    homePage: HomePage;
    productInfoPage: ProductInfoPage;
};

export const pageFixtures = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);
        await use(signupPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    accountCreatedPage: async ({ page }, use) => {
        const accountCreatedPage = new AccountCreatedPage(page);
        await use(accountCreatedPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    productInfoPage: async ({ page }, use) => {
        const productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
});

export { expect } from '@playwright/test';