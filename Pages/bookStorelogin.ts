import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import { Locator, Page } from "@playwright/test";

export class bookstorelogin {

    readonly page: Page;
    readonly username: string;
    readonly password: string;
    readonly invalidCredential: Locator;

    constructor(page: Page, username: string, password: string) {
        this.page = page;
        this.username = username;
        this.password = password;
        this.invalidCredential = page.locator('id=name')
    }

 

    async navigatetoURL() {
        await this.page.goto('https://demoqa.com/login');
    }

    async login() {
        await this.page.fill('#userName', this.username);
        await this.page.fill('#password', this.password);
        await this.page.click('#login');
    }

    async logout(){
        await this.page.click('#submit')
    }

    async getMessageforInvalidusername(){
        const resultText = await this.invalidCredential.textContent();
        console.log('Result:', resultText);
        return resultText;
    }
}
