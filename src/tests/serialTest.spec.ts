import { test, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RecruitmentPage } from "../pages/RecruitmentPage";
import { DashboardPage } from "../pages/DashboardPage";
import { generateRecruitmentDataArray, exportRecruitmentDataToJsonFile, RecruitmentData } from "../utils/FakerDataUtil";
import fs from "fs";
import path from "path";
import logger from "../utils/LoggerUtil";

test.describe.configure({ mode: "serial" });

// Shared page object
let page: Page;

// variables
let testdataDir: string;
let recruitmentJsonData: RecruitmentData[]


//NOTE: In beforeAll we can only use browser fixture, we cannot use context or page fixtures directly. 
// Reason: Both context and page are created per test basis. (Each test gets its own isolated browser context to ensure test isolation and avoid state leakage between tests.)
// whereas browser fixture is shared across all tests in the suite. Therefore, we can use only browser fixture in beforeAll.
// and create context and page using the browser fixture inside beforeAll.

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    const loginPage = new LoginPage(page);
    await loginPage.quickLogin(process.env.username!, process.env.password!);
    logger.info("Login successful");
});

test('Recruitment Faker testData generation', async () => {
    // test data directory path
    testdataDir = path.resolve(__dirname, "../testdata");
    // generate faker data
    const testData = generateRecruitmentDataArray(1);
    // write files
    exportRecruitmentDataToJsonFile(testData, "testData_en.json");
    // read JSON data
    recruitmentJsonData = JSON.parse(fs.readFileSync(path.join(testdataDir, "testData_en.json"), "utf8"));
});

test('Add Recruitment Candidate using Faker data', async () => {
    // continue from dashboard page
    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();
    // iterate through JSON data and add candidates
    for (const data of recruitmentJsonData) {
        const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();
        await recruitmentPage.addCandidate(data.firstname,data.lastname, data.vacancy, data.email, data.contactNo);
        await recruitmentPage.findExistingCandidateByName(data.lastname);
    };
});

test.afterAll(async () => {
    await page.close();
});