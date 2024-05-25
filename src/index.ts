import puppeteer from 'puppeteer';
import { setTimeout } from "timers/promises";
import loginService from './login.service'
import lastMovementsService from './services/lastMovements.service';

(async () => {

    const browser = await loginService.createBrowser();
    const page = await loginService.createPage(browser);
    await setTimeout(5000);
    await loginService.doLogin(page);
    await setTimeout(5000);
    // const lastMovements = await lastMovementsService.scrap(page);
    await setTimeout(5000);

    await setTimeout(20000);
    // Close the browser
    await browser.close();
})();
