import nodemailer from 'nodemailer';

class MailProxy {

  public async sendMail(): Promise<any> {

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail', 'yahoo', 'hotmail'
      auth: {
        user: 'trhv.sh@gmail.com',
        pass: 'onugtikmnrykswkq',
      },
    });

    // Email options
    const mailOptions = {
      from: 'trhv.sh@gmail.com', // Sender's address
      to: 'trhv.sh@gmail.com', // Recipient's address
      subject: 'Test Email from Node.js and TypeScript',
      text: 'Hello, this is a test email sent from a Node.js application using TypeScript.',
      html: '<p>Hello, this is a <strong>test email</strong> sent from a Node.js application using TypeScript.</p>',
    };

    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export = new MailProxy();