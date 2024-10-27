import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/db/user.entity';

@Entity({
  name: 'topics',
})
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 255,
    primary: true,
  })
  name: string;

  @Column({
    nullable: true,
    length: 255,
  })
  description: string;

  // @ts-expect-error - example taken from docs, no other side of relation required in this case
  @ManyToOne(() => User, (user) => user.topics)
  user: User;
}
