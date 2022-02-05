import { Injectable } from '@nestjs/common';
import { SendMessageRequest } from './requests/sendMessageRequest';
import { TwilioService } from './twilio/twilio.service';

@Injectable()
export class AppService {
  constructor(private readonly twilioService: TwilioService) {}

  async sendMessage(request: SendMessageRequest): Promise<void> {
    return this.twilioService.sendMessage(request.number, request.message);
  }
}
