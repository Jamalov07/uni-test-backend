import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	CollectionCreateRequest,
	CollectionCreateResponse,
	CollectionDeleteRequest,
	CollectionDeleteResponse,
	CollectionFindAllRequest,
	CollectionFindAllResponse,
	CollectionFindFullRequest,
	CollectionFindFullResponse,
	CollectionFindOneRequest,
	CollectionFindOneResponse,
	CollectionFindOneWithQuestionAnswers,
	CollectionUpdateRequest,
} from './interfaces'

@Injectable()
export class CollectionRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: CollectionFindFullRequest): Promise<CollectionFindFullResponse> {
		const collections = await this.prisma.collection.findMany({
			where: {
				language: payload.language,
				name: { contains: payload.name, mode: 'insensitive' },
				scienceId: payload.scienceId,
				deletedAt: null,
			},

			select: {
				id: true,
				language: true,
				createdAt: true,
				name: true,
				maxAttempts: true,
				givenMinutes: true,
				amountInTest: true,
				science: { select: { id: true, name: true, createdAt: true } },
			},
		})

		return collections
	}

	async findAll(payload: CollectionFindAllRequest): Promise<CollectionFindAllResponse> {
		const collections = await this.prisma.collection.findMany({
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			where: {
				language: payload.language,
				name: { contains: payload.name, mode: 'insensitive' },
				scienceId: payload.scienceId,
				deletedAt: null,
			},
			select: {
				id: true,
				language: true,
				createdAt: true,
				name: true,
				maxAttempts: true,
				givenMinutes: true,
				amountInTest: true,
				science: { select: { id: true, name: true, createdAt: true } },
			},
		})

		const collectionsCount = await this.prisma.collection.count({
			where: {
				language: payload.language,
				name: { contains: payload.name, mode: 'insensitive' },
				scienceId: payload.scienceId,
				deletedAt: null,
			},
		})

		return {
			pageSize: collections.length,
			totalCount: collectionsCount,
			pageCount: Math.ceil(collectionsCount / payload.pageSize),
			data: collections,
		}
	}

	async findOne(payload: CollectionFindOneRequest): Promise<CollectionFindOneResponse> {
		const collection = await this.prisma.collection.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				language: true,
				createdAt: true,
				name: true,
				maxAttempts: true,
				givenMinutes: true,
				amountInTest: true,
				science: { select: { id: true, name: true, createdAt: true } },
			},
		})

		return collection
	}

	async findByName(payload: { name: string; id?: string }): Promise<CollectionFindOneResponse> {
		const collection = await this.prisma.collection.findFirst({
			where: { name: payload.name, deletedAt: null, id: { not: payload.id } },
			select: {
				id: true,
				language: true,
				createdAt: true,
				name: true,
				maxAttempts: true,
				givenMinutes: true,
				amountInTest: true,
				science: { select: { id: true, name: true, createdAt: true } },
			},
		})
		return collection
	}

	async findOneWithQuestionAnswers(payload: CollectionFindOneRequest): Promise<CollectionFindOneWithQuestionAnswers> {
		const collection = await this.prisma.collection.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				name: true,
				language: true,
				amountInTest: true,
				givenMinutes: true,
				maxAttempts: true,
				science: { select: { id: true, name: true, createdAt: true } },
				createdAt: true,
				questions: {
					select: {
						id: true,
						text: true,
						createdAt: true,
						answers: {
							select: {
								id: true,
								text: true,
								isCorrect: true,
								createdAt: true,
							},
						},
					},
				},
			},
		})

		return collection
	}

	async create(payload: CollectionCreateRequest): Promise<CollectionCreateResponse> {
		await this.prisma.collection.create({
			data: {
				name: payload.name,
				amountInTest: payload.amountInTest,
				givenMinutes: payload.amountInTest,
				language: payload.language,
				maxAttempts: payload.maxAttempts,
				scienceId: payload.scienceId,
			},
		})
		return null
	}

	async createWithReturningId(payload: CollectionCreateRequest): Promise<string> {
		const collection = await this.prisma.collection.create({
			data: {
				name: payload.name,
				amountInTest: payload.amountInTest,
				givenMinutes: payload.amountInTest,
				language: payload.language,
				maxAttempts: payload.maxAttempts,
				scienceId: payload.scienceId,
				deletedAt: null,
			},
		})
		return collection.id
	}

	async update(payload: CollectionFindOneRequest & CollectionUpdateRequest): Promise<CollectionUpdateRequest> {
		await this.prisma.collection.update({
			where: { id: payload.id, deletedAt: null },
			data: {
				name: payload.name,
				amountInTest: payload.amountInTest,
				givenMinutes: payload.amountInTest,
				language: payload.language,
				maxAttempts: payload.maxAttempts,
				scienceId: payload.scienceId,
			},
		})
		return null
	}

	async delete(payload: CollectionDeleteRequest): Promise<CollectionDeleteResponse> {
		await this.prisma.collection.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
