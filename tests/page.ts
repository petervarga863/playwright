import { type Locator, type Page } from '@playwright/test';

export class TractivePage {
  readonly page: Page;
  readonly acceptButton: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly languageSelector: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;
  readonly signInWithApple: Locator;
  readonly signInWithChrome: Locator;
  readonly tryDemoMode: Locator;
  
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly createEmailField: Locator;
  readonly newsletterCheckbox: Locator;
  readonly termsLink: Locator;
  readonly privacyLink: Locator;
  readonly hasAccountLink: Locator;
  readonly firstNameFieldError: Locator;
  readonly lastNameFieldError: Locator;
  readonly emailFieldError: Locator;
  readonly passwordFieldError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptButton = page.locator('.mdc-button__label', { hasText: 'OK' });

    // Login panel
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.languageSelector = page.locator('tcommon-language-selector');
    this.forgotPasswordLink = page.locator('.forgot');
    this.createAccountLink = page.locator('a[href="#/signup"]');
    this.signInWithApple = page.locator('tcommon-apple-signin-button');
    this.signInWithChrome = page.locator('tcommon-google-signin-button');
    this.tryDemoMode = page.locator('tcommon-try-demo');

    // Create Account panel
    this.firstNameField = page.locator('input[name="firstName"]');
    this.firstNameFieldError = this.firstNameField.locator(' ~ .tcommon-form-field__message');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.lastNameFieldError = this.lastNameField.locator(' ~ .tcommon-form-field__message');
    this.createEmailField = page.locator('input[name="email"]');
    this.emailFieldError = this.createEmailField.locator(' ~ .tcommon-form-field__message');
    this.passwordFieldError = this.passwordField.locator(' ~ .tcommon-form-field__message');
    this.newsletterCheckbox = page.locator('tcommon-check');
    this.termsLink = page.locator('a[href="https://tractive.com/terms"]');
    this.privacyLink = page.locator('a[href="https://tractive.com/privacy"]');
    this.hasAccountLink = page.locator('tcommon-link[text="login.signUp.accountAlreadyExists"]');
  }

  async goto() {
    await this.page.goto('https://my-stage.tractive.com');
  }

  async acceptCookies() {
    await this.acceptButton.click();
  }

  async pageObjectModel() {
    await this.goto();
    await this.acceptCookies();
  }

  async login(login, pass) {
    await this.emailField.fill(login);
    await this.passwordField.fill(pass);
  }

}