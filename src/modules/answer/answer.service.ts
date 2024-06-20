import { BadRequestException, Injectable } from '@nestjs/common'
import { AnswerRepository } from './answer.repository'
import {
	AnswerCreateRequest,
	AnswerCreateResponse,
	AnswerDeleteRequest,
	AnswerDeleteResponse,
	AnswerFindAllRequest,
	AnswerFindAllResponse,
	AnswerFindFullRequest,
	AnswerFindFullResponse,
	AnswerFindOneRequest,
	AnswerFindOneResponse,
	AnswerUpdateRequest,
	AnswerUpdateResponse,
} from './interfaces'

@Injectable()
export class AnswerService {
	private readonly repository: AnswerRepository
	constructor(repository: AnswerRepository) {
		this.repository = repository
	}

	async findFull(payload: AnswerFindFullRequest): Promise<AnswerFindFullResponse> {
		const answers = this.repository.findFull(payload)
		return answers
	}

	async findAll(payload: AnswerFindAllRequest): Promise<AnswerFindAllResponse> {
		const answers = this.repository.findAll(payload)
		return answers
	}

	async findOne(payload: AnswerFindOneRequest): Promise<AnswerFindOneResponse> {
		const answer = await this.repository.findOne(payload)
		if (!answer) {
			throw new BadRequestException('Answer not found')
		}
		return answer
	}

	async findOneByTextWithQuestionId(payload: Partial<AnswerCreateRequest>): Promise<AnswerFindOneResponse> {
		const answer = await this.repository.findByTextWithQuestionId({ text: payload.text, questionId: payload.questionId })
		if (answer) {
			throw new BadRequestException('Answer already exists')
		}
		return answer
	}

	async create(payload: AnswerCreateRequest): Promise<AnswerCreateResponse> {
		await this.findOneByTextWithQuestionId({ text: payload.text, questionId: payload.questionId })
		return this.repository.create(payload)
	}

	async update(params: AnswerFindOneRequest, payload: AnswerUpdateRequest): Promise<AnswerUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.text ? await this.findOneByTextWithQuestionId({ text: payload.text, questionId: payload.questionId }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: AnswerDeleteRequest): Promise<AnswerDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
