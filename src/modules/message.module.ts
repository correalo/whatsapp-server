import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from 'src/controllers/message.controller';
import { Message } from 'src/entities/Message';
import { MessageService } from 'src/services/message.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { MessageValidatorService } from 'src/validators/message.validator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageService, TwilioService, MessageValidatorService],
  controllers: [MessageController],
})
export class MessageModule {}
