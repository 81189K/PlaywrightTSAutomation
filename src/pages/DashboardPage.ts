import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";

export class DashboardPage {
    private readonly dashboardTitleLocator = 'h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module';

    constructor(private page: Page) {}

    async expectDashboardTitleToBeVisible() {
        await expect(this.page.locator(this.dashboardTitleLocator)).toBeVisible({
            timeout: 15000,
        }).catch((error) => {
            logger.error(`Error on clicking login button: ${error}`);
            throw error; // rethrow the error if needed
        }).then(() => logger.info("Dashboard title is visible and correct"));
    }
}
