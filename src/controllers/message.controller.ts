import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { MessageService } from '../services/message.service';
import { SendMessageRequest } from '../requests/send.message.request';
import { Message } from 'src/entities/Message';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  async findAll(): Promise<MessageDTO[]> {
    return await this.messageService.findAll().then((response) =>
      response.map((message) => {
        return {
          id: message.id,
          description: message.description,
        };
      }),
    );
  }

  @Get(':id')
  async findOne(@Param() params): Promise<Message> {
    return await this.messageService.findMessageById(params.id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async postMessage(
    @UploadedFile() file: Express.Multer.File,
    @Body() request: SendMessageRequest,
  ) {
    return this.messageService.sendMessage(request, file.buffer);
  }
}

export class MessageDTO {
  id: string;
  description: string;
}
