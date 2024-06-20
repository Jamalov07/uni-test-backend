import { Module } from '@nestjs/common'
import { ScienceController } from './science.controller'
import { ScienceService } from './science.service'
import { ScienceRepository } from './science.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [ScienceController],
	providers: [ScienceService, ScienceRepository],
	exports: [],
})
export class ScienceModule {}
