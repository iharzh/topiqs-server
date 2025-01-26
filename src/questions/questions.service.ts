import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question as QuestionEntity } from './db/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Topic as TopicEntity } from '../topics/db/topic.entity';
import { User } from '../users/db/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async getAll() {
    return await this.questionRepository.find();
  }

  async createQuestion(userId: string, createQuestionDto: CreateQuestionDto) {
    const user = new User();
    user.id = userId;

    const topics =
      createQuestionDto.topicsIds?.map((topicId) => {
        const topic = new TopicEntity();

        topic.id = topicId;
        return topic;
      }) || [];

    const question = new QuestionEntity();
    question.question = createQuestionDto.question;
    question.answer = createQuestionDto.answer;
    question.topics = topics;
    question.user = user;

    return await this.questionRepository.save(question);
  }
}
