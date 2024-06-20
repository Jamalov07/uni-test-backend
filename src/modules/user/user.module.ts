import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserRepository, UserService],
})
export class UserModule {}
