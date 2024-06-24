import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	AnswerModule,
	ArchiveModule,
	CollectionModule,
	CourseModule,
	FacultyModule,
	GroupModule,
	JWTModule,
	PrismaModule,
	QuestionModule,
	ScienceModule,
	SemestrModule,
	UserCollectionModule,
	UserInfoModule,
	UserModule,
} from './modules'
import { databaseConfig } from './configs'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		JWTModule,
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
		SemestrModule,
	],
})
export class AppModule {}
