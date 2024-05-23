import puppeteer, { Browser, Page } from 'puppeteer';

class LoginService {

    private width = 1920;
    private height = 1080;

    public async createBrowser(): Promise<Browser> {
        // Define screen dimensions
        // const width = 1920;
        // const height = 1080;
        // Launch a new browser instance
        const browser = await puppeteer.launch({
            headless: false,
            args: [`--window-size=${this.width},${this.height}`]
        });
        return browser;
    }

    public async createPage(browser: Browser): Promise<Page> {

        // Create a new page
        const page = await browser.newPage();
        // Set viewport to match the window size
        await page.setViewport({ width: this.width, height: this.height });
        // Navigate to a website
        await page.goto('https://login.bankhapoalim.co.il/ng-portals/auth/he/login');

        return page;
        // await setTimeout(5000);




    }

    public async doLogin(page: Page): Promise<any> {
        // #userCode
        // Wait for the input field to be available and type text into it
        const inputUserCodeSelector = '#userCode'; // Replace with the actual selector for the input field
        await page.waitForSelector(inputUserCodeSelector);
        await page.type(inputUserCodeSelector, 'vv74247'); // Replace with the text you want to input

        // #userCode
        // Wait for the input field to be available and type text into it
        const inputPassSelector = '#password'; // Replace with the actual selector for the input field
        await page.waitForSelector(inputPassSelector);
        await page.type(inputPassSelector, 'shus7654321'); // Replace with the text you want to input

        // Wait for the button to be available and click it
        const buttonSelector = 'body > auth-root > auth-rb-login > div > div.login-container > div.login-content > div > form > fieldset > div.login-submit > button'; // Replace with the actual selector for the button
        await page.waitForSelector(buttonSelector);
        await page.click(buttonSelector);
    }
}

export = new LoginService();