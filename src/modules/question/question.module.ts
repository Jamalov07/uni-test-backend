import { Module } from '@nestjs/common'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'
import { QuestionRepository } from './question.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [QuestionController],
	providers: [QuestionService, QuestionRepository],
	exports: [],
})
export class QuestionModule {}
