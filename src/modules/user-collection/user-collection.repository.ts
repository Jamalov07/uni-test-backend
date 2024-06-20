import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	UserCollectionCreateRequest,
	UserCollectionCreateResponse,
	UserCollectionDeleteRequest,
	UserCollectionDeleteResponse,
	UserCollectionFindAllRequest,
	UserCollectionFindAllResponse,
	UserCollectionFindFullRequest,
	UserCollectionFindFullResponse,
	UserCollectionFindOneRequest,
	UserCollectionFindOneResponse,
	UserCollectionUpdateRequest,
} from './interfaces'

@Injectable()
export class UserCollectionRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: UserCollectionFindFullRequest): Promise<UserCollectionFindFullResponse> {
		const userCollections = await this.prisma.userCollection.findMany({
			where: { userId: payload.userId, collectionId: payload.collectionId, deletedAt: null },
			select: {
				id: true,
				user: { select: { id: true, createdAt: true, emailAddress: true, fullName: true, type: true, image: true } },
				collection: { select: { id: true, name: true, createdAt: true, language: true, maxAttempts: true, givenMinutes: true, amountInTest: true } },
				haveAttempt: true,
				createdAt: true,
			},
		})

		return userCollections
	}

	async findAll(payload: UserCollectionFindAllRequest): Promise<UserCollectionFindAllResponse> {
		const userCollections = await this.prisma.userCollection.findMany({
			where: { userId: payload.userId, collectionId: payload.collectionId, deletedAt: null },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: {
				id: true,
				user: { select: { id: true, createdAt: true, emailAddress: true, fullName: true, type: true, image: true } },
				collection: { select: { id: true, name: true, createdAt: true, language: true, maxAttempts: true, givenMinutes: true, amountInTest: true } },
				haveAttempt: true,
				createdAt: true,
			},
		})

		const userCollectionsCount = await this.prisma.userCollection.count({
			where: { userId: payload.userId, collectionId: payload.collectionId, deletedAt: null },
		})

		return {
			pageSize: userCollections.length,
			totalCount: userCollectionsCount,
			pageCount: Math.ceil(userCollectionsCount / payload.pageSize),
			data: userCollections,
		}
	}

	async findOne(payload: UserCollectionFindOneRequest): Promise<UserCollectionFindOneResponse> {
		const userCollection = await this.prisma.userCollection.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				user: { select: { id: true, createdAt: true, emailAddress: true, fullName: true, type: true, image: true } },
				collection: { select: { id: true, name: true, createdAt: true, language: true, maxAttempts: true, givenMinutes: true, amountInTest: true } },
				haveAttempt: true,
				createdAt: true,
			},
		})

		return userCollection
	}

	async findByUserCollection(payload: Partial<UserCollectionCreateRequest>): Promise<UserCollectionFindOneResponse> {
		const userCollection = await this.prisma.userCollection.findFirst({
			where: { collectionId: payload.collectionId, userId: payload.userId, deletedAt: null },
			select: {
				id: true,
				user: { select: { id: true, createdAt: true, emailAddress: true, fullName: true, type: true, image: true } },
				collection: { select: { id: true, name: true, createdAt: true, language: true, maxAttempts: true, givenMinutes: true, amountInTest: true } },
				haveAttempt: true,
				createdAt: true,
			},
		})
		return userCollection
	}

	async create(payload: UserCollectionCreateRequest): Promise<UserCollectionCreateResponse> {
		await this.prisma.userCollection.create({ data: { haveAttempt: payload.haveAttempt, userId: payload.userId, collectionId: payload.collectionId } })
		return null
	}

	async update(payload: UserCollectionFindOneRequest & UserCollectionUpdateRequest): Promise<UserCollectionUpdateRequest> {
		await this.prisma.userCollection.update({
			where: { id: payload.id },
			data: { haveAttempt: payload.haveAttempt, userId: payload.userId, collectionId: payload.collectionId },
		})
		return null
	}

	async delete(payload: UserCollectionDeleteRequest): Promise<UserCollectionDeleteResponse> {
		await this.prisma.userCollection.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
