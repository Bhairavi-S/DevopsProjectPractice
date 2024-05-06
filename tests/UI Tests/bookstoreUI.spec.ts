import { test, expect } from '@playwright/test';
import { bookstorelogin } from '../../Pages/bookStorelogin';
import { nonuser, user } from '../../spec/bookstoreApiData';
import { resuablefunction } from '../../Pages/resusablefunction';


// Positive scenario - Login with correct credential.
test('UI test case 1 - Login with API created credentials', async ({ page }) => {
    const username = process.env.USERNAME_FROM_API_TEST || '';
    const password = user.userPassword || '';
    const resuableFunction = new resuablefunction(page)
    console.log("This is my UI username" + username) 
    console.log("This is my UI password" + password)
    const bookStorelogin = new bookstorelogin(page, username, password);
    await bookStorelogin.navigatetoURL()
    await resuableFunction.clickConsent()
    await bookStorelogin.login()
    const User = await page.textContent('#userName-value');
    console.log('Text Content:', User)
    expect(User).toBeTruthy();
    await bookStorelogin.logout();
});

// Negative scenario - Login with invalid Credentials.
test('UI test case 2 - Login with Invalid credentials', async ({ page }) => {
    const username = nonuser.userName;
    const password = nonuser.userPassword
    const bookStorelogin = new bookstorelogin(page, username, password);
    const resuableFunction = new resuablefunction(page)
    await bookStorelogin.navigatetoURL()
    await resuableFunction.clickConsent()
    await bookStorelogin.login()
    await bookStorelogin.getMessageforInvalidusername()
});