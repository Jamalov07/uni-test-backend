import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { AdminRepository } from './admin.repository'
import { PrismaModule } from '../prisma'
import { JWTModule } from '../jwt'

@Module({
	imports: [PrismaModule, JWTModule],
	controllers: [AdminController],
	providers: [AdminService, AdminRepository],
	exports: [AdminRepository, AdminService],
})
export class AdminModule {}
