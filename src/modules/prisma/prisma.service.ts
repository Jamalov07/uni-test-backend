import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Global, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor(config: ConfigService) {
		super({
			datasources: {
				db: {
					url: config.getOrThrow<string>('database.url'),
				},
			},
		})
	}

	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
