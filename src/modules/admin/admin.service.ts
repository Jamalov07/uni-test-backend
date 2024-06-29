import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { AdminRepository } from './admin.repository'
import {
	AdminCreateRequest,
	AdminCreateResponse,
	AdminDeleteRequest,
	AdminDeleteResponse,
	AdminFindAllRequest,
	AdminFindAllResponse,
	AdminFindFullRequest,
	AdminFindFullResponse,
	AdminFindOneRequest,
	AdminFindOneResponse,
	AdminSignInRequest,
	AdminSignInResponse,
	AdminUpdateRequest,
	AdminUpdateResponse,
} from './interfaces'
import { JWTService } from '../jwt'

@Injectable()
export class AdminService {
	private readonly repository: AdminRepository
	private readonly jwtService: JWTService
	constructor(repository: AdminRepository, jwtService: JWTService) {
		this.repository = repository
		this.jwtService = jwtService
	}

	async findFull(payload: AdminFindFullRequest): Promise<AdminFindFullResponse> {
		const admins = this.repository.findFull(payload)
		return admins
	}

	async findAll(payload: AdminFindAllRequest): Promise<AdminFindAllResponse> {
		const admins = this.repository.findAll(payload)
		return admins
	}

	async findOne(payload: AdminFindOneRequest): Promise<AdminFindOneResponse> {
		const admin = await this.repository.findOne(payload)
		if (!admin) {
			throw new BadRequestException('Admin not found')
		}
		return admin
	}

	async findOneByEmail(payload: Partial<AdminFindOneResponse>): Promise<AdminFindOneResponse> {
		const admin = await this.repository.findByEmail({ emailAddress: payload.emailAddress, id: payload.id })
		if (admin) {
			throw new BadRequestException('Admin already exists')
		}
		return admin
	}

	async findByEmail(payload: Partial<AdminFindOneResponse>): Promise<AdminFindOneResponse> {
		const admin = await this.repository.findByEmail({ emailAddress: payload.emailAddress, id: payload.id })
		return admin
	}

	async singIn(payload: AdminSignInRequest): Promise<AdminSignInResponse> {
		const admin = await this.findByEmail({ emailAddress: payload.hemisId })
		if (!admin) {
			throw new UnauthorizedException('User not found')
		}
		const isCorrect = await bcrypt.compare(payload.password, admin.password)
		if (!isCorrect) {
			throw new UnauthorizedException('User not found')
		}
		const tokens = await this.jwtService.getTokens({ id: admin.id })
		return { admin: admin, tokens: tokens }
	}

	async create(payload: AdminCreateRequest): Promise<AdminCreateResponse> {
		const password = await bcrypt.hash(payload.password, 7)
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress }) : null
		return this.repository.create({ ...payload, password })
	}

	async update(params: AdminFindOneRequest, payload: AdminUpdateRequest): Promise<AdminUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.emailAddress ? await this.findOneByEmail({ emailAddress: payload.emailAddress, id: params.id }) : null
		const password = payload.password ? await bcrypt.hash(payload.password, 7) : undefined
		await this.repository.update({ ...params, ...payload, password })
		return null
	}

	async delete(payload: AdminDeleteRequest): Promise<AdminDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
