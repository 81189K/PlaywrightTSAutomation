import {test as base, expect as defaultExpect } from "@playwright/test"; 
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

type UIPages = {
    dashboardPage: DashboardPage;
};

export const expect = defaultExpect;

export const test = base.extend<UIPages>({
    dashboardPage/*property from UIPages type*/: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.quickLogin(process.env.username!, process.env.password!);
        const dashboardPageObject = new DashboardPage(page);
        await dashboardPageObject.waitForLoad();
        await use(dashboardPageObject);
    }
});