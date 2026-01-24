import {Page, expect} from "@playwright/test";

export class DashboardPage {
    private readonly dashboardTitleLocator = 'h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module';

    constructor(private page: Page) {}

    async expectDashboardTitleToBeVisible() {
        await expect(this.page.locator(this.dashboardTitleLocator)).toBeVisible( { timeout: 15000 });
        console.log('Dashboard title is visible and correct');
    }
}
