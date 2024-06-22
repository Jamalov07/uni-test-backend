import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import {
	CourseCreateRequest,
	CourseCreateResponse,
	CourseDeleteRequest,
	CourseDeleteResponse,
	CourseFindAllRequest,
	CourseFindAllResponse,
	CourseFindFullRequest,
	CourseFindFullResponse,
	CourseFindOneRequest,
	CourseFindOneResponse,
	CourseUpdateRequest,
} from './interfaces'

@Injectable()
export class CourseRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async findFull(payload: CourseFindFullRequest): Promise<CourseFindFullResponse> {
		const courses = await this.prisma.course.findMany({
			where: { deletedAt: null },
			select: { id: true, stage: true, createdAt: true },
		})

		return courses
	}

	async findAll(payload: CourseFindAllRequest): Promise<CourseFindAllResponse> {
		const courses = await this.prisma.course.findMany({
			where: { deletedAt: null },
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			select: { id: true, stage: true, createdAt: true },
		})

		const coursesCount = await this.prisma.course.count({})

		return {
			pageSize: courses.length,
			totalCount: coursesCount,
			pageCount: Math.ceil(coursesCount / payload.pageSize),
			data: courses,
		}
	}

	async findOne(payload: CourseFindOneRequest): Promise<CourseFindOneResponse> {
		const course = await this.prisma.course.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: { id: true, stage: true, createdAt: true },
		})

		return course
	}

	async findByStage(payload: Partial<CourseFindOneResponse>): Promise<CourseFindOneResponse> {
		const course = await this.prisma.course.findFirst({
			where: {
				stage: payload.stage,
				deletedAt: null,
				id: { not: payload.id },
			},
		})
		return course
	}

	async create(payload: CourseCreateRequest): Promise<CourseCreateResponse> {
		await this.prisma.course.create({ data: { stage: payload.stage } })
		return null
	}

	async update(payload: CourseFindOneRequest & CourseUpdateRequest): Promise<CourseUpdateRequest> {
		await this.prisma.course.update({ where: { id: payload.id, deletedAt: null }, data: { stage: payload.stage } })
		return null
	}

	async delete(payload: CourseDeleteRequest): Promise<CourseDeleteResponse> {
		await this.prisma.course.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
