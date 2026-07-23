import {Locator, expect} from '@playwright/test'

export class HeaderComponent {
    private readonly container: Locator

    readonly headerLogo: Locator
    readonly homeLink: Locator
    readonly productsLink: Locator
    readonly cartLink: Locator
    readonly signupLoginLink: Locator

    readonly logoutLink: Locator
    readonly deleteAccountLink: Locator
    readonly loggedInAsLabel: Locator
    
    constructor(container: Locator) {
        this.container = container

        this.headerLogo = container.getByAltText('Website for automation practice')
        this.homeLink = container.getByRole('link', { name: 'Home' })
        this.productsLink = container.getByRole('link', { name: 'Products' })
        this.cartLink = container.getByRole('link', { name: 'Cart' })
        this.signupLoginLink = container.getByRole('link', { name: 'Signup / Login' })

        this.logoutLink = container.getByRole('link', { name: 'Logout' })
        this.deleteAccountLink = container.getByRole('link', { name: 'Delete Account' })
        this.loggedInAsLabel = container.getByText('Logged in as');
    }

    async verifyUserIsLoggedIn(username: string): Promise<void> {
        await expect(this.signupLoginLink).toBeHidden()
        await expect(this.loggedInAsLabel).toContainText(username)
    }
}