import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryColumn()
  id: string;
  @Column()
  content: string;
}
