import {Page, Locator, expect} from '@playwright/test'
import { ProductAddedToCartComponent } from './page_elements/ProductAddedToCartComponent'
import { BasePage } from './BasePage'

export class ProductInfoPage extends BasePage {
    readonly addToCartButton: Locator
    readonly quantityInput: Locator
    readonly priceLabel: Locator
    readonly titleLabel: Locator
    readonly reviewNameInput: Locator
    readonly reviewEmailInput: Locator
    readonly reviewContentInput: Locator
    readonly reviewSubmitButton: Locator
    readonly reviewSuccessLabel: Locator

    readonly productAddedModal: ProductAddedToCartComponent;

    constructor(page: Page) {
        super(page);

        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'})
        this.quantityInput = page.getByLabel('Quantity:')
        this.priceLabel = page.getByText('Rs.')
        this.titleLabel = page.locator('.product-information h2')
        this.reviewNameInput = page.getByPlaceholder('Your Name')
        this.reviewEmailInput = page.locator('#email')
        this.reviewContentInput = page.getByPlaceholder('Add Review Here!')
        this.reviewSubmitButton = page.getByRole('button', {name: 'Submit'})
        this.reviewSuccessLabel = page.getByText('Thank you for your review.')

        this.productAddedModal = new ProductAddedToCartComponent(page.locator('.modal-content'));
    }

    get url(): string {
        return '/product_details/'
    }

    async addToCart(count: number): Promise<void> {
        await this.quantityInput.clear()
        await this.quantityInput.fill(count.toString())
        await this.addToCartButton.click()
    }

    async postReview(email: string, name: string, content: string): Promise<void> {
        await this.reviewNameInput.fill(name)
        await this.reviewEmailInput.fill(email)
        await this.reviewContentInput.fill(content)
        await this.reviewSubmitButton.click()

        await expect(this.reviewSuccessLabel).toBeVisible()
    }
}