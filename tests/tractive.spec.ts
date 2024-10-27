import { test, expect } from '@playwright/test';
import { TractivePage } from './page';

let tractiveTest;

test.beforeEach(async ({ page, context }) => {
    tractiveTest = new TractivePage(page);
    await context.addCookies([
        {
          name: "interview",
          value: "7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl",
          domain: ".tractive.com",
          path: "/"
        }
      ]);
    await tractiveTest.pageObjectModel();
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle("Tractive GPS - Sign In - Find your lost dog and cat");
});

test('check login panel', async () => {
  // These could be separate tests.
  await expect(tractiveTest.emailField).toBeVisible();
  await expect(tractiveTest.passwordField).toBeVisible();
  await expect(tractiveTest.submitButton).toBeVisible();
  await expect(tractiveTest.languageSelector).toBeVisible();
  await expect(tractiveTest.forgotPasswordLink).toBeVisible();
  await expect(tractiveTest.createAccountLink).toBeVisible();
  await expect(tractiveTest.signInWithApple).toBeVisible();
  await expect(tractiveTest.signInWithChrome).toBeVisible();
  await expect(tractiveTest.tryDemoMode).toBeVisible();
});

test('reject bad login', async () => {
    // should also test for working credentials in another test.
    await tractiveTest.login("test", "test");
    const isDisabled = await tractiveTest.submitButton.isDisabled();
    expect(isDisabled).toBe(true);
});

test('check create account panel', async () => {
  // These also could be separate tests.
  await tractiveTest.createAccountLink.click();
  await expect(tractiveTest.firstNameField).toBeVisible();
  await expect(tractiveTest.lastNameField).toBeVisible();
  await expect(tractiveTest.createEmailField).toBeVisible();
  await expect(tractiveTest.passwordField).toBeVisible();
  await expect(tractiveTest.submitButton).toBeVisible();
  await expect(tractiveTest.newsletterCheckbox).toBeVisible();
  await expect(tractiveTest.termsLink).toBeVisible();
  await expect(tractiveTest.privacyLink).toBeVisible();
  await expect(tractiveTest.hasAccountLink).toBeVisible();
  await expect(tractiveTest.tryDemoMode).toBeVisible();
});

test('create account error messages', async () => {
  await tractiveTest.createAccountLink.click();
  await tractiveTest.firstNameField.fill("test");
  await expect(tractiveTest.firstNameFieldError).not.toBeVisible();

  await tractiveTest.firstNameField.clear();
  await tractiveTest.lastNameField.fill("test");
  await expect(tractiveTest.firstNameFieldError).toBeVisible(); 
  await expect(tractiveTest.lastNameFieldError).not.toBeVisible();

  await tractiveTest.lastNameField.clear();
  await tractiveTest.createEmailField.fill("test");
  await expect(tractiveTest.lastNameFieldError).toBeVisible(); 
  await expect(tractiveTest.emailFieldError).not.toBeVisible();

  await tractiveTest.passwordField.fill("testest");
  await expect(tractiveTest.emailFieldError).toBeVisible(); 
  await expect(tractiveTest.passwordFieldError).not.toBeVisible();

  await tractiveTest.firstNameField.fill("test");
  await expect(tractiveTest.passwordFieldError).toBeVisible();

  await tractiveTest.passwordField.fill("testestt");
  await tractiveTest.createEmailField.fill("peter.varga.863@gmail.com");
  await tractiveTest.firstNameField.fill("test");
  await expect(tractiveTest.passwordFieldError).not.toBeVisible();
  await expect(tractiveTest.emailFieldError).not.toBeVisible();

  let isDisabled = await tractiveTest.submitButton.isDisabled();
  expect(isDisabled).toBe(true);
  
  await tractiveTest.lastNameField.fill("test");
  await tractiveTest.newsletterCheckbox.click();

  isDisabled = await tractiveTest.submitButton.isDisabled();
  expect(isDisabled).toBe(false);

});