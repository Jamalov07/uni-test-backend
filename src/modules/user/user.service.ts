import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from './user.repository'
import {
	UserCreateRequest,
	UserCreateResponse,
	UserCreateWithInfoRequest,
	UserCreateWithJsonFileRequest,
	UserDeleteRequest,
	UserDeleteResponse,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindFullResponse,
	UserFindOneRequest,
	UserFindOneResponse,
	UserSignInRequest,
	UserSignInResponse,
	UserUpdateRequest,
	UserUpdateResponse,
	UserUpdateWithInfoRequest,
} from './interfaces'
import { UserInfoService } from '../user-info'
import { JWTService } from '../jwt'

@Injectable()
export class UserService {
	private readonly repository: UserRepository
	private readonly jwtService: JWTService
	private readonly userInfoService: UserInfoService
	constructor(repository: UserRepository, userInfoService: UserInfoService, jwtService: JWTService) {
		this.repository = repository
		this.jwtService = jwtService
		this.userInfoService = userInfoService
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

	async findByEmail(payload: Partial<UserFindOneResponse>): Promise<UserFindOneResponse> {
		const user = await this.repository.findByEmail({ emailAddress: payload.emailAddress, id: payload.id })
		return user
	}

	async singIn(payload: UserSignInRequest): Promise<UserSignInResponse> {
		const userInfo = await this.userInfoService.findOneByHemisId({ hemisId: payload.hemisId })

		const user = await this.repository.findOneWithPassword({ id: userInfo?.user.id })

		const isCorrect = await bcrypt.compare(payload.password, user.password)
		if (!isCorrect) {
			throw new UnauthorizedException('User1 not found')
		}

		const tokens = await this.jwtService.getTokens({ id: user.id })

		return { user: user, tokens: tokens }
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		const password = await bcrypt.hash(payload.password, 7)
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress }) : null
		return this.repository.create({ ...payload, password })
	}

	async createWithUserInfo(payload: UserCreateWithInfoRequest): Promise<UserCreateResponse> {
		const password = await bcrypt.hash(payload.password, 7)
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress }) : null
		const userId = await this.repository.createWithReturningId({ ...payload, password: password })
		await this.userInfoService.create({ groupId: payload.groupId, hemisId: payload.hemisId, userId: userId }).catch(async (e) => {
			console.log(e)
			await this.repository.hardDelete({ id: userId })
			throw new BadRequestException(e)
		})

		return null
	}

	async createManyWithJsonFile(payload: UserCreateWithJsonFileRequest[]): Promise<null> {
		const mappedPayload = payload.map((p) => {
			return {
				full_name: p.full_name,
				faculty: p.faculty,
				course: Number(p.course),
				group: p.group,
				image: p.image,
				hemis_id: p.hemis_id,
				password: p.password,
				semestr: Number(p.semestr),
			}
		})
		return this.repository.createWithJsonFile(mappedPayload)
	}

	async updateWithUserInfo(params: UserFindOneRequest, payload: UserUpdateWithInfoRequest): Promise<UserUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress, id: params.id }) : null
		const password = payload.password ? await bcrypt.hash(payload.password, 7) : undefined
		await this.repository.update({ ...params, ...payload, password })
		const userInfo = await this.userInfoService.findOneByUserId({ userId: params.id })
		await this.userInfoService.update({ id: userInfo.id }, { groupId: payload.groupId, hemisId: payload.hemisId })
		return null
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
