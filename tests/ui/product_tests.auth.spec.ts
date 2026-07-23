import { test } from '../../fixtures/index';

test('add product to cart on home page', async ({ homePage }) => {  
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.addProductToCart()
  await homePage.productAddedModal.verifyModalIsVisible()
  await homePage.productAddedModal.clickContinue()
});

test('add product to cart on product page', async ({ homePage, productInfoPage }) => {  
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.viewProductLink.click()
  await productInfoPage.addToCartButton.click()
  await productInfoPage.productAddedModal.verifyModalIsVisible()
  await productInfoPage.productAddedModal.clickContinue()
});

test('post product review', async ({ homePage, productInfoPage }) => {  
  await homePage.goto()
  const product = homePage.getProductCardByName('Fancy Green Top')
  await product.viewProductLink.click()
  await productInfoPage.postReview('test@test.com', 'chel', 'test test test')
});