import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private accountSid: string = process.env.TWILIO_ACCOUNT_SID;
  private authToken: string = process.env.TWILIO_AUTH_TOKEN;
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  async sendMessage(number: string, message: string, ddd = '11', ddi = '+55') {
    const response = await this.client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${ddi}${ddd}${number}`,
    });
    console.log(response);
  }
}
