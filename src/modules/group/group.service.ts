import { BadRequestException, Injectable } from '@nestjs/common'
import { GroupRepository } from './group.repository'
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
	GroupUpdateResponse,
} from './interfaces'

@Injectable()
export class GroupService {
	private readonly repository: GroupRepository
	constructor(repository: GroupRepository) {
		this.repository = repository
	}

	async findFull(payload: GroupFindFullRequest): Promise<GroupFindFullResponse> {
		const groups = this.repository.findFull(payload)
		return groups
	}

	async findAll(payload: GroupFindAllRequest): Promise<GroupFindAllResponse> {
		const groups = this.repository.findAll(payload)
		return groups
	}

	async findOne(payload: GroupFindOneRequest): Promise<GroupFindOneResponse> {
		const group = await this.repository.findOne(payload)
		if (!group) {
			throw new BadRequestException('Group not found')
		}
		return group
	}

	async findOneByName(payload: Partial<GroupFindOneResponse>): Promise<GroupFindOneResponse> {
		const group = await this.repository.findByName({ name: payload.name, id: payload.id })
		if (group) {
			throw new BadRequestException('Group already exists')
		}
		return group
	}

	async create(payload: GroupCreateRequest): Promise<GroupCreateResponse> {
		await this.findOneByName({ name: payload.name })
		return this.repository.create(payload)
	}

	async update(params: GroupFindOneRequest, payload: GroupUpdateRequest): Promise<GroupUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.name ? await this.findOneByName({ name: payload.name, id: params.id }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: GroupDeleteRequest): Promise<GroupDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
