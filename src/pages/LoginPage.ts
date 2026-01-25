import { Page } from "@playwright/test";
import logger from "../utils/LoggerUtil";


export class LoginPage {
    private readonly usernameInputSelector = 'input[name="username"]';
    private readonly passwordInputSelector = 'input[name="password"]'
    private readonly loginButtonSelector = 'button[type="submit"]';

    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto('auth/login');
        logger.info('Navigated to login page');
    }

    async fillUsername(username: string) {
        await this.page.locator(this.usernameInputSelector).fill(username);
        logger.info(`Filled username: ${username}`);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info(`Filled password: ${'*'.repeat(password.length)}`);
    }
    
    async clickLoginButton() {
        await this.page.locator(this.loginButtonSelector).click();
        logger.info('Clicked login button');
    }

    async quickLogin(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        logger.info('Performed quick login');
    }
}