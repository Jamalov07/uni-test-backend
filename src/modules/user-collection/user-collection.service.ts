import { BadRequestException, Injectable } from '@nestjs/common'
import { UserCollectionRepository } from './user-collection.repository'
import {
	UserCollectionCreateRequest,
	UserCollectionCreateResponse,
	UserCollectionDeleteRequest,
	UserCollectionDeleteResponse,
	UserCollectionFindAllRequest,
	UserCollectionFindAllResponse,
	UserCollectionFindFullRequest,
	UserCollectionFindFullResponse,
	UserCollectionFindOneRequest,
	UserCollectionFindOneResponse,
	UserCollectionUpdateRequest,
	UserCollectionUpdateResponse,
} from './interfaces'

@Injectable()
export class UserCollectionService {
	private readonly repository: UserCollectionRepository
	constructor(repository: UserCollectionRepository) {
		this.repository = repository
	}

	async findFull(payload: UserCollectionFindFullRequest): Promise<UserCollectionFindFullResponse> {
		const userCollections = this.repository.findFull(payload)
		return userCollections
	}

	async findAll(payload: UserCollectionFindAllRequest): Promise<UserCollectionFindAllResponse> {
		const userCollections = this.repository.findAll(payload)
		return userCollections
	}

	async findOne(payload: UserCollectionFindOneRequest): Promise<UserCollectionFindOneResponse> {
		const userCollection = await this.repository.findOne(payload)
		if (!userCollection) {
			throw new BadRequestException('UserCollection not found')
		}
		return userCollection
	}

	async findOneByUserCollection(payload: Partial<UserCollectionCreateRequest>): Promise<UserCollectionFindOneResponse> {
		const userCollection = await this.repository.findByUserCollection({ userId: payload.userId, collectionId: payload.collectionId })
		if (userCollection) {
			throw new BadRequestException('UserCollection already exists')
		}
		return userCollection
	}

	async create(payload: UserCollectionCreateRequest): Promise<UserCollectionCreateResponse> {
		await this.findOneByUserCollection({ userId: payload.userId, collectionId: payload.collectionId })
		return this.repository.create(payload)
	}

	async update(params: UserCollectionFindOneRequest, payload: UserCollectionUpdateRequest): Promise<UserCollectionUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.collectionId || payload.userId ? await this.findOneByUserCollection({ userId: payload.userId, collectionId: payload.collectionId }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: UserCollectionDeleteRequest): Promise<UserCollectionDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
