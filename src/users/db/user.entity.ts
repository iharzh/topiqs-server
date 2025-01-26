import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from '../../topics/db/topic.entity';
import { Question } from '../../questions/db/question.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    length: 255,
  })
  firstName: string;

  @Column({
    nullable: true,
    length: 255,
  })
  lastName: string;

  @Column({
    nullable: true,
    length: 100,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
  })
  password: string;

  @OneToMany(() => Topic, (topic) => topic.user)
  topics: Topic[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];
}
