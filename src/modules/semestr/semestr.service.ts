import { BadRequestException, Injectable } from '@nestjs/common'
import { SemestrRepository } from './semestr.repository'
import {
	SemestrCreateRequest,
	SemestrCreateResponse,
	SemestrDeleteRequest,
	SemestrDeleteResponse,
	SemestrFindAllRequest,
	SemestrFindAllResponse,
	SemestrFindFullRequest,
	SemestrFindFullResponse,
	SemestrFindOneRequest,
	SemestrFindOneResponse,
	SemestrUpdateRequest,
	SemestrUpdateResponse,
} from './interfaces'

@Injectable()
export class SemestrService {
	private readonly repository: SemestrRepository
	constructor(repository: SemestrRepository) {
		this.repository = repository
	}

	async findFull(payload: SemestrFindFullRequest): Promise<SemestrFindFullResponse> {
		const semestrs = this.repository.findFull(payload)
		return semestrs
	}

	async findAll(payload: SemestrFindAllRequest): Promise<SemestrFindAllResponse> {
		const semestrs = this.repository.findAll(payload)
		return semestrs
	}

	async findOne(payload: SemestrFindOneRequest): Promise<SemestrFindOneResponse> {
		const semestr = await this.repository.findOne(payload)
		if (!semestr) {
			throw new BadRequestException('Semestr not found')
		}
		return semestr
	}

	async findOneByStage(payload: Partial<SemestrFindOneResponse>): Promise<SemestrFindOneResponse> {
		const semestr = await this.repository.findByStage({ stage: payload.stage, id: payload.id })
		if (semestr) {
			throw new BadRequestException('Semestr already exists')
		}
		return semestr
	}

	async create(payload: SemestrCreateRequest): Promise<SemestrCreateResponse> {
		await this.findOneByStage({ stage: payload.stage })
		return this.repository.create(payload)
	}

	async update(params: SemestrFindOneRequest, payload: SemestrUpdateRequest): Promise<SemestrUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.stage ? await this.findOneByStage({ stage: payload.stage, id: params.id }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: SemestrDeleteRequest): Promise<SemestrDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
