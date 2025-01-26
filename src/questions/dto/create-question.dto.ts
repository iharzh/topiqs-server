import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    example: 'What comes with greater power?',
    required: true,
  })
  question: string;

  @ApiProperty({
    example: 'Greater responsibility.',
    required: true,
  })
  answer: string;

  @ApiProperty({
    type: 'array',
    required: false,
    items: {
      type: 'string',
    },
    description: 'Ids of topics the question belongs to.',
    example: ['topic1-id', 'topic2-id'],
  })
  topicsIds?: string[];
}
