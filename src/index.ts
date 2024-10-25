import puppeteer from 'puppeteer';
import { setTimeout } from "timers/promises";
import loginService from './login.service'
import lastMovementsService from './services/lastMovements.service';
import balanceService from './services/balance.service'
import creditCardService from './services/creditCard.service'
import { Balance } from './types/balance';

(async () => {

  const browser = await loginService.createBrowser();
  const page = await loginService.createPage(browser);
  await setTimeout(5000);
  await loginService.doLogin(page);
  await setTimeout(5000);

  // const balance: Balance = await balanceService.scrap(page);

  // const lastMovements = await lastMovementsService.scrap(page);

  // const creditCardMovements = await creditCardService.scrap(page);
  await setTimeout(10000);

  // await setTimeout(20000);
  // Close the browser
  await browser.close();
})();
