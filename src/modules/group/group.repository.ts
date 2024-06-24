import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	GroupCreateRequest,
	GroupCreateResponse,
	GroupDeleteRequest,
	GroupDeleteResponse,
	GroupFindAllRequest,
	GroupFindAllResponse,
	GroupFindFullRequest,
	GroupFindFullResponse,
	GroupFindOneRequest,
	GroupFindOneResponse,
	GroupUpdateRequest,
} from './interfaces'

@Injectable()
export class GroupRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: GroupFindFullRequest): Promise<GroupFindFullResponse> {
		const groups = await this.prisma.group.findMany({
			where: { courseId: payload.courseId, facultyId: payload.facultyId, deletedAt: null },
			select: {
				id: true,
				course: { select: { id: true, stage: true, createdAt: true } },
				semestr: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				name: true,
				createdAt: true,
			},
		})

		return groups
	}

	async findAll(payload: GroupFindAllRequest): Promise<GroupFindAllResponse> {
		const groups = await this.prisma.group.findMany({
			where: { courseId: payload.courseId, facultyId: payload.facultyId, deletedAt: null },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: {
				id: true,
				semestr: { select: { id: true, stage: true, createdAt: true } },
				course: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				name: true,
				createdAt: true,
			},
		})

		const groupsCount = await this.prisma.group.count({
			where: { courseId: payload.courseId, facultyId: payload.facultyId, deletedAt: null },
		})

		return {
			pageSize: groups.length,
			totalCount: groupsCount,
			pageCount: Math.ceil(groupsCount / payload.pageSize),
			data: groups,
		}
	}

	async findOne(payload: GroupFindOneRequest): Promise<GroupFindOneResponse> {
		const group = await this.prisma.group.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				course: { select: { id: true, stage: true, createdAt: true } },
				semestr: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				name: true,
				createdAt: true,
			},
		})

		return group
	}

	async findByName(payload: Partial<GroupFindOneResponse>): Promise<GroupFindOneResponse> {
		const group = await this.prisma.group.findFirst({
			where: { name: payload.name, id: { not: payload.id }, deletedAt: null },
			select: {
				id: true,
				course: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				name: true,
				createdAt: true,
			},
		})
		return group
	}

	async create(payload: GroupCreateRequest): Promise<GroupCreateResponse> {
		await this.prisma.group.create({ data: { name: payload.name, courseId: payload.courseId, facultyId: payload.facultyId, semestrId: payload.semestrId } })
		return null
	}

	async update(payload: GroupFindOneRequest & GroupUpdateRequest): Promise<GroupUpdateRequest> {
		await this.prisma.group.update({
			where: { id: payload.id, deletedAt: null },
			data: { name: payload.name, courseId: payload.courseId, facultyId: payload.facultyId, semestrId: payload.semestrId },
		})
		return null
	}

	async delete(payload: GroupDeleteRequest): Promise<GroupDeleteResponse> {
		await this.prisma.group.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
