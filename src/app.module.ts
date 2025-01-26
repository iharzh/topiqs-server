import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TopicsModule } from './topics/topics.module';
import { User as UserEntity } from './users/db/user.entity';
import { Topic as TopicEntity } from './topics/db/topic.entity';
import { Question as QuestionEntity } from './questions/db/question.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { RefreshToken as RefreshTokenEntity } from './auth/db/refreshToken.entity';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { QuestionsModule } from './questions/questions.module';

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
      entities: [UserEntity, TopicEntity, RefreshTokenEntity, QuestionEntity],
      synchronize: true,
    }),
    UsersModule,
    TopicsModule,
    AuthModule,
    QuestionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AppModule {}
