import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../../topics/db/topic.entity';

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

  @PrimaryColumn({
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
}
