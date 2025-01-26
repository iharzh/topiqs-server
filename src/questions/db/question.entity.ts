import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/db/user.entity';
import { Topic } from '../../topics/db/topic.entity';

@Entity({
  name: 'questions',
})
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  question: string;

  @Column({
    nullable: false,
  })
  answer: string;

  @ManyToOne(() => User, (user) => user.questions)
  user: User;

  @ManyToMany(() => Topic)
  @JoinTable()
  topics: Topic[];
}
