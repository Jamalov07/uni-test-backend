import { BadRequestException, Injectable } from '@nestjs/common'
import { ArchiveRepository } from './archive.repository'
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
	ArchiveUpdateResponse,
} from './interfaces'
import { UserCollectionRepository } from '../user-collection'

@Injectable()
export class ArchiveService {
	private readonly repository: ArchiveRepository
	private readonly userCollectionRepository: UserCollectionRepository

	constructor(repository: ArchiveRepository, userCollectionRepository: UserCollectionRepository) {
		this.repository = repository
		this.userCollectionRepository = userCollectionRepository
	}

	async findFull(payload: ArchiveFindFullRequest): Promise<ArchiveFindFullResponse> {
		const Archives = this.repository.findFull(payload)
		return Archives
	}

	async findAll(payload: ArchiveFindAllRequest): Promise<ArchiveFindAllResponse> {
		const Archives = this.repository.findAll(payload)
		return Archives
	}

	async findOne(payload: ArchiveFindOneRequest): Promise<ArchiveFindOneResponse> {
		const Archive = await this.repository.findOne(payload)
		if (!Archive) {
			throw new BadRequestException('Archive not found')
		}
		return Archive
	}

	async create(payload: ArchiveCreateRequest): Promise<ArchiveCreateResponse> {
		const userCollection = await this.userCollectionRepository.findByUserCollection({ collectionId: payload.collectionId, userId: payload.userId })
		if (!userCollection || !userCollection.haveAttempt) {
			throw new BadRequestException("You haven't attempt for this collection")
		}
		await this.repository.create(payload)

		if (userCollection.haveAttempt === 1) {
			await this.userCollectionRepository.delete({ id: userCollection.id })
		} else {
			await this.userCollectionRepository.update({ id: userCollection.id, haveAttempt: userCollection.haveAttempt - 1 })
		}

		return null
	}

	async update(params: ArchiveFindOneRequest, payload: ArchiveUpdateRequest): Promise<ArchiveUpdateResponse> {
		await this.findOne({ id: params.id })

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: ArchiveDeleteRequest): Promise<ArchiveDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
