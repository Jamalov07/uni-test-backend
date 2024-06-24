import { Module } from '@nestjs/common'
import { SemestrController } from './semestr.controller'
import { SemestrService } from './semestr.service'
import { SemestrRepository } from './semestr.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [SemestrController],
	providers: [SemestrService, SemestrRepository],
	exports: [],
})
export class SemestrModule {}
