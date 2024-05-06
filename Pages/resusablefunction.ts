import { PlaywrightBlocker } from "@cliqz/adblocker-playwright";
import { Page } from "playwright";

export class resuablefunction {
    static clickConsent() {
        throw new Error('Method not implemented.');
    }
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateURL() {
        await this.page.goto('https://demoqa.com/')
    }

    async clickElement() {
        await this.page.click('text=Elements');
    }

    async clickConsent() {
        await this.page.getByLabel('Consent', { exact: true }).click();
    }
    async handelAdds() {
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker => {
            blocker.enableBlockingInPage(this.page);
        })
    }
}