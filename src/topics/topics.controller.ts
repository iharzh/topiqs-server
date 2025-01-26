import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/topics.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTopicDto } from './dto/update-topic.dto';

@ApiTags('Topics')
@Controller('users/:userId/topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async findAll() {
    return this.topicsService.findAll();
  }

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return await this.topicsService.create(userId, createTopicDto);
  }

  @Patch(':topicId')
  async updateTopic(
    @Param('topicId') topicId: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return await this.topicsService.updateTopic(topicId, updateTopicDto);
  }

  @Delete(':topicId')
  async deleteTopic(@Param('topicId') topicId: string) {
    return await this.topicsService.deleteTopic(topicId);
  }
}
