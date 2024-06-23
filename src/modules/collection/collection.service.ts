import { BadRequestException, Injectable } from '@nestjs/common'
import { CollectionRepository } from './collection.repository'
import {
	CollectionCreateRequest,
	CollectionCreateResponse,
	CollectionDeleteRequest,
	CollectionDeleteResponse,
	CollectionFindAllRequest,
	CollectionFindAllResponse,
	CollectionFindFullRequest,
	CollectionFindFullResponse,
	CollectionFindOneRequest,
	CollectionFindOneResponse,
	CollectionFindOneWithQuestionAnswers,
	CollectionUpdateRequest,
	CollectionUpdateResponse,
} from './interfaces'
import { QuestionService } from '../question'

@Injectable()
export class CollectionService {
	private readonly repository: CollectionRepository
	private readonly questionService: QuestionService
	constructor(repository: CollectionRepository, questionService: QuestionService) {
		this.repository = repository
		this.questionService = questionService
	}

	async findFull(payload: CollectionFindFullRequest): Promise<CollectionFindFullResponse> {
		const collections = this.repository.findFull(payload)
		return collections
	}

	async findAll(payload: CollectionFindAllRequest): Promise<CollectionFindAllResponse> {
		const collections = this.repository.findAll(payload)
		return collections
	}

	async findOne(payload: CollectionFindOneRequest): Promise<CollectionFindOneResponse> {
		const collection = await this.repository.findOne(payload)
		if (!collection) {
			throw new BadRequestException('Collection not found')
		}
		return collection
	}

	async findOneWithQuestionAnswers(payload: CollectionFindOneRequest): Promise<CollectionFindOneWithQuestionAnswers> {
		const collection = await this.repository.findOneWithQuestionAnswers(payload)
		if (!collection) {
			throw new BadRequestException('Collection not found')
		}
		return collection
	}

	async findOneAndReturnTxt(payload: CollectionFindOneRequest): Promise<{ filename: string; content: string }> {
		const collection = await this.repository.findOneWithQuestionAnswers(payload)

		let content = ''
		collection.questions.forEach((q) => {
			content = content + `S: ${q.text}\n`
			q.answers.forEach((a) => {
				content = content + `J: ${a.text}${a.isCorrect ? '+' : ''}\n`
			})
			content = content + '\n'
		})

		return { filename: collection.name, content: content }
	}

	async findOneByName(payload: Partial<CollectionFindOneResponse>): Promise<CollectionFindOneResponse> {
		const collection = await this.repository.findByName({ name: payload.name })
		if (collection) {
			throw new BadRequestException('Collection already exists')
		}
		return collection
	}

	async create(payload: CollectionCreateRequest): Promise<CollectionCreateResponse> {
		await this.findOneByName({ name: payload.name })
		return this.repository.create(payload)
	}

	async createWithQuestions(payload: CollectionCreateRequest, text: string): Promise<CollectionCreateResponse> {
		await this.findOneByName({ name: payload.name })
		const collectionId = await this.repository.createWithReturningId(payload)
		await this.questionService.createManyWithAnswers({ collectionId: collectionId }, text)
		return null
	}

	async update(params: CollectionFindOneRequest, payload: CollectionUpdateRequest): Promise<CollectionUpdateResponse> {
		await this.findOne({ id: params.id })
		payload.name ? await this.findOneByName({ name: payload.name }) : null

		await this.repository.update({ ...params, ...payload })
		return null
	}

	async delete(payload: CollectionDeleteRequest): Promise<CollectionDeleteResponse> {
		await this.findOne(payload)
		await this.repository.delete(payload)
		return null
	}
}
