import { Locator } from '@playwright/test'

export class ProductCardComponent {
    private readonly container: Locator

    readonly addToCartButton: Locator
    readonly viewProductLink: Locator
    readonly priceLabel: Locator
    readonly titleLabel: Locator

    constructor(container: Locator) {
        this.container = container

        this.addToCartButton = container.locator('.productinfo a.add-to-cart')
        this.viewProductLink = container.getByRole('link', {name: 'View Product'})
        this.priceLabel = container.getByRole('heading')
        this.titleLabel = container.locator('p')
    }

    async addProductToCart(): Promise<void> {
        await this.addToCartButton.click()
    }
}