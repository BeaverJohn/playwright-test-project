import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { ProductCardComponent } from './page_elements/ProductCardComponent'
import { ProductAddedToCartComponent } from './page_elements/ProductAddedToCartComponent'

export abstract class ProductCardBasePage extends BasePage {
    
    readonly productAddedModal: ProductAddedToCartComponent;
    
    constructor(page: Page) {
        super(page);

        this.productAddedModal = new ProductAddedToCartComponent(page.locator('.modal-content'));
    }

    getProductCardByName(productName: string): ProductCardComponent {
        const cardRoot = this.page.locator('.features_items .col-sm-4').filter({ hasText: productName });
        
        return new ProductCardComponent(cardRoot);
    }
}