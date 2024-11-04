import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'refresh_tokens',
})
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    primary: true,
    unique: true,
  })
  refreshToken: string;

  @Column({
    nullable: false,
  })
  userId: string;

  @Column({
    nullable: false,
  })
  expiresAt: Date;
}
