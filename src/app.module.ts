import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/db/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicsModule } from './topics/topics.module';
import { Topic } from './topics/db/topic.entity';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [User, Topic],
      synchronize: true,
    }),
    UsersModule,
    TopicsModule,
  ],
})
export class AppModule {}
