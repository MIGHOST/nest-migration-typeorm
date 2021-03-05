import { ManyToOne } from 'typeorm';
import User from './../user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;  
  @Column()
  content: string;
  @Column()
  userId: number;
  // @OneToOne(()=> User, user => user.article)
  // user: User;
  @ManyToOne((type) => User, (user) => user.article)
  user: User;
}