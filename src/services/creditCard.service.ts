import puppeteer, { Browser, Page } from 'puppeteer';
import { setTimeout } from "timers/promises";


class CreditCardService {

  private async moveToCreditCardMenu(page: Page): Promise<any> {
    // Wait for the button to be available and click it
    const buttonSelector = '#mega-menu-2';
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
  }


  private async getElementById(page: Page, partialId: string): Promise<any> {
    return await page.evaluate((partialId) => {
      return Array.from(document.querySelectorAll('*')).filter(element =>
        element.id.includes(partialId)
      ).map(element => element.outerHTML);
    }, partialId);
  }

  private async getData(page: Page): Promise<any> {
    const tableSelector = '/html/body/rb-root/poalim-header-footer-layout/main/poalim-aside-layout/div/poalim-title-layout/poalim-accounts-transaction/poalim-account-transaction/div/ul[1]/li[1]/div/poalim-card-table/section[1]/div/table'; // Replace with the actual selector for the table
    // await page.waitForSelector(tableSelector);
    await setTimeout(1000);

    // Extract data from the table
    const tableData = await page.evaluate((selector) => {
      const table = document.querySelector('/html/body/rb-root/poalim-header-footer-layout/main/poalim-aside-layout/div/poalim-title-layout/poalim-accounts-transaction/poalim-account-transaction/div/ul[1]/li[1]/div/poalim-card-table/section[1]/div/table');
      if (!table) {
        console.log('not found')
        return null;
      }

      const rows: HTMLTableRowElement[] = Array.from(table.querySelectorAll('tr'));
      return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        return cells.map(cell => cell.textContent);
      });
    }, tableSelector);
    return tableData;
  }

//   private async getData1(page:Page):Promise<any>{
// // Wait for the table element to appear using XPath
// const [table] = await page.$('/html/body/rb-root/poalim-header-footer-layout/main/poalim-aside-layout/div/poalim-title-layout/poalim-accounts-transaction/poalim-account-transaction/div/ul[1]/li[1]/div/poalim-card-table/section[1]/div/table');
//     return table;
//   }

  // public async scrap(page: Page): Promise<any> {
  //   await this.moveToCreditCardMenu(page);
  //   await setTimeout(5000);
  //   const data = await this.getData1(page);
  //   console.log(data[0])
  //   await setTimeout(5000);
  // }
}

export = new CreditCardService();