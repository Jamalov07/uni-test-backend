import { BadRequestException, Injectable } from '@nestjs/common'
import { QuestionRepository } from './question.repository'
import {
	QuestionCreateRequest,
	QuestionCreateResponse,
	QuestionDeleteRequest,
	QuestionDeleteResponse,
	QuestionFindAllRequest,
	QuestionFindAllResponse,
	QuestionFindFullRequest,
	QuestionFindFullResponse,
	QuestionFindOneRequest,
	QuestionFindOneResponse,
	QuestionUpdateRequest,
	QuestionUpdateResponse,
} from './interfaces'

@Injectable()
export class QuestionService {
	private readonly repository: QuestionRepository
	constructor(repository: QuestionRepository) {
		this.repository = repository
	}

	async findFull(payload: QuestionFindFullRequest): Promise<QuestionFindFullResponse> {
		const questions = this.repository.findFull(payload)
		return questions
	}

	async findAll(payload: QuestionFindAllRequest): Promise<QuestionFindAllResponse> {
		const questions = this.repository.findAll(payload)
		return questions
	}

	async findOne(payload: QuestionFindOneRequest): Promise<QuestionFindOneResponse> {
		const question = await this.repository.findOne(payload)
		if (!question) {
			throw new BadRequestException('Question not found')
		}
		return question
	}

	async findOneByTextWithCollectionId(payload: Partial<QuestionCreateRequest>): Promise<QuestionFindOneResponse> {
		const question = await this.repository.findByTextWithCollectionId({ text: payload.text, collectionId: payload.collectionId })
		if (question) {
			throw new BadRequestException('Question already exists')
		}
		return question
	}

	async create(payload: QuestionCreateRequest): Promise<QuestionCreateResponse> {
		await this.findOneByTextWithCollectionId({ text: payload.text, collectionId: payload.collectionId })
		return this.repository.create(payload)
	}

	async update(params: QuestionFindOneRequest, payload: QuestionUpdateRequest): Promise<QuestionUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.text ? await this.findOneByTextWithCollectionId({ text: payload.text, collectionId: payload.collectionId }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: QuestionDeleteRequest): Promise<QuestionDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
