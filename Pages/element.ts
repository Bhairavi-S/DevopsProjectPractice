import {  Locator, Page } from "@playwright/test";
export class textBox {
    readonly page: Page;
    readonly fullName: Locator;
    readonly email: Locator;
    readonly currentAddress: Locator;
    readonly permanentAddress: Locator;
    readonly submit: Locator;
    constructor(page: Page) {
        this.page = page;
        this.fullName = page.locator('id=userName')
        this.email = page.locator('id=userEmail')
        this.currentAddress = page.locator('id=currentAddress')
        this.permanentAddress = page.locator('id=permanentAddress')
        this.submit = page.locator('id=submit')
    }

    async fillTextBox(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
        await this.fullName.fill(fullName)
        await this.email.fill(email)
        await this.currentAddress.fill(currentAddress)
        await this.permanentAddress.fill(permanentAddress)
        await this.submit.click()
    }
    async clickTextBox() {
        await this.page.click('text=Text Box');
    }
}
export class buttons {
    readonly page: Page;
    readonly doubleclick: Locator;
    readonly rightClick: Locator;
    readonly clickMe: Locator;
    readonly doubleClickMessage: Locator;
    readonly rightClickMessage: Locator
    readonly clickMeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.doubleclick = page.locator('id=doubleClickBtn');
        this.rightClick = page.locator('id=rightClickBtn');
        this.clickMe = page.getByRole('button', { name: 'Click Me', exact: true })
        this.doubleClickMessage = page.locator('id=doubleClickMessage')
        this.rightClickMessage = page.locator('id=rightClickMessage')
        this.clickMeMessage = page.locator('id=dynamicClickMessage')
    }

    async checkDoubleClick() {
        await this.doubleclick.dblclick();
        const resultText = await this.doubleClickMessage.textContent();
        console.log('Result:', resultText);
        return resultText;
    }
    async checkRightClick() {
        const rightClick = ('#rightClickBtn')
        await this.page.click(rightClick, { button: 'right' })
        const resultText = await this.rightClickMessage.textContent();
        console.log('Result:', resultText);
        return resultText;
    }
    async checkClickMe() {
        await this.clickMe.click();
        const resultText = await this.clickMeMessage.textContent();
        console.log('Result:', resultText);
        return resultText;
    }
    async clickButtons() {
        await this.page.getByText('Buttons').click()
    }
}

