import { Module } from '@nestjs/common'
import { FacultyController } from './faculty.controller'
import { FacultyService } from './faculty.service'
import { FacultyRepository } from './faculty.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [FacultyController],
	providers: [FacultyService, FacultyRepository],
	exports: [],
})
export class FacultyModule {}
