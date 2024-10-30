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

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
