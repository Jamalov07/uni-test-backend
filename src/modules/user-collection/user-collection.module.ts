import { Module } from '@nestjs/common'
import { UserCollectionController } from './user-collection.controller'
import { UserCollectionService } from './user-collection.service'
import { UserCollectionRepository } from './user-collection.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [UserCollectionController],
	providers: [UserCollectionService, UserCollectionRepository],
	exports: [UserCollectionRepository, UserCollectionService],
})
export class UserCollectionModule {}
