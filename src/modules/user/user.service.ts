import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from './user.repository'
import {
	SignInTokenDefinition,
	UserCreateRequest,
	UserCreateResponse,
	UserCreateWithInfoRequest,
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
} from './interfaces'
import { UserInfoService } from '../user-info'
import { JwtService } from '@nestjs/jwt'
import { JwtConfig } from '../../configs'

@Injectable()
export class UserService {
	private readonly repository: UserRepository
	private readonly jwtService: JwtService
	private readonly userInfoService: UserInfoService
	constructor(repository: UserRepository, userInfoService: UserInfoService, jwtService: JwtService) {
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

	async singIn(payload: UserSignInRequest): Promise<UserSignInResponse> {
		const userInfo = await this.userInfoService.findOneByHemisId({ hemisId: payload.hemisId })
		const user = await this.repository.findOneWithPassword({ id: userInfo.user.id })

		const isCorrect = await bcrypt.compare(payload.password, user.password)
		if (!isCorrect) {
			throw new UnauthorizedException('User not found')
		}

		const tokens = await this.getTokens({ id: user.id })

		return { user: user, userInfo: userInfo, tokens: tokens }
	}

	async create(payload: UserCreateRequest): Promise<UserCreateResponse> {
		const password = await bcrypt.hash(payload.password, 7)
		await this.findOneByEmail({ emailAddress: payload.emailAddress })
		return this.repository.create({ ...payload, password })
	}

	async createWithUserInfo(payload: UserCreateWithInfoRequest): Promise<UserCreateResponse> {
		const userId = await this.repository.createWithReturningId(payload)
		payload.userInfo ? await this.userInfoService.create({ ...payload.userInfo, userId: userId }) : null

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

	async getTokens(payload: Partial<UserFindOneResponse>): Promise<SignInTokenDefinition> {
		console.log(JwtConfig)
		const [access, refresh] = await Promise.all([
			this.jwtService.signAsync(payload, {
				secret: JwtConfig.accessToken.key,
				expiresIn: JwtConfig.accessToken.time,
			}),
			this.jwtService.signAsync(payload, {
				secret: JwtConfig.refreshToken.key,
				expiresIn: JwtConfig.refreshToken.time,
			}),
		])

		return { accessToken: access, refreshToken: refresh }
	}
}
