import { expect, Page, Locator } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export class RecruitmentPage {

    private readonly recruitmentLinkSelector: Locator;
    private readonly candidateNameInputSelector: Locator;
    private readonly searchBtnSelector: Locator;
    private readonly searchResultTextSelector = "//span[text()='(1) Record Found']";
    private readonly addbtnSelector: Locator;
    private readonly firstNameInputSelector: Locator;
    private readonly lastNameInputSelector: Locator;
    private readonly vacancyDropdownSelector: Locator;
    private readonly saveBtnSelector: Locator;
    private readonly recruitmentTitleSelector: Locator;

    constructor(private page: Page) {
        this.recruitmentLinkSelector = this.page.locator('a:has-text("Recruitment")');
        this.candidateNameInputSelector = this.page.getByLabel('Candidate Name');
        this.searchBtnSelector = this.page.getByRole('button', { name: 'Search' });
        this.addbtnSelector = this.page.getByRole('button', { name: 'Add' });
        this.firstNameInputSelector = this.page.getByPlaceholder('First Name');
        this.lastNameInputSelector = this.page.getByPlaceholder('Last Name');
        this.vacancyDropdownSelector = this.page.locator('.oxd-select-text-input');
        this.saveBtnSelector = this.page.getByRole('button', { name: 'Save' });
        this.recruitmentTitleSelector = this.page.locator('h6.oxd-text--h6.oxd-topbar-header-breadcrumb-module');
    }

    async expectRecruitmentTitleToBeVisible() {
        await expect(this.recruitmentTitleSelector).toBeVisible({
            timeout: 45000,
        }).catch((error) => {
            logger.error(`Error on Recruitment page: ${error}`);
            throw error; // rethrow the error if needed
        }).then(() => logger.info("Recruitment title is visible and correct"));
    }

    getOptionLocator(optionPartialText: string): Locator {
        return this.page.locator('div[role="option"]', { hasText: optionPartialText }).first();
    }

    getInputByLabel(label: string) {
        return this.page.locator(`div.oxd-input-group:has-text("${label}") >> input`);
    }

    async addCandidate(fname: string, lname: string, vacancy: string, email: string, contactNo?: string) {
        await this.addbtnSelector.click();
        logger.info("Add Button is clicked");

        await this.firstNameInputSelector.fill(fname);
        logger.info(`First Name filled: ${fname}`);

        await this.lastNameInputSelector.fill(lname);
        logger.info(`Last Name filled: ${lname}`);

        await this.vacancyDropdownSelector.click();
        logger.info("Vacancy dropdown clicked");
        await this.page.waitForTimeout(1000); // Wait for options to load

        const vacancyOptionLocator = this.getOptionLocator(vacancy);
        await vacancyOptionLocator.click();
        logger.info(`Vacancy selected: ${vacancy}`);

        await this.getInputByLabel("Email").fill(email);
        logger.info(`Email filled: ${email}`);

        if(contactNo){
            await this.getInputByLabel("Contact Number").fill(contactNo);
            logger.info(`Contact Number filled: ${contactNo}`);
        }
        
        await this.saveBtnSelector.click();
        logger.info("Save Button is clicked");
    }

    async findExistingCandidateByName(lname: string) {
        await this.recruitmentLinkSelector.click();
        logger.info("Recruitment Link is clicked");

        await this.getInputByLabel("Candidate Name").fill(lname);
        const candidateNameOptionLocator = this.getOptionLocator(lname);
        await candidateNameOptionLocator.click();
        logger.info(`Candidate Name filled: ${lname}`);

        await this.searchBtnSelector.click();
        logger.info("Search Button is clicked");

        await this.page.locator(this.searchResultTextSelector).waitFor({ state: 'visible', timeout: 5000 });
        expect(this.page.locator(this.searchResultTextSelector)).toBeVisible();
        logger.info("Search Result is visible");

        await this.page.screenshot({ path: `screenshots/CandidateSearch_${lname}.png` });

        // return this.page.locator(this.searchResultTextSelector).isVisible();
    }

}