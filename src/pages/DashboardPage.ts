import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { RecruitmentPage } from "./RecruitmentPage";

export class DashboardPage {
    private readonly dashboardTitleLocator = 'h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module';
    private readonly recruitmentLinkLocator = "Recruitment";

    constructor(private page: Page) {}

    async expectDashboardTitleToBeVisible() {
        await expect(this.page.locator(this.dashboardTitleLocator)).toBeVisible({
            timeout: 15000,
        }).catch((error) => {
            logger.error(`Error on clicking login button: ${error}`);
            throw error; // rethrow the error if needed
        }).then(() => logger.info("Dashboard title is visible and correct"));
    }

    async navigateToRecruitmentTab() {
        await expect(this.page.getByRole('link', { name: this.recruitmentLinkLocator })).toBeVisible();
        logger.info("Recruitment Tab is visible")
        await this.page.getByRole('link', { name: this.recruitmentLinkLocator }).click();
        logger.info("Recruitment Tab is clicked")
        return new RecruitmentPage(this.page);
    }
}
