import puppeteer, { Browser, Page } from 'puppeteer';
import { setTimeout } from "timers/promises";
import * as cheerio from 'cheerio';
import dateHelper from './dateHelper.service';
import { CraeditCard } from '../types/creditCard'
import dataBaseService from './dataBase.proxy.service'


class CreditCardService {

  private async moveToCreditCardMenu(page: Page): Promise<any> {
    // Wait for the button to be available and click it
    const buttonSelector = '#mega-menu-2';
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
  }

  private async getPagecontent(page: Page): Promise<any> {
    return await page.content();
  }

  private async getTablePartFromContent(inputString, startPart, endPart): Promise<string> {
    // Find the index of the startPart
    const startIndex = inputString.indexOf(startPart);

    // If startPart is not found, return an empty string
    if (startIndex === -1) {
      return '';
    }

    // Slice the string to keep everything from startPart onwards
    const slicedString = inputString.slice(startIndex);

    // Find the index of the endPart
    const endIndex = slicedString.indexOf(endPart);

    // If endPart is found, slice the string to remove everything after it
    if (endIndex !== -1) {
      return slicedString.slice(0, endIndex);
    }

    // If endPart is not found, return the entire sliced string
    return slicedString;
  }

  private async convertTableToJSON(htmlTable: string): Promise<any> {
    const $ = cheerio.load(htmlTable);
    const tableData: object[] = [];

    // Get the header
    const headers: string[] = [];
    $('table thead th').each((index, element) => {
      headers.push($(element).text().trim());
    });

    // Get the rows
    $('table tbody tr').each((index, element) => {
      const rowData: { [key: string]: string } = {};
      $(element).find('td, th').each((i, cell) => {
        rowData[headers[i]] = $(cell).text().trim();
      });
      tableData.push(rowData);
    });

    return tableData;
  }

  private getLastDayCreditCard(content: object[]): object[] {
    const data: object[] = [];
    content.forEach(transaction => {
      const keys = Object.keys(transaction);
      if (keys.length > 1) {
        console.log(transaction[keys[0]]);
        if (dateHelper.isLastDay(transaction[keys[0]])) {
          data.push(transaction);
        }
      }
    });
    return data;
  }

  private extractSubstring(input: string, startPart: string, delimiter: string) {
    // Find the index of the startPart
    const startIndex = input.indexOf(startPart);
    // Slice the string to keep everything from startPart onwards
    const slicedString = input.slice(startIndex);
    const index = slicedString.indexOf(delimiter);

    if (index !== -1) {
      const sub = slicedString.slice(0, index);
      return sub.slice(startPart.length);
    }
    // If the delimiter is not found, return the original string.
    return slicedString;
  }

  public async scrap(page: Page): Promise<CraeditCard> {
    await this.moveToCreditCardMenu(page);
    await setTimeout(5000);
    // Get the entire HTML content of the page
    const pageContent = await this.getPagecontent(page);
    const tableSection = await this.getTablePartFromContent(pageContent, '<table', '</table>');
    const jsonTable = await this.convertTableToJSON(tableSection);
    // const lastDayTransactions = this.getLastDayCreditCard(jsonTable);
    const totalAmount = this.extractSubstring(pageContent, '<span class="number amount-font">', '</span>');
    const totalAmountDate = this.extractSubstring(pageContent, 'date ng-star-inserted', '</div>').slice(20);;
    const creditCard = {
      amount: totalAmount,
      date: totalAmountDate,
      transactions: jsonTable
    }
    await dataBaseService.saveCreditCardMovements(creditCard);
    return creditCard;
  }
}

export = new CreditCardService();