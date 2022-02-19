import { Injectable } from '@nestjs/common';
import { SendMessageRequest } from '../requests/sendMessageRequest';
import { TwilioService } from '../twilio/twilio.service';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/entities/Message';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly twilioService: TwilioService,
  ) {}

  async sendMessage(
    request: SendMessageRequest,
    filePath: string,
  ): Promise<void> {
    const pacients = await this.readCsvFile(filePath);
    const message = await this.messageRepository.findOneOrFail(
      request.messageId,
    );
    const promises = pacients.map((pacient) => {
      return this.twilioService.sendMessage(
        pacient.numero,
        this.buildMessage(pacient, message.content),
      );
    });
    await Promise.all(promises);
  }

  private buildMessage(pacient: any, message: string): string {
    return Object.keys(pacient).reduce((acc, curr) => {
      return acc.replace('${' + curr + '}', pacient[curr]);
    }, message);
  }

  private async readCsvFile(path: string): Promise<Array<any>> {
    const lines = [];

    const readStream = fs
      .createReadStream(path)
      .pipe(csv())
      .on('data', (data) => lines.push(data))
      .on('end', () => lines);
    for await (const chunk of readStream) {
      console.log('>>> ' + JSON.stringify(chunk));
    }
    return lines;
  }
}
