import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controllers/message.controller';
import { Message } from 'src/entities/Message';
import { MessageService } from 'src/services/message.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, TwilioService],
  controllers: [MessageController],
})
export class MessageModule {}
