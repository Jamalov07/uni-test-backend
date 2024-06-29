import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	AdminModule,
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
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'images'),
		}),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		JWTModule,
		AdminModule,
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
