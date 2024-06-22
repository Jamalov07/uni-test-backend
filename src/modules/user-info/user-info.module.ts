import { Module } from '@nestjs/common'
import { UserInfoController } from './user-info.controller'
import { UserInfoService } from './user-info.service'
import { UserInfoRepository } from './user-info.repository'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	controllers: [UserInfoController],
	providers: [UserInfoService, UserInfoRepository],
	exports: [UserInfoService, UserInfoRepository],
})
export class UserInfoModule {}
