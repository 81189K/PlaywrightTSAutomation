import { test, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RecruitmentPage } from "../pages/RecruitmentPage";
import { DashboardPage } from "../pages/DashboardPage";
import { generateRecruitmentDataArray, exportRecruitmentDataToCsvFile, RecruitmentData } from "../utils/FakerDataUtil";
import { convertCsvFileToJsonFile } from "../utils/CsvToJsonUtil";
import fs from "fs";
import path from "path";

test('Recruitment Faker testData test', async ({ browser }) => {

    const page: Page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    // test data directory path
    const testdataDir = path.resolve(__dirname, "../testdata");

    // generate faker data
    const testData = generateRecruitmentDataArray(1);

    // write files
    // exportRecruitmentDataToJsonFile(testData, "testData_en.json");
    await exportRecruitmentDataToCsvFile(testData, "testData_en.csv");

    // await page.waitForTimeout(2000); // wait for file write

    // csv → json
    convertCsvFileToJsonFile("testData_en.csv", "testDataFromCSV.json");

    // read JSON data
    // const recruitmentJsonData: RecruitmentData[] =
    //  JSON.parse(fs.readFileSync(path.join(testdataDir, "testData_en.json"), "utf8"));

    // read testDataFromCSV data
    const recruitmentFromCSVData: RecruitmentData[] =
        JSON.parse(fs.readFileSync(path.join(testdataDir, "testDataFromCSV.json"), "utf8"));

    // login
    const loginPage = new LoginPage(page);
    await loginPage.quickLogin(process.env.username!, process.env.password!);
    // dashboard
    const dashboardPage: DashboardPage = new DashboardPage(page);
    await dashboardPage.expectDashboardTitleToBeVisible();

    for (const data of recruitmentFromCSVData) {
        const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();
        await recruitmentPage.addCandidate(data.firstname,data.lastname, data.vacancy, data.email, data.contactNo);
        await recruitmentPage.findExistingCandidateByName(data.lastname);
    }

    // for (const data of recruitmentJsonData) {
    //     const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();
    //     await recruitmentPage.addCandidate(data.firstname,data.lastname, data.vacancy, data.email, data.contactNo);
    //     await recruitmentPage.findExistingCandidateByName(data.lastname);
    // };
});
