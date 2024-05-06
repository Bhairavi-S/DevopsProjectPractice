import { test, expect } from '@playwright/test'
import { user } from '../../spec/bookstoreApiData'
import { writeFileSync } from 'fs';


const UserName = user.userName
const UserPassword = user.userPassword
var userId = ''
var token = ''
var isbn = ''
var generatedUser = ''

const random = Math.floor((Math.random() * 100) + 2)
const timestamp = Date.now();
const randomName = UserName + random + timestamp
const requestData = {
    "userName": randomName,
    "password": UserPassword
}
const basicAuthHeader = 'Basic ' + btoa(randomName + ':' + UserPassword);

test.describe.serial('API Tests', () => {

    test('API test case 1 - create user', async ({ request }) => {

        const response = await request.post('https://demoqa.com/Account/v1/User', {
            data: requestData
        })
        expect(response.status()).toBe(201)
        const responseBody = await response.json();
        userId = responseBody.userID;
        generatedUser = responseBody.username;
        console.log('Generated Username:', generatedUser);
        writeFileSync('.env', `USERNAME_FROM_API_TEST=${generatedUser}`);
        console.debug()
    })

    test('API test case 2 - Generate Token and Authorised user', async ({ request }) => {
        const Response = await request.post('https://demoqa.com/Account/v1/GenerateToken', {
            data: requestData
        });
        expect(Response.status()).toBe(200);
        token = await Response.json().then(data => data.token);
        console.log(await Response.json())
        expect(token).toBeTruthy();
        const authorisedUserResponse = await request.post("https://demoqa.com/Account/v1/Authorized", {
            data: requestData
        });
        expect(authorisedUserResponse.status()).toBe(200);
        console.log(await authorisedUserResponse.json());
    });

    test(" API test case 3 - Get Books", async ({ request }) => {
        const response = await request.get("https://demoqa.com/BookStore/v1/Books")
        expect(response.status()).toBe(200)
        isbn = await response.json().then(data => data.books[1].isbn)
        const text = await response.text()
        console.log(await response.json())
    })


    test("API test case 4 - Post the books to user", async ({ request }) => {
        const response = await request.post("https://demoqa.com/BookStore/v1/Books", {
            data: {
                "userId": userId,
                "collectionOfIsbns": [
                    {
                        "isbn": isbn
                    }
                ]
            },
            headers: {
                'Authorization': token,
                'Content-Type': "application/json",
                'authorization': basicAuthHeader
            }
        })
        expect(response.status()).toBe(201)
        const text = await response.text()
        console.log(await response.json())
    })

})