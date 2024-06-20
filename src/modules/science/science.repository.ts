import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	ScienceCreateRequest,
	ScienceCreateResponse,
	ScienceDeleteRequest,
	ScienceDeleteResponse,
	ScienceFindAllRequest,
	ScienceFindAllResponse,
	ScienceFindFullRequest,
	ScienceFindFullResponse,
	ScienceFindOneRequest,
	ScienceFindOneResponse,
	ScienceUpdateRequest,
} from './interfaces'

@Injectable()
export class ScienceRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async findFull(payload: ScienceFindFullRequest): Promise<ScienceFindFullResponse> {
		const sciences = await this.prisma.science.findMany({
			select: { id: true, name: true, createdAt: true },
		})

		return sciences
	}

	async findAll(payload: ScienceFindAllRequest): Promise<ScienceFindAllResponse> {
		const sciences = await this.prisma.science.findMany({
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, name: true, createdAt: true },
		})

		const sciencesCount = await this.prisma.science.count({})

		return {
			pageSize: sciences.length,
			totalCount: sciencesCount,
			pageCount: Math.ceil(sciencesCount / payload.pageSize),
			data: sciences,
		}
	}

	async findOne(payload: ScienceFindOneRequest): Promise<ScienceFindOneResponse> {
		const science = await this.prisma.science.findFirst({
			where: { id: payload.id },
			select: { id: true, name: true, createdAt: true },
		})

		return science
	}

	async findByName(payload: Partial<ScienceFindOneResponse>): Promise<ScienceFindOneResponse> {
		const science = await this.prisma.science.findFirst({ where: { name: payload.name, id: { not: payload.id } } })
		return science
	}

	async create(payload: ScienceCreateRequest): Promise<ScienceCreateResponse> {
		await this.prisma.science.create({ data: { name: payload.name } })
		return null
	}

	async update(payload: ScienceFindOneRequest & ScienceUpdateRequest): Promise<ScienceUpdateRequest> {
		await this.prisma.science.update({ where: { id: payload.id }, data: { name: payload.name } })
		return null
	}

	async delete(payload: ScienceDeleteRequest): Promise<ScienceDeleteResponse> {
		await this.prisma.science.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
