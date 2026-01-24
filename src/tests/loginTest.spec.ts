import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { encryptData, decryptData } from "../utils/CryptojsUtil";
import { encryptEnvFile, decryptEnvFile } from "../utils/EncryptEnvFile";

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Valid Login Test', async ({page}) => {
    await loginPage.fillUsername(decryptData(process.env.username!)); // ! is called the Non-Null Assertion Operator. It tells TypeScript that even though something looks like it could be null, it can trust you that it won't be
    await loginPage.fillPassword(decryptData(process.env.password!));
    await loginPage.clickLoginButton();
    // Add assertions here to verify successful login

    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();
  });

});

test.skip('test', async ({ page }) => {
    // console.log('SALT Value:', process.env.SALT);
    // const plainText = 'Hello, Playwright!';
    // const encryptedText = encryptData(plainText);
    // console.log(`Encrypted Text: ${encryptedText}`);
    
    // const decryptedText = decryptData(encryptedText);
    // console.log(`Decrypted Text: ${decryptedText}`);
    encryptEnvFile();
});