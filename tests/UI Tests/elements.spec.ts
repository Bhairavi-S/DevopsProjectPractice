import { buttons, textBox } from "../../Pages/element";
import { test, expect as playwrightExpect, Browser, chromium } from '@playwright/test';
import { textBoxData } from "../../spec/elementData";
import { beforeEach } from "node:test";
import { resuablefunction } from "../../Pages/resusablefunction";

test.beforeEach(async ({ page }) => {
    const resuableFunction = new resuablefunction(page);
    await resuableFunction.navigateURL()
    await resuableFunction.clickConsent()
    await resuableFunction.clickElement()
})

test("Verify TextBox", async ({ page }) => {
    const TextBox = new textBox(page);
    await TextBox.clickTextBox();
    const TextBoxData = textBoxData.gettextBoxData();
    await TextBox.fillTextBox(TextBoxData.fullName, TextBoxData.email, TextBoxData.currentAddress, TextBoxData.permanentAddress)
})

test("Verify Buttons", async ({ page }) => {
    const Buttons = new buttons(page);
    await Buttons.clickButtons()
    await Buttons.checkDoubleClick()
    await Buttons.checkRightClick()
    await Buttons.checkClickMe()
});