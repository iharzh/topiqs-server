import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User as UserEntity } from './users/db/user.entity';
import { Topic as TopicEntity } from './topics/db/topic.entity';
import { AddDefaultUser1730047540711 } from './migrations/1730047540711-add-default-user';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UserEntity, TopicEntity],
  migrations: [AddDefaultUser1730047540711],
  logging: ['query', 'error'],
  logger: 'advanced-console',
});
