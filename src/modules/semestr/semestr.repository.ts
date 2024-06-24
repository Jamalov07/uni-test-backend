import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	SemestrCreateRequest,
	SemestrCreateResponse,
	SemestrDeleteRequest,
	SemestrDeleteResponse,
	SemestrFindAllRequest,
	SemestrFindAllResponse,
	SemestrFindFullRequest,
	SemestrFindFullResponse,
	SemestrFindOneRequest,
	SemestrFindOneResponse,
	SemestrUpdateRequest,
} from './interfaces'

@Injectable()
export class SemestrRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async findFull(payload: SemestrFindFullRequest): Promise<SemestrFindFullResponse> {
		const semestrs = await this.prisma.semestr.findMany({
			where: { deletedAt: null },
			select: { id: true, stage: true, createdAt: true },
		})

		return semestrs
	}

	async findAll(payload: SemestrFindAllRequest): Promise<SemestrFindAllResponse> {
		const semestrs = await this.prisma.semestr.findMany({
			where: { deletedAt: null },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, stage: true, createdAt: true },
		})

		const semestrsCount = await this.prisma.semestr.count({})

		return {
			pageSize: semestrs.length,
			totalCount: semestrsCount,
			pageCount: Math.ceil(semestrsCount / payload.pageSize),
			data: semestrs,
		}
	}

	async findOne(payload: SemestrFindOneRequest): Promise<SemestrFindOneResponse> {
		const semestr = await this.prisma.semestr.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: { id: true, stage: true, createdAt: true },
		})

		return semestr
	}

	async findByStage(payload: Partial<SemestrFindOneResponse>): Promise<SemestrFindOneResponse> {
		const semestr = await this.prisma.semestr.findFirst({
			where: {
				stage: payload.stage,
				deletedAt: null,
				id: { not: payload.id },
			},
		})
		return semestr
	}

	async create(payload: SemestrCreateRequest): Promise<SemestrCreateResponse> {
		await this.prisma.semestr.create({ data: { stage: payload.stage } })
		return null
	}

	async update(payload: SemestrFindOneRequest & SemestrUpdateRequest): Promise<SemestrUpdateRequest> {
		await this.prisma.semestr.update({ where: { id: payload.id, deletedAt: null }, data: { stage: payload.stage } })
		return null
	}

	async delete(payload: SemestrDeleteRequest): Promise<SemestrDeleteResponse> {
		await this.prisma.semestr.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
