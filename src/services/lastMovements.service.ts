import { Page } from 'puppeteer';
import { setTimeout } from "timers/promises";
import { LastMovement } from '../types/lastMovement'
import dataBaseService from './dataBase.proxy.service'
import dateHelper from './dateHelper.service'
import fs from 'fs';
import * as cheerio from 'cheerio';


class LastMovements {

  private async moveToMovementsMenu(page: Page): Promise<any> {
    // Wait for the button to be available and click it
    const buttonSelector = '#mega-menu-1';
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
  }

  private async getData(page: Page): Promise<any> {
    const tableSelector = '#transactions-table-12-716-8622 > poalim-transactions-table > div > table'; // Replace with the actual selector for the table
    await page.waitForSelector(tableSelector);

    // Extract data from the table
    const tableData = await page.evaluate((selector) => {
      const table = document.querySelector(selector);
      if (!table) return null;

      const rows: HTMLTableRowElement[] = Array.from(table.querySelectorAll('tr'));
      return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent);
      });
    }, tableSelector);
    return tableData;
  }

  private parseData(movements: string[][]): LastMovement[] {

    let lastMovements: LastMovement[] = [];

    movements.forEach((movement, index) => {

      if (index != 0 && movement[0]) {
        let amount;
        try {
          amount = movement[2] ? "-" + movement[2].split(' ')[1] : movement[3].split(' ')[1]
        } catch (error) {
          console.log(movement)
        }
        if (dateHelper.isLastDay(movement[0].split(' ')[1])) {
          lastMovements.push({
            date: movement[0].split(' ')[1],
            action: movement[1],
            amount,
          })
        }
      }
    });

    // var json = JSON.stringify(lastMovements);
    // fs.writeFile('test.json', json, 'utf8', () => { });
    return lastMovements;
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


  private async getPagecontent(page: Page): Promise<any> {
    return await page.content();
  }

  private async getRawData(page: Page): Promise<any> {
    // Get the entire HTML content of the page
    const pageContent = await this.getPagecontent(page);
    try {
      fs.writeFile(`t.text`, pageContent, 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  public async scrap(page: Page): Promise<any> {
    await this.moveToMovementsMenu(page);
    await setTimeout(5000);
    const data = await this.getData(page);
    await setTimeout(5000);
    const parsedData = this.parseData(data);
    await dataBaseService.saveLastMovements(parsedData);
    const pageContent = await this.getRawData(page);
    const tableSection = await this.getTablePartFromContent(pageContent, '<table', '</table>');

    return tableSection;
  }
}

export = new LastMovements();