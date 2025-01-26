import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller('users/:userId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getAll() {
    return await this.questionsService.getAll();
  }

  @Post()
  async create(
    @Param('userId') userId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    console.log({ createQuestionDto });

    return await this.questionsService.createQuestion(
      userId,
      createQuestionDto,
    );
  }
}
