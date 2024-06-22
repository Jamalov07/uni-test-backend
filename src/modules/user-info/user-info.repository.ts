import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	UserInfoCreateRequest,
	UserInfoCreateResponse,
	UserInfoDeleteRequest,
	UserInfoDeleteResponse,
	UserInfoFindAllRequest,
	UserInfoFindAllResponse,
	UserInfoFindFullRequest,
	UserInfoFindFullResponse,
	UserInfoFindOneRequest,
	UserInfoFindOneResponse,
	UserInfoUpdateRequest,
} from './interfaces'

@Injectable()
export class UserInfoRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: UserInfoFindFullRequest): Promise<UserInfoFindFullResponse> {
		const userInfos = await this.prisma.userInfo.findMany({
			where: {
				userId: payload.userId,
				hemisId: { contains: payload.hemisId, mode: 'insensitive' },
				groupId: payload.groupId,
				deletedAt: null,
			},
			select: {
				id: true,
				user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
				createdAt: true,
				hemisId: true,
				group: { select: { id: true, name: true, createdAt: true } },
			},
		})

		return userInfos
	}

	async findAll(payload: UserInfoFindAllRequest): Promise<UserInfoFindAllResponse> {
		const userInfos = await this.prisma.userInfo.findMany({
			where: {
				userId: payload.userId,
				hemisId: { contains: payload.hemisId, mode: 'insensitive' },
				groupId: payload.groupId,
				deletedAt: null,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: {
				id: true,
				user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
				createdAt: true,
				hemisId: true,
				group: { select: { id: true, name: true, createdAt: true } },
			},
		})

		const userInfosCount = await this.prisma.userInfo.count({
			where: {
				userId: payload.userId,
				hemisId: { contains: payload.hemisId, mode: 'insensitive' },
				groupId: payload.groupId,
				deletedAt: null,
			},
		})

		return {
			pageSize: userInfos.length,
			totalCount: userInfosCount,
			pageCount: Math.ceil(userInfosCount / payload.pageSize),
			data: userInfos,
		}
	}

	async findOne(payload: UserInfoFindOneRequest): Promise<UserInfoFindOneResponse> {
		const userInfo = await this.prisma.userInfo.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
				createdAt: true,
				hemisId: true,
				group: { select: { id: true, name: true, createdAt: true } },
			},
		})

		return userInfo
	}

	async findOneByHemisId(payload: Partial<UserInfoCreateRequest>): Promise<UserInfoFindOneResponse> {
		const userInfo = await this.prisma.userInfo.findFirst({
			where: { hemisId: payload.hemisId, deletedAt: null },
			select: {
				id: true,
				user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
				createdAt: true,
				hemisId: true,
				group: { select: { id: true, name: true, createdAt: true } },
			},
		})
		return userInfo
	}

	async findByUser(payload: { userId: string }): Promise<UserInfoFindOneResponse> {
		const userInfo = await this.prisma.userInfo.findFirst({
			where: { userId: payload.userId, deletedAt: null },
			select: {
				id: true,
				user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
				createdAt: true,
				hemisId: true,
				group: { select: { id: true, name: true, createdAt: true } },
			},
		})
		if (!userInfo) {
			const userInfo2 = await this.prisma.userInfo.findFirst({
				where: { userId: payload.userId },
				select: {
					id: true,
					user: { select: { id: true, image: true, type: true, fullName: true, emailAddress: true, createdAt: true } },
					createdAt: true,
					hemisId: true,
					group: { select: { id: true, name: true, createdAt: true } },
				},
			})
			if (userInfo2) {
				await this.prisma.userInfo.delete({ where: { id: userInfo2.id } })
				await this.findByUser(payload)
			}
		}

		return userInfo
	}

	async create(payload: UserInfoCreateRequest): Promise<UserInfoCreateResponse> {
		await this.prisma.userInfo.create({ data: { userId: payload.userId, hemisId: payload.hemisId, groupId: payload.groupId } })
		return null
	}

	async update(payload: UserInfoFindOneRequest & UserInfoUpdateRequest): Promise<UserInfoUpdateRequest> {
		await this.prisma.userInfo.update({ where: { id: payload.id, deletedAt: null }, data: { userId: payload.userId, hemisId: payload.hemisId, groupId: payload.groupId } })
		return null
	}

	async delete(payload: UserInfoDeleteRequest): Promise<UserInfoDeleteResponse> {
		await this.prisma.userInfo.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
