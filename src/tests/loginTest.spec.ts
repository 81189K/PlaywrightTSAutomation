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
    await loginPage.fillUsername('Admin');
    await loginPage.fillPassword('admin123');
    await loginPage.clickLoginButton();
    // Add assertions here to verify successful login

    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();
  });

});