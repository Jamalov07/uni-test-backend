import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	ArchiveCreateRequest,
	ArchiveCreateResponse,
	ArchiveDeleteRequest,
	ArchiveDeleteResponse,
	ArchiveFindAllRequest,
	ArchiveFindAllResponse,
	ArchiveFindFullRequest,
	ArchiveFindFullResponse,
	ArchiveFindOneRequest,
	ArchiveFindOneResponse,
	ArchiveUpdateRequest,
} from './interfaces'
import { UserService } from '../user'
import { CollectionService } from '../collection'
import { CollectionLanguageEnum } from '@prisma/client'

@Injectable()
export class ArchiveRepository {
	private readonly prisma: PrismaService
	private readonly userService: UserService
	private readonly collectionService: CollectionService

	constructor(prisma: PrismaService, userService: UserService, collectionService: CollectionService) {
		this.prisma = prisma
		this.userService = userService
		this.collectionService = collectionService
	}

	async findFull(payload: ArchiveFindFullRequest): Promise<ArchiveFindFullResponse> {
		const archives = await this.prisma.archive.findMany({
			where: {
				collectionId: payload.collectionId,
				courseId: payload.courseId,
				facultyId: payload.facultyId,
				userId: payload.userId,
				groupId: payload.groupId,
				deletedAt: null,
			},
			select: {
				id: true,
				collection: {
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
				},
				course: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				group: { select: { id: true, name: true, createdAt: true } },
				semestr: { select: { id: true, stage: true, createdAt: true } },
				result: true,
				testCount: true,
				user: { select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true } },
				createdAt: true,
			},
		})

		return archives
	}

	async findAll(payload: ArchiveFindAllRequest): Promise<ArchiveFindAllResponse> {
		const archives = await this.prisma.archive.findMany({
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			where: {
				collectionId: payload.collectionId,
				courseId: payload.courseId,
				facultyId: payload.facultyId,
				userId: payload.userId,
				groupId: payload.groupId,
				deletedAt: null,
			},
			select: {
				id: true,
				collection: {
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
				},
				course: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				group: { select: { id: true, name: true, createdAt: true } },
				result: true,
				testCount: true,
				semestr: { select: { id: true, stage: true, createdAt: true } },
				user: { select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true } },
				createdAt: true,
			},
		})

		const archivesCount = await this.prisma.archive.count({
			where: {
				collectionId: payload.collectionId,
				courseId: payload.courseId,
				facultyId: payload.facultyId,
				userId: payload.userId,
				groupId: payload.groupId,
				deletedAt: null,
			},
		})

		return {
			pageSize: archives.length,
			totalCount: archivesCount,
			pageCount: Math.ceil(archivesCount / payload.pageSize),
			data: archives,
		}
	}

	async findOne(payload: ArchiveFindOneRequest): Promise<ArchiveFindOneResponse> {
		const archive = await this.prisma.archive.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				collection: {
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
				},
				course: { select: { id: true, stage: true, createdAt: true } },
				semestr: { select: { id: true, stage: true, createdAt: true } },
				faculty: { select: { id: true, name: true, createdAt: true } },
				group: { select: { id: true, name: true, createdAt: true } },
				result: true,
				testCount: true,
				user: { select: { id: true, createdAt: true, fullName: true, emailAddress: true, image: true, type: true } },
				createdAt: true,
			},
		})

		return archive
	}

	async create(payload: ArchiveCreateRequest): Promise<ArchiveCreateResponse> {
		const user = await this.userService.findOne({ id: payload.userId })
		const collection = await this.collectionService.findOne({ id: payload.collectionId })
		const archive = await this.prisma.archive.create({
			data: {
				result: payload.result,
				userId: payload.userId,
				collectionId: payload.collectionId,
				testCount: collection.amountInTest,
				courseId: user.userInfo.group.course.id,
				facultyId: user.userInfo.group.faculty.id,
				groupId: user.userInfo.group.id,
				semestrId: user.userInfo?.group.semestr.id,
			},
		})

		const archiveCollection = await this.prisma.archiveCollection.create({
			data: {
				archiveId: archive.id,
				amountInTest: collection.amountInTest,
				givenMinutes: collection.givenMinutes,
				language: collection.language as CollectionLanguageEnum,
				maxAttempts: collection.maxAttempts,
				name: collection.name,
				adminId: collection.admin.id,
				scienceId: collection.science.id,
			},
		})

		payload.collection.questions.map(async (q) => {
			await this.prisma.archiveQuestion.create({
				data: {
					text: q.text,
					collectionId: archiveCollection.id,
					answers: {
						createMany: {
							data: q.answers,
						},
					},
				},
			})
		})

		return null
	}

	async update(payload: ArchiveFindOneRequest & ArchiveUpdateRequest): Promise<ArchiveUpdateRequest> {
		await this.prisma.archive.update({ where: { id: payload.id, deletedAt: null }, data: { result: payload.result } })
		return null
	}

	async delete(payload: ArchiveDeleteRequest): Promise<ArchiveDeleteResponse> {
		await this.prisma.archive.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
