import {Page, Locator, expect} from '@playwright/test'
import { ProductCardBasePage } from './ProductCardBasePage'

export class ProductsPage extends ProductCardBasePage {    
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return '/products'
    }
}