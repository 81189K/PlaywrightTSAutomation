import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtil";
import { RecruitmentPage } from "./RecruitmentPage";

export class DashboardPage {
    private readonly dashboardTitleLocator = 'h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module';
    private readonly recruitmentLinkLocator = "Recruitment";

    constructor(private page: Page) {}

    async waitForLoad() {
        await this.page.getByRole('heading', { name: /^dashboard$/i }).waitFor(); // /^dashboard$/i: javascript regex for case insensitive match
        logger.info("Dashboard page loaded successfully");
    }

    async validateDashboardTitle() {
        const dashboardText = await this.page.getByRole('heading', { level: 6 }).textContent();
        expect(dashboardText?.trim()).toBe('Dashboard');
        logger.info("Dashboard title validated successfully");
    }

    async expectDashboardTitleToBeVisible() {
        await expect(this.page.locator(this.dashboardTitleLocator)).toBeVisible({
            timeout: 45000,
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
