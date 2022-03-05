import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryColumn({ nullable: false })
  id: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  content: string;
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  params: Array<MessageParams>;
}

export type MessageParams = {
  key: string;
  type: 'string' | 'date' | 'datetime';
};
