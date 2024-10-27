import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic as TopicEntity } from './db/topic.entity';
import { DataSource, Repository } from 'typeorm';
import { Topic } from './interfaces/topic.interface';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }
}
