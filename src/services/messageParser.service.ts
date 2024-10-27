import { Balance } from "../types/balance";
import { CraeditCard } from "../types/creditCard";
import { LastMovement } from "../types/lastMovement";

class MessageParser {


  public async prepareMsg(balance: Balance, creditCard: CraeditCard,
    lastMovements: LastMovement[]): Promise<any> {
      

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      // return '<p>Hello11, this is a <strong>test email</strong> sent from a Node.js application using TypeScript.</p>';
      return `<html lang="en" dir="rtl"></html>
      <body>
        <h1>
          מצב חשבון נכון לתאריך : ${formattedDate}
        </h1>
        <h3>
          יתרה בחשבון : ${balance.amount}
        </h3>
        
      </body>
      `;

  }
}

export = new MessageParser();