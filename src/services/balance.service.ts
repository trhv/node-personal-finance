import puppeteer, { Browser, Page } from 'puppeteer';
import { Balance } from '../types/balance'
import dataBaseService from './dataBase.proxy.service'
class BalanceService {

    private getDate(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    public async scrap(page: Page): Promise<Balance> {
        // body > rb-root > poalim-header-footer-layout > main > poalim-dynamic-component-content > div > rb-homepage-v2 > section > div.home-page > section.homepage-body > div.main-view > div.homepage-body-balance-and-limits > poalim-balance-and-limits > section > ul > li:nth-child(1) > div > span.currentBalance-v2.d-inline-flex
        const balanceSelector = 'body > rb-root > poalim-header-footer-layout > main > poalim-dynamic-component-content > div > rb-homepage-v2 > section > div.home-page > section.homepage-body > div.main-view > div.homepage-body-balance-and-limits > poalim-balance-and-limits > section > ul > li:nth-child(1) > div > span.currentBalance-v2.d-inline-flex'; // Replace with the actual selector for the table
        await page.waitForSelector(balanceSelector);

        // Extract data from the element
        const extractedData = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element ? element.textContent : null;
        }, balanceSelector);
        const currentDate = this.getDate();
        const balance = {
            date: currentDate,
            amount: extractedData
        }
        await dataBaseService.saveBalance(balance);
        return balance;
    }
}

export = new BalanceService();