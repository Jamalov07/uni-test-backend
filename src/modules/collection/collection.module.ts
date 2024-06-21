import { Module } from '@nestjs/common'
import { CollectionController } from './collection.controller'
import { CollectionService } from './collection.service'
import { CollectionRepository } from './collection.repository'
import { PrismaModule } from '../prisma'
import { QuestionModule } from '../question'

@Module({
	imports: [PrismaModule, QuestionModule],
	controllers: [CollectionController],
	providers: [CollectionService, CollectionRepository],
	exports: [CollectionRepository, CollectionService],
})
export class CollectionModule {}
