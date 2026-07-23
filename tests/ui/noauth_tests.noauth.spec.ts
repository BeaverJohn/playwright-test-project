import { test } from '../../fixtures/index';
import { UserPayload } from '../../utils/models/UserPayload';

test.use({ storageState: { cookies: [], origins: [] } });

test('new user registration', async ({ loginPage, signupPage, accountCreatedPage, newUser }) => {

  await loginPage.goto()
  await loginPage.startSignUpWithUserPayload(newUser)

  await signupPage.verifyPageOpened()
  await signupPage.verifyPreFilledData(newUser)
  await signupPage.completeSignUpWithRequiredData(newUser)

  await accountCreatedPage.verifyAccountCreated()
  await accountCreatedPage.continueButton.click()

  await loginPage.headerComponent.verifyUserIsLoggedIn(newUser.username)

});

test('default user login', async ({ loginPage }) => {
  
  const userData = UserPayload.getDefaultUser()
  
  await loginPage.goto()
  await loginPage.loginWithUserPayload(userData)
  await loginPage.headerComponent.verifyUserIsLoggedIn(userData.username)
});