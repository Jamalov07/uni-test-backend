import { BadRequestException, Injectable } from '@nestjs/common'
import { FacultyRepository } from './faculty.repository'
import {
	FacultyCreateRequest,
	FacultyCreateResponse,
	FacultyDeleteRequest,
	FacultyDeleteResponse,
	FacultyFindAllRequest,
	FacultyFindAllResponse,
	FacultyFindFullForSetCollection,
	FacultyFindFullRequest,
	FacultyFindFullResponse,
	FacultyFindOneRequest,
	FacultyFindOneResponse,
	FacultyUpdateRequest,
	FacultyUpdateResponse,
} from './interfaces'

@Injectable()
export class FacultyService {
	private readonly repository: FacultyRepository
	constructor(repository: FacultyRepository) {
		this.repository = repository
	}

	async findFull(payload: FacultyFindFullRequest): Promise<FacultyFindFullResponse> {
		const facultys = this.repository.findFull(payload)
		return facultys
	}

	async findAll(payload: FacultyFindAllRequest): Promise<FacultyFindAllResponse> {
		const facultys = this.repository.findAll(payload)
		return facultys
	}

	async findOne(payload: FacultyFindOneRequest): Promise<FacultyFindOneResponse> {
		const faculty = await this.repository.findOne(payload)
		if (!faculty) {
			throw new BadRequestException('Faculty not found')
		}
		return faculty
	}

	async findOneByName(payload: Partial<FacultyFindOneResponse>): Promise<FacultyFindOneResponse> {
		const faculty = await this.repository.findByName({ name: payload.name, id: payload.id })
		if (faculty) {
			throw new BadRequestException('Faculty already exists')
		}
		return faculty
	}

	async create(payload: FacultyCreateRequest): Promise<FacultyCreateResponse> {
		await this.findOneByName({ name: payload.name })
		return this.repository.create(payload)
	}

	async update(params: FacultyFindOneRequest, payload: FacultyUpdateRequest): Promise<FacultyUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.name ? await this.findOneByName({ name: payload.name, id: params.id }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: FacultyDeleteRequest): Promise<FacultyDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}

	async findAllForSetCollection(): Promise<FacultyFindFullForSetCollection[]> {
		return this.repository.getAllForSetCollections()
	}
}
