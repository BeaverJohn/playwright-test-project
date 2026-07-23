import {Page, Locator, expect} from '@playwright/test'
import { ProductCardBasePage } from './ProductCardBasePage'
import { ProductCardComponent } from './page_elements/ProductCardComponent'

export class HomePage extends ProductCardBasePage {
    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return '/'
    }
}