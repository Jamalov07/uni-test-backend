import { Module } from '@nestjs/common'
import { GroupController } from './group.controller'
import { GroupService } from './group.service'
import { GroupRepository } from './group.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [GroupController],
	providers: [GroupService, GroupRepository],
	exports: [],
})
export class GroupModule {}
