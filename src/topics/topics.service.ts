import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic as TopicEntity } from './db/topic.entity';
import { Repository } from 'typeorm';
import { Topic } from './interfaces/topic.interface';
import { User } from '../users/db/user.entity';
import { CreateTopicDto } from './dto/topics.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return await this.topicRepository.find();
  }

  async create(userId: string, createTopicDto: CreateTopicDto) {
    const user = new User();
    user.id = userId;

    const topic = new TopicEntity();
    topic.name = createTopicDto.name;
    topic.description = createTopicDto.description;
    topic.user = user;

    return await this.topicRepository.save(topic);
  }

  async updateTopic(topicId: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.findOneBy({ id: topicId });

    if (!topic) {
      throw new NotFoundException(`Topic with id ${topicId} not found`);
    }

    return await this.topicRepository.save({ id: topicId, ...updateTopicDto });
  }

  async deleteTopic(topicId: string): Promise<void> {
    const topic = await this.topicRepository.findOneBy({ id: topicId });

    if (!topic) {
      throw new NotFoundException(`Topic with id ${topicId} not found`);
    }

    await this.topicRepository.remove(topic); // returns the removed entity
  }
}
