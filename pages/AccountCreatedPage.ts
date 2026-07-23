import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './BasePage'

export class AccountCreatedPage extends BasePage {
    
    readonly pageTitle: Locator
    readonly successWrapper: Locator
    readonly continueButton: Locator
    
    constructor(page: Page) {
        super(page);
        
        this.pageTitle = page.getByTestId('account-created')
        this.successWrapper = page.getByText('Account Created! Congratulations! Your new account has been successfully')
        this.continueButton = page.getByTestId('continue-button')
    }

    get url(): string {
        return '/account_created'
    }

    async verifyAccountCreated(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.successWrapper).toContainText('Congratulations! Your new account has been successfully created!')
        await expect(this.continueButton).toBeEnabled()
    }
    
}