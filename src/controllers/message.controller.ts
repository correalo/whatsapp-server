import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { MessageService } from '../services/message.service';
import { SendMessageRequest } from '../requests/send.message.request';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('message')
  @UseInterceptors(FileInterceptor('file'))
  async postMessage(
    @UploadedFile() file: Express.Multer.File,
    @Body() request: SendMessageRequest,
  ) {
    return this.messageService.sendMessage(request, file.buffer);
  }
}
