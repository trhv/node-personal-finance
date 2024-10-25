import { Balance } from "../types/balance";
import { LastMovement } from "../types/lastMovement";
import fs from 'fs';
import path from 'path';

class DataBaseProxy {

  private getDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public async saveBalance(balance: Balance): Promise<any> {
    try {
      var json = JSON.stringify(balance);
      fs.writeFile(`DS/Balance/${balance.date}.json`, json, 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  public async saveLastMovements(lastMovements: LastMovement[]): Promise<any> {
    try {
      var json = JSON.stringify(lastMovements);
      fs.writeFile(`DS/LastMovements/${this.getDate()}.json`, json, 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      });
    } catch (error) {
      console.error(error)
    }
  }

  public async saveCreditCardMovements(creditCardMovements: any): Promise<any> {
    var json = JSON.stringify(creditCardMovements);
    // fs.writeFile(`/DS/CreditCardMovements/${this.getDate()}.json`, json, 'utf8', () => { });
  }
}

export = new DataBaseProxy();