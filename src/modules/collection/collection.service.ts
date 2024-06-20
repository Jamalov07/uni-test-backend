import { BadRequestException, Injectable } from '@nestjs/common'
import { CollectionRepository } from './collection.repository'
import {
	CollectionCreateRequest,
	CollectionCreateResponse,
	CollectionDeleteRequest,
	CollectionDeleteResponse,
	CollectionFindAllRequest,
	CollectionFindAllResponse,
	CollectionFindFullRequest,
	CollectionFindFullResponse,
	CollectionFindOneRequest,
	CollectionFindOneResponse,
	CollectionUpdateRequest,
	CollectionUpdateResponse,
} from './interfaces'

@Injectable()
export class CollectionService {
	private readonly repository: CollectionRepository
	constructor(repository: CollectionRepository) {
		this.repository = repository
	}

	async findFull(payload: CollectionFindFullRequest): Promise<CollectionFindFullResponse> {
		const collections = this.repository.findFull(payload)
		return collections
	}

	async findAll(payload: CollectionFindAllRequest): Promise<CollectionFindAllResponse> {
		const collections = this.repository.findAll(payload)
		return collections
	}

	async findOne(payload: CollectionFindOneRequest): Promise<CollectionFindOneResponse> {
		const collection = await this.repository.findOne(payload)
		if (!collection) {
			throw new BadRequestException('Collection not found')
		}
		return collection
	}

	async findOneByName(payload: Partial<CollectionFindOneResponse>): Promise<CollectionFindOneResponse> {
		const collection = await this.repository.findByName({ name: payload.name })
		if (collection) {
			throw new BadRequestException('Collection already exists')
		}
		return collection
	}

	async create(payload: CollectionCreateRequest): Promise<CollectionCreateResponse> {
		await this.findOneByName({ name: payload.name })
		return this.repository.create(payload)
	}

	async update(params: CollectionFindOneRequest, payload: CollectionUpdateRequest): Promise<CollectionUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.name ? await this.findOneByName({ name: payload.name }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: CollectionDeleteRequest): Promise<CollectionDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
