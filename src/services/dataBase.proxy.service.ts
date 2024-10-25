import { Balance } from "../types/balance";
import { LastMovement } from "../types/lastMovement";
import fs from 'fs';
import path from 'path';
import {CraeditCard}from '../types/creditCard'
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

  public async saveCreditCardMovements(creditCard: CraeditCard): Promise<any> {
    try {
      var json = JSON.stringify(creditCard);
      fs.writeFile(`DS/Creditcard/${this.getDate()}.json`, json, 'utf8', (err) => {
        if (err) {
          console.error(err)
        }
      });
    } catch (error) {
      console.error(error)
    }
  }
}

export = new DataBaseProxy();