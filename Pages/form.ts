import { Page, Locator, expect } from "@playwright/test";

export default class form {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator
    readonly email: Locator
    readonly gender: Locator
    readonly mobile: Locator
    readonly dateOfBirth: Locator
    readonly subjects: Locator
    readonly hobbies: Locator
    readonly currentAddress: Locator
    readonly state: Locator
    readonly city: Locator
    readonly submitButton: Locator;
    readonly message: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator("id=firstName");
        this.lastName = page.locator("id=lastName");
        this.email = page.locator("id=userEmail");
        this.gender = page.locator("id=gender-radio-1");
        this.mobile = page.locator("id=userNumber");
        this.dateOfBirth = page.locator("id=dateOfBirthInput");
        this.subjects = page.locator(".subjects-auto-complete__value-container");
        this.hobbies = page.locator("id=hobbies-checkbox-2");
        this.currentAddress = page.locator("id=currentAddress");
        this.state = page.locator("#state > div > div.css-1hwfws3 > div.css-1wa3eu0-placeholder");
        this.city = page.locator("//div[@id='city']//div[contains(@class,'css-1hwfws3')]")
        this.submitButton = page.locator("id=submit");
        this.message = page.locator("#example-modal-sizes-title-lg")
    }
    async fillPracticeForm(firstName: string, lastName: string, email: string, mobile: string, dateOfBirth: string, subjects: string, currentAddress: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.mobile.fill(mobile);
        await this.dateOfBirth.fill(dateOfBirth);
        await this.page.click('.subjects-auto-complete__input input');
        await this.page.fill('.subjects-auto-complete__input input', subjects);

    }

    async clickForm() {
        await this.page.click('text=Form');
    }
    async clickPracticeForm() {
        await this.page.click('text=Practice Form');
    }
    async clickMaleGender() {
        await this.page.getByText('Male', { exact: true }).click();
    }

    async clickHobbiesReading() {
        await this.page.click('text=Reading');
    }
    async selectState(state: string) {
        await this.state.click();
        await this.page.waitForSelector(`text=${state}`);
        await this.page.click(`text=${state}`);
    }
    
    async selectCity(city: string) {
        await this.city.click();
        const cityOption = await this.page.locator(`div.css-1n7v3ny-option:text("${city}")`);
        await cityOption.click();
    }
    
    async clickSubmitButton() {
        const submitButton = ("id=submit");
        await this.page.waitForSelector(submitButton);
        await this.page.locator('#submit').press('Enter');
    }
    async getResultMessage() {
        const messageText = this.message.textContent();
        return messageText;
    }
    async printMessage() {
        const formPage = new form(this.page)
        const message = await formPage.getResultMessage();
        console.log(message)
    }
    async clickClose() {
        const close = ('id=closeLargeModal')
        await this.page.waitForSelector(close)
        await this.page.locator('#closeLargeModal').press('Enter')
    }
}