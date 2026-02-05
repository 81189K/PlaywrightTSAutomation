import { test, expect, Page, Locator } from "@playwright/test";
import logger from "../utils/LoggerUtil";

let page: Page;
let logo: Locator;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://www.w3schools.com/");
    logo = page.locator("#pagetop i.fa-logo");
    await expect(logo).toBeVisible();
    logger.info("logo is visible");
});

test("Verify logo size", async () => {
    const logoBoundingBox = await logo?.boundingBox();
    if (logoBoundingBox) {
        expect(logoBoundingBox.width).toBe(38.34375);
        expect(logoBoundingBox.height).toBe(36);
        logger.info("Successfully verified logo size");
    }
});

test("Verify logo Color and font size", async () => {
    const logoStyle = await logo.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
            //style attributes
            color: style.color,
            fontSize: style.fontSize,
        };
    });
    // Assert the logo color
    expect(logoStyle.color).toBe("rgb(4, 170, 109)");
    logger.info("Successfully verified logo color");
    // Assert the logo font-size
    expect(logoStyle.fontSize).toBe("36px");
    logger.info("Successfully verified logo font-size");
});

test.skip('Screenshot compare test', async () => {
    await expect(page).toHaveScreenshot({
        animations: 'disabled', // Temporarily disables CSS animations and transitions before taking the screenshot.
        fullPage: false, // false → captures only the visible viewport; true → captures the entire scrollable page
        timeout: 5000,
    });
    logger.info("Successfully completed visual testing for entire page");
    const heroSection = page.locator("#main .herosection");
    await expect(heroSection).toHaveScreenshot('heroSection.png', {animations: 'disabled'});
    logger.info("Successfully completed visual testing for heroSection");
    await expect(logo).toHaveScreenshot('logo.png', {animations: 'disabled'});
    logger.info("Successfully completed visual testing for logo");
});

test.afterAll(async () => {
    await page.close();
});