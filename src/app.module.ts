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
		ServeStaticModule.forRoot(
			{
				rootPath: join(__dirname, '..', 'images'),
				serveRoot: '/uploads',
			},
			{
				rootPath: join(__dirname, '..', 'files'),
				serveRoot: '/files',
			},
		),
		ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
		PrismaModule,
		JWTModule,
		AdminModule,
		UserModule,
		CourseModule,
		FacultyModule,
		ScienceModule,
		GroupModule,
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
