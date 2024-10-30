import { Body, Controller, Get, Post } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/topics.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async findAll() {
    return this.topicsService.findAll();
  }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return await this.topicsService.create(createTopicDto);
  }
}
