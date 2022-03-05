import { Injectable } from '@nestjs/common';
import { SendMessageRequest } from '../requests/send.message.request';
import { TwilioService } from '../twilio/twilio.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/entities/Message';
import { MessageValidatorService } from 'src/validators/message.validator.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private readonly twilioService: TwilioService,
    private readonly messageValidatorService: MessageValidatorService,
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async findMessageById(id: string): Promise<Message> {
    return this.messageRepository.findOneOrFail(id);
  }

  async sendMessage(
    request: SendMessageRequest,
    buffer: Buffer,
  ): Promise<void> {
    const csvLinesDto = this.parseCsvToObject(buffer);
    const message = await this.findMessageById(request.messageId);
    this.messageValidatorService.validate(csvLinesDto, message.params);
    const promises = csvLinesDto.map((csvLine) => {
      return this.twilioService.sendMessage(
        csvLine.numero,
        this.buildMessage(csvLine, message.content),
      );
    });
    await Promise.all(promises);
  }

  private buildMessage(pacient: any, message: string): string {
    return Object.keys(pacient).reduce((acc, curr) => {
      return acc.replace('${' + curr + '}', pacient[curr]);
    }, message);
  }

  private parseCsvToObject(buffer: Buffer): CsvLineDTO[] {
    const lines = buffer.toString().replace(/\r/g, '').split('\n');
    const header = lines.splice(0, 1)[0].split(',');
    return lines.map((line) => {
      const values = line.split(',');
      const object = new Object();
      header.forEach((param, index) => {
        object[param] = values[index];
      });
      return object;
    });
  }
  // private async readCsvFile(path: string): Promise<Array<any>> {
  //   const lines = [];

  //   const readStream = fs
  //     .createReadStream(path)
  //     .pipe(csv())
  //     .on('data', (data) => lines.push(data))
  //     .on('end', () => lines);
  //   for await (const chunk of readStream) {
  //     console.log('>>> ' + JSON.stringify(chunk));
  //   }
  //   return lines;
  // }
}

export class CsvLineDTO {
  nome?: string;
  data?: string;
  numero?: string;
  hora?: string;
}
