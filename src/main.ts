import { json } from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appConfig } from './configs'

setImmediate(async (): Promise<void> => {
	const app = await NestFactory.create<INestApplication>(AppModule, { cors: true })

	app.use(json({ limit: '50mb' }))
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

	const swaggerConfig = new DocumentBuilder()
		.addBearerAuth({
			description: `[just text field] Please enter token in following format: Bearer <JWT>`,
			name: 'Authorization',
			bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
			scheme: 'Bearer',
			type: 'http', // I`ve attempted type: 'apiKey' too
			in: 'Header',
		})
		.build()
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, document)

	console.log('app config:', appConfig)

	await app.listen(appConfig.port, appConfig.host)
})
