import { Module } from '@nestjs/common'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'
import { CourseRepository } from './course.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [CourseController],
	providers: [CourseService, CourseRepository],
	exports: [],
})
export class CourseModule {}
