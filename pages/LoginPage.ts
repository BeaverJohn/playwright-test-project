import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './BasePage'
import { UserPayload } from '../utils/models/UserPayload'

export class LoginPage extends BasePage {
    
    readonly signupNameInput: Locator
    readonly signupEmailInput: Locator
    readonly signupButton: Locator
    readonly loginEmailInput: Locator
    readonly loginPasswordInput: Locator
    readonly loginButton: Locator
    
    constructor(page: Page) {
        super(page);
        
        this.signupNameInput = page.getByTestId('signup-name')
        this.signupEmailInput = page.getByTestId('signup-email')
        this.signupButton = page.getByTestId('signup-button')
        this.loginEmailInput = page.getByTestId('login-email')
        this.loginPasswordInput = page.getByTestId('login-password')
        this.loginButton = page.getByTestId('login-button')
    }

    get url(): string {
        return '/login'
    }

    async loginWithCreds(email: string, password: string, username: string): Promise<void> {
        await this.loginEmailInput.fill(email)
        await this.loginPasswordInput.fill(password)
        await this.loginButton.click()

        this.headerComponent.verifyUserIsLoggedIn(username)
    }

    async loginWithDefaultCreds(): Promise<void> {
        await this.loginWithCreds('testuser2288821111@email.com', 'test123', 'testuser2288821111')
    }

    async loginWithUserPayload(userData: UserPayload): Promise<void> {
        await this.loginWithCreds(userData.email, userData.password, userData.username)
    }

    async startSignUp(email: string, username: string): Promise<void> {
        await this.signupNameInput.fill(username)
        await this.signupEmailInput.fill(email)
        await this.signupButton.click()
    }

    async startSignUpWithUserPayload(userData: UserPayload): Promise<void> {
        await this.startSignUp(userData.email, userData.username)
    }
    
}