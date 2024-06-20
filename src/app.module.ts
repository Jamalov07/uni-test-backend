import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	AnswerModule,
	ArchiveModule,
	CollectionModule,
	CourseModule,
	FacultyModule,
	GroupModule,
	PrismaModule,
	QuestionModule,
	ScienceModule,
	UserCollectionModule,
	UserInfoModule,
	UserModule,
} from './modules'
import { databaseConfig } from './configs'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		CourseModule,
		FacultyModule,
		ScienceModule,
		GroupModule,
		UserModule,
		UserInfoModule,
		CollectionModule,
		QuestionModule,
		AnswerModule,
		UserCollectionModule,
		ArchiveModule,
	],
})
export class AppModule {}
