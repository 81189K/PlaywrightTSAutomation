import {test} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
  });

  test('Valid Login Test', async ({page}) => {
    await loginPage.fillUsername(process.env.username!); // ! is called the Non-Null Assertion Operator. It tells TypeScript that even though something looks like it could be null, it can trust you that it won't be
    await loginPage.fillPassword(process.env.password!);
    await loginPage.clickLoginButton();
    // Add assertions here to verify successful login

    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();
  });

});