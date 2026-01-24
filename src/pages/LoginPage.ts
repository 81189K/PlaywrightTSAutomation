import { Page } from "@playwright/test";


export class LoginPage {
    private readonly usernameInputSelector = 'input[name="username"]';
    private readonly passwordInputSelector = 'input[name="password"]'
    private readonly loginButtonSelector = 'button[type="submit"]';

    constructor(private page: Page) {}

    async navigateToLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        console.log('Navigated to login page');
    }

    async fillUsername(username: string) {
        await this.page.locator(this.usernameInputSelector).fill(username);
        console.log(`Filled username: ${username}`);
    }

    async fillPassword(password: string) {
        await this.page.locator(this.passwordInputSelector).fill(password);
        console.log(`Filled password: ${'*'.repeat(password.length)}`);
    }
    
    async clickLoginButton() {
        await this.page.locator(this.loginButtonSelector).click();
        console.log('Clicked login button');
    }

    async quickLogin(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        console.log('Performed quick login');
    }
}