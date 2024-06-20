import { registerAs } from '@nestjs/config'
import { DatabaseConfigOptions } from '../interfaces'

export const databaseConfig = registerAs<DatabaseConfigOptions>(
	'database',
	(): DatabaseConfigOptions => ({
		url: process.env.DATABASE_URL,
	}),
)
