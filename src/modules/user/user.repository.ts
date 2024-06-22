import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindFullResponse,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
} from './interfaces'

@Injectable()
export class UserRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: UserFindFullRequest): Promise<UserFindFullResponse> {
		const users = await this.prisma.user.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
			},
			select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true },
		})

		return users
	}

	async findAll(payload: UserFindAllRequest): Promise<UserFindAllResponse> {
		const users = await this.prisma.user.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true },
		})

		const usersCount = await this.prisma.user.count({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
			},
		})

		return {
			pageSize: users.length,
			totalCount: usersCount,
			pageCount: Math.ceil(usersCount / payload.pageSize),
			data: users,
		}
	}

	async findOne(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},
						id: true,
						createdAt: true,
					},
				},
			},
		})

		return user
	}

	async findOneWithPassword(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				password: true,
				type: true,
				userInfo: {
					select: {
						hemisId: true,
						group: {
							select: {
								id: true,
								course: { select: { id: true, stage: true, createdAt: true } },
								faculty: { select: { id: true, name: true, createdAt: true } },
								name: true,
								createdAt: true,
							},
						},
						id: true,
						createdAt: true,
					},
				},
			},
		})

		return user
	}

	async findByEmail(payload: Partial<UserFindOneResponse>): Promise<UserFindOneResponse> {
		const user = await this.prisma.user.findFirst({ where: { emailAddress: payload.emailAddress, id: { not: payload.id } } })
		return user
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		await this.prisma.user.create({ data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: '' } })
		return null
	}

	async createWithReturningId(payload: UserCreateRequest): Promise<string> {
		const user = await this.prisma.user.create({
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: '' },
		})
		return user.id
	}

	async update(payload: UserFindOneRequest & UserUpdateRequest): Promise<UserUpdateRequest> {
		await this.prisma.user.update({
			where: { id: payload.id },
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: '' },
		})
		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.prisma.user.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
