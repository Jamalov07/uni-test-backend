import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { PrismaModule } from '../prisma'
import { UserInfoModule } from '../user-info'

@Module({
	imports: [PrismaModule, UserInfoModule],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserRepository, UserService],
})
export class UserModule {}
