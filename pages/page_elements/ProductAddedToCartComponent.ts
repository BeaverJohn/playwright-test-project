import { Locator, expect } from '@playwright/test'

export class ProductAddedToCartComponent {
    private readonly container: Locator

    readonly viewCartLink: Locator
    readonly continueButton: Locator
    readonly titleLabel: Locator

    constructor(container: Locator) {
        this.container = container

        this.viewCartLink = container.getByRole('link', {name: 'View Cart'})
        this.continueButton = container.getByRole('button', {name: 'Continue Shopping'})
        this.titleLabel = container.getByText('Added!')
    }

    async verifyModalIsVisible(): Promise<void> {
        await expect(this.container).toBeVisible();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
        await expect(this.container).toBeHidden();
    }
}