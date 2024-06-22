import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	FacultyCreateRequest,
	FacultyCreateResponse,
	FacultyDeleteRequest,
	FacultyDeleteResponse,
	FacultyFindAllRequest,
	FacultyFindAllResponse,
	FacultyFindFullRequest,
	FacultyFindFullResponse,
	FacultyFindOneRequest,
	FacultyFindOneResponse,
	FacultyUpdateRequest,
} from './interfaces'

@Injectable()
export class FacultyRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async findFull(payload: FacultyFindFullRequest): Promise<FacultyFindFullResponse> {
		const facultys = await this.prisma.faculty.findMany({
			where: { deletedAt: null },
			select: { id: true, name: true, createdAt: true },
		})

		return facultys
	}

	async findAll(payload: FacultyFindAllRequest): Promise<FacultyFindAllResponse> {
		const facultys = await this.prisma.faculty.findMany({
			where: { deletedAt: null },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, name: true, createdAt: true },
		})

		const facultysCount = await this.prisma.faculty.count({
			where: { deletedAt: null },
		})

		return {
			pageSize: facultys.length,
			totalCount: facultysCount,
			pageCount: Math.ceil(facultysCount / payload.pageSize),
			data: facultys,
		}
	}

	async findOne(payload: FacultyFindOneRequest): Promise<FacultyFindOneResponse> {
		const faculty = await this.prisma.faculty.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: { id: true, name: true, createdAt: true },
		})

		return faculty
	}

	async findByName(payload: Partial<FacultyFindOneResponse>): Promise<FacultyFindOneResponse> {
		const faculty = await this.prisma.faculty.findFirst({ where: { name: payload.name, deletedAt: null, id: { not: payload.id } } })
		return faculty
	}

	async create(payload: FacultyCreateRequest): Promise<FacultyCreateResponse> {
		await this.prisma.faculty.create({ data: { name: payload.name } })
		return null
	}

	async update(payload: FacultyFindOneRequest & FacultyUpdateRequest): Promise<FacultyUpdateRequest> {
		await this.prisma.faculty.update({ where: { id: payload.id, deletedAt: null }, data: { name: payload.name } })
		return null
	}

	async delete(payload: FacultyDeleteRequest): Promise<FacultyDeleteResponse> {
		await this.prisma.faculty.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
