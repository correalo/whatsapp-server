import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { AppService } from './app.service';
import { SendMessageRequest } from './requests/sendMessageRequest';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('message')
  async postMessage(@Body() body: SendMessageRequest): Promise<void> {
    return this.appService.sendMessage(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log(file);
    console.log(body);
  }
}
