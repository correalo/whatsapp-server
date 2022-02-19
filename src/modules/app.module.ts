import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/Message';
import { MessageSent } from '../entities/MessageSent';
import { MessageModule } from './message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({ dest: '../upload' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'example',
      database: 'postgres',
      migrations: ['migrations/*.ts'],
      entities: [Message, MessageSent],
      synchronize: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    MessageModule,
  ],
})
export class AppModule {}
