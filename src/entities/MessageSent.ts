import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageSent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  messageId: string;
  @Column()
  status: string;
}
