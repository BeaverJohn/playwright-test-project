import { Page } from '@playwright/test'
import { HeaderComponent } from './page_elements/HeaderComponent'

export abstract class BasePage {
    protected page: Page
    readonly headerComponent: HeaderComponent

    constructor(page: Page) {
        this.page = page

        const headerRoot = page.getByRole('banner');
        this.headerComponent = new HeaderComponent(headerRoot)
    }

    abstract get url(): string;

    async goto(): Promise<void> {
        await this.page.goto(this.url)
    }
}