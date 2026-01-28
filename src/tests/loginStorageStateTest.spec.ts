import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import logger from "../utils/LoggerUtil";
import { RecruitmentPage } from "../pages/RecruitmentPage";

const authFile = 'src/config/loginStorageState.json';

test.describe.configure({ mode: 'serial' });

test('Login Test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.quickLogin(process.env.username!, process.env.password!);
    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();
    logger.info("Login successful, Dashboard title is visible.");
    // Save storage state to file
    await page.context().storageState({ path: authFile });
    logger.info(`Auth Storage state saved to ${authFile}`);
});

// Use the saved storage state in another test
test('Login using Storage State', async ({ browser }) => {
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    const recruitmentPage: RecruitmentPage = new RecruitmentPage(page);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    await recruitmentPage.expectRecruitmentTitleToBeVisible();
    logger.info("Login using storage state successful, Recruitment title is visible.");
});

/***
 * Reference: https://playwright.dev/docs/codegen
    * npx playwright codegen <<Login URL>> --save-storage=auth.json
    * npx playwright codegen --load-storage=auth.json <<Dashboard URL>>
 
 * Example to create storage state file using codegen
    * npx playwright codegen https://opensource-demo.orangehrmlive.com/web/index.php/auth/login --save-storage=src/config/loginStorageState.json
 
 * Example to use storage state file in tests
    * npx playwright codegen --load-storage=src/config/loginStorageState.json https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates
 */