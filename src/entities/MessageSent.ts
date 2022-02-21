import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages_sent')
export class MessageSent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  messageId: string;
  @Column()
  status: string;
}
