import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { User as UserEntity } from './db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}

  async create(user: Omit<User, 'id'>) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log({ user });
      throw new Error();
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err: any) {
      console.log(`UsersService.create error: `, err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}
