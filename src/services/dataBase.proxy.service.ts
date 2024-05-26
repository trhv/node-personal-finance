import { Balance } from "../types/balance";
import { LastMovement } from "../types/lastMovement";
import fs from 'fs';

class DataBaseProxy {

    private getDate(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    public async saveBalance(balance: Balance): Promise<any> {
        var json = JSON.stringify(balance);
        fs.writeFile(`/DS/Balance/${balance.date}.json`, json, 'utf8', () => { });
    }

    public async saveLastMovements(lastMovements: LastMovement[]): Promise<any> {
        var json = JSON.stringify(lastMovements);
        fs.writeFile(`/DS/LastMovements/${this.getDate()}.json`, json, 'utf8', () => { });
    }

    public async saveCreditCardMovements(creditCardMovements: any): Promise<any> {
        var json = JSON.stringify(creditCardMovements);
        fs.writeFile(`/DS/CreditCardMovements/${this.getDate()}.json`, json, 'utf8', () => { });
    }
}

export = new DataBaseProxy();