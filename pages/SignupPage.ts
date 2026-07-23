import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './BasePage'
import { UserPayload } from '../utils/models/UserPayload'

export class SignupPage extends BasePage {
    readonly pageTitle: Locator
    readonly usernameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly newsletterCheckbox: Locator
    readonly specialOffersCheckbox: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly companyInput: Locator
    readonly address1Input: Locator
    readonly address2Input: Locator
    readonly stateInput: Locator
    readonly cityInput: Locator
    readonly zipcodeInput: Locator
    readonly phoneInput: Locator
    readonly createAccountButton: Locator
    
    constructor(page: Page) {
        super(page);
        
        this.pageTitle = page.getByRole('heading', {name: 'Enter Account Information'} )
        this.usernameInput = page.getByTestId('name')
        this.emailInput = page.getByTestId('email')
        this.passwordInput = page.getByLabel('Password * ')

        this.newsletterCheckbox = page.getByRole('checkbox', {name: 'Sign up for our newsletter!'})
        this.specialOffersCheckbox = page.getByRole('checkbox', {name: 'Receive special offers from our partners!'})
        
        this.firstNameInput = page.getByLabel('First name *')
        this.lastNameInput = page.getByLabel('Last name *')
        this.companyInput = page.getByLabel('Company')
        this.address1Input = page.getByTestId('address')
        this.address2Input = page.getByTestId('address2')
        this.stateInput = page.getByLabel('State *')
        this.cityInput = page.getByLabel('City *')
        this.zipcodeInput = page.getByTestId('zipcode')
        this.phoneInput = page.getByLabel('Mobile Number *')
        this.createAccountButton = page.getByRole('button', {name: 'Create Account'})
    }
    
    get url(): string {
        return '/signup'
    }

    async selectUserTitle(value: 'Mr.' | 'Mrs.') {
        const radio = this.page.getByRole('radio', {name: value})
        radio.check
    }

    async selectDoB(birthDate: Date) {
        let day: string = birthDate.getDay().toString()
        let month: string = birthDate.toLocaleString('en-US', { month: 'long' });
        let year: string = birthDate.getFullYear().toString()
        
        await this.page.getByTestId('days').selectOption(day)
        await this.page.getByTestId('months').selectOption(month)
        await this.page.getByTestId('years').selectOption(year)
    }

    async selectCountry(country: 'India' | 'United States' | 'Canada' | 'Australia' | 'Israel' | 'New Zealand' | 'Singapore') {
        await this.page.getByRole('combobox', {name: 'Country *'}).selectOption(country)
    }

    async verifyPageOpened(): Promise<void> {
        await expect(this.pageTitle).toBeVisible();
    }

    async verifyPreFilledData(userData: UserPayload): Promise<void> { 
        await expect(this.usernameInput).toHaveValue(userData.username)
        await expect(this.emailInput).toHaveValue(userData.email)
    }

    async completeSignUpWithRequiredData(userData: UserPayload): Promise<void> {
        await this.firstNameInput.fill(userData.firstName)
        await this.lastNameInput.fill(userData.lastName)
        await this.passwordInput.fill(userData.password)
        await this.address1Input.fill(userData.address1)
        await this.selectCountry(userData.country)
        await this.stateInput.fill(userData.state)
        await this.cityInput.fill(userData.city)
        await this.zipcodeInput.fill(userData.zipcode)
        await this.phoneInput.fill(userData.phone)
        await this.createAccountButton.click()
    }
    
}