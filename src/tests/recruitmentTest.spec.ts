/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RecruitmentPage } from "../pages/RecruitmentPage";
import { DashboardPage } from "../pages/DashboardPage";
import { convertCsvFileToJsonFile } from "../utils/CsvToJsonUtil";
// import recruitmentJSONData from "../testdata/recruitments.json";
import fs from 'fs';
import path from 'path';

interface RecruitmentData {
    firstname: string;
    lastname: string;
    vacancy: string;
    email: string;
    contactNo?: string;
}


// Paths
const testdataDir = path.resolve(__dirname, '../testdata');
const jsonFilePath = path.join(testdataDir, 'recruitmentsCSVtoJSON.json');

// Convert CSV → JSON at file load time
convertCsvFileToJsonFile('recruitments.csv', 'recruitmentsCSVtoJSON.json');

// Read JSON synchronously
const recruitmentData: RecruitmentData[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// shared state
let page: Page;
let dashboardPage: DashboardPage;
// let recruitmentData: RecruitmentData[] = [];

test.describe.serial('Recruitment Test Suite', () => {

    test.beforeAll(async ({ browser }) => {
        // // Paths
        // const testdataDir = path.resolve(__dirname, '../testdata');
        // const jsonFilePath = path.join(testdataDir, 'recruitmentsCSVtoJSON.json');
        // // CSV → JSON conversion
        // convertCsvFileToJsonFile('recruitments.csv', 'recruitmentsCSVtoJSON.json');

        // // Read JSON synchronously after conversion
        // recruitmentData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

        page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.quickLogin(process.env.username!, process.env.password!);

        dashboardPage = new DashboardPage(page);
        await dashboardPage.expectDashboardTitleToBeVisible();
    });

    // const runTests = (dataArray: RecruitmentData[], label: string) => {
    //     dataArray.forEach((data, index) => {
    //         test(`${label}[${index}]: ${data.firstname} ${data.lastname}`, async () => {
    //             const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();
    //                 await recruitmentPage.addCandidate(data.firstname, data.lastname, data.vacancy, data.email, data.contactNo);
    //                 await recruitmentPage.findExistingCandidateByName(data.lastname);
    //         });
    //     });
    // };

    // runTests(recruitmentData, 'CSVtoJSON: Recruitment Test');
    // runTests(recruitmentJSONData, 'JSON: Recruitment Test');

    recruitmentData.forEach((data: any, index: number) => {
        test(`CSVtoJSON[${index}]: Recruitment tests for '${data.firstname} ${data.lastname}'`, async () => {
            const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();
            await recruitmentPage.addCandidate(data.firstname, data.lastname, data.vacancy, data.email, data.contactNo);
            await recruitmentPage.findExistingCandidateByName(data.lastname);
        });
    });

    // recruitmentJSONData.forEach((data: any, index: number) => {
    //     test(`JSON[${index}]: Recruitment tests for '${data.firstname} ${data.lastname}'`, async () => {
    //         const recruitmentPage: RecruitmentPage = await dashboardPage.navigateToRecruitmentTab();    
    //         await recruitmentPage.addCandidate(data.firstname, data.lastname, data.vacancy, data.email, data.contactNo);
    //         await recruitmentPage.findExistingCandidateByName(data.lastname);
    //     });
    // });

    test.afterAll(async () => {
        await page.close();
    });
});