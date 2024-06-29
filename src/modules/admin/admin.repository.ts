import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	AdminCreateRequest,
	AdminCreateResponse,
	AdminDeleteRequest,
	AdminDeleteResponse,
	AdminFindAllRequest,
	AdminFindAllResponse,
	AdminFindFullRequest,
	AdminFindFullResponse,
	AdminFindOneRequest,
	AdminFindOneResponse,
	AdminUpdateRequest,
} from './interfaces'

@Injectable()
export class AdminRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: AdminFindFullRequest): Promise<AdminFindFullResponse> {
		const admins = await this.prisma.admin.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
			select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true },
		})

		return admins
	}

	async findAll(payload: AdminFindAllRequest): Promise<AdminFindAllResponse> {
		const admins = await this.prisma.admin.findMany({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true },
		})

		const adminsCount = await this.prisma.admin.count({
			where: {
				fullName: { contains: payload.fullName, mode: 'insensitive' },
				emailAddress: { contains: payload.emailAddress, mode: 'insensitive' },
				type: payload.type,
				deletedAt: null,
			},
		})

		return {
			pageSize: admins.length,
			totalCount: adminsCount,
			pageCount: Math.ceil(adminsCount / payload.pageSize),
			data: admins,
		}
	}

	async findOne(payload: AdminFindOneRequest): Promise<AdminFindOneResponse> {
		const admin = await this.prisma.admin.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				type: true,
			},
		})

		return admin
	}

	async findOneWithPassword(payload: AdminFindOneRequest): Promise<AdminFindOneResponse> {
		const admin = await this.prisma.admin.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				createdAt: true,
				fullName: true,
				emailAddress: true,
				image: true,
				password: true,
				type: true,
			},
		})

		return admin
	}

	async findByEmail(payload: Partial<AdminFindOneResponse>): Promise<AdminFindOneResponse> {
		const admin = await this.prisma.admin.findFirst({ where: { emailAddress: payload.emailAddress, id: { not: payload.id }, deletedAt: null } })
		return admin
	}

	async create(payload: AdminCreateRequest): Promise<AdminCreateResponse> {
		await this.prisma.admin.create({
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image ?? '' },
		})
		return null
	}

	async createWithReturningId(payload: AdminCreateRequest): Promise<string> {
		const admin = await this.prisma.admin.create({
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image ?? '' },
		})
		return admin.id
	}

	async update(payload: AdminFindOneRequest & AdminUpdateRequest): Promise<AdminUpdateRequest> {
		await this.prisma.admin.update({
			where: { id: payload.id, deletedAt: null },
			data: { fullName: payload.fullName, emailAddress: payload.emailAddress, password: payload.password, type: payload.type, image: payload.image },
		})
		return null
	}

	async delete(payload: AdminDeleteRequest): Promise<AdminDeleteResponse> {
		await this.prisma.admin.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
