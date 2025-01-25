import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/topics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.topicsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return await this.topicsService.create(createTopicDto);
  }
}
