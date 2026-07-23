import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductInfoPage } from '../../pages/ProductInfoPage';

test('add product to cart on home page', async ({ page }) => {  
  const homePage = new HomePage(page)
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.addProductToCart()
  await homePage.productAddedModal.verifyModalIsVisible()
  await homePage.productAddedModal.clickContinue()
});

test('add product to cart on product page', async ({ page }) => {  
  const homePage = new HomePage(page)
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.viewProductLink.click()
  const productPage = new ProductInfoPage(page)
  await productPage.addToCartButton.click()
  await productPage.productAddedModal.verifyModalIsVisible()
  await productPage.productAddedModal.clickContinue()
});

test('post product review', async ({ page }) => {  
  const homePage = new HomePage(page)
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.viewProductLink.click()
  const productPage = new ProductInfoPage(page)
  await productPage.postReview('test@test.com', 'chel', 'test test test')
});