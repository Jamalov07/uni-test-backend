import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from './user.repository'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindFullResponse,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
	UserUpdateResponse,
} from './interfaces'

@Injectable()
export class UserService {
	private readonly repository: UserRepository
	constructor(repository: UserRepository) {
		this.repository = repository
	}

	async findFull(payload: UserFindFullRequest): Promise<UserFindFullResponse> {
		const users = this.repository.findFull(payload)
		return users
	}

	async findAll(payload: UserFindAllRequest): Promise<UserFindAllResponse> {
		const users = this.repository.findAll(payload)
		return users
	}

	async findOne(payload: UserFindOneRequest): Promise<UserFindOneResponse> {
		const user = await this.repository.findOne(payload)
		if (!user) {
			throw new BadRequestException('User not found')
		}
		return user
	}

	async findOneByEmail(payload: Partial<UserFindOneResponse>): Promise<UserFindOneResponse> {
		const user = await this.repository.findByEmail({ emailAddress: payload.emailAddress, id: payload.id })
		if (user) {
			throw new BadRequestException('User already exists')
		}
		return user
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		const password = await bcrypt.hash(payload.password, 7)
		await this.findOneByEmail({ emailAddress: payload.emailAddress })
		return this.repository.create({ ...payload, password })
	}

	async update(params: UserFindOneRequest, payload: UserUpdateRequest): Promise<UserUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress, id: params.id }) : null
		const password = payload.password ? await bcrypt.hash(payload.password, 7) : undefined
		await this.repository.update({ ...params, ...payload, password })
		return null
	}

	async delete(payload: UserDeleteRequest): Promise<UserDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
