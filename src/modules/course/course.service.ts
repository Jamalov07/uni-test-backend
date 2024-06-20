import { BadRequestException, Injectable } from '@nestjs/common'
import { CourseRepository } from './course.repository'
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
	CourseUpdateResponse,
} from './interfaces'

@Injectable()
export class CourseService {
	private readonly repository: CourseRepository
	constructor(repository: CourseRepository) {
		this.repository = repository
	}

	async findFull(payload: CourseFindFullRequest): Promise<CourseFindFullResponse> {
		const courses = this.repository.findFull(payload)
		return courses
	}

	async findAll(payload: CourseFindAllRequest): Promise<CourseFindAllResponse> {
		const courses = this.repository.findAll(payload)
		return courses
	}

	async findOne(payload: CourseFindOneRequest): Promise<CourseFindOneResponse> {
		const course = await this.repository.findOne(payload)
		if (!course) {
			throw new BadRequestException('Course not found')
		}
		return course
	}

	async findOneByStage(payload: Partial<CourseFindOneResponse>): Promise<CourseFindOneResponse> {
		const course = await this.repository.findByStage({ stage: payload.stage, id: payload.id })
		if (course) {
			throw new BadRequestException('Course already exists')
		}
		return course
	}

	async create(payload: CourseCreateRequest): Promise<CourseCreateResponse> {
		await this.findOneByStage({ stage: payload.stage })
		return this.repository.create(payload)
	}

	async update(params: CourseFindOneRequest, payload: CourseUpdateRequest): Promise<CourseUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.stage ? await this.findOneByStage({ stage: payload.stage, id: params.id }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: CourseDeleteRequest): Promise<CourseDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
