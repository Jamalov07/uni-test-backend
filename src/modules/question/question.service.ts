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
	QuestionsCreateWithAnswersRequest,
	QuestionsCreateWithAnswersResponse,
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
	async findManyByTextsWithCollectionId(payload: { texts: string[]; collectionId: string }): Promise<QuestionFindFullResponse> {
		const questions = await this.repository.findByTextsWithCollectionId({ texts: payload.texts, collectionId: payload.collectionId })
		if (questions.length) {
			throw new BadRequestException(`This ${questions.map((q) => q.text).join(' ')} questions already exists in ${questions[0].collection.name}`)
		}
		return questions
	}

	async create(payload: QuestionCreateRequest): Promise<QuestionCreateResponse> {
		await this.findOneByTextWithCollectionId({ text: payload.text, collectionId: payload.collectionId })
		return this.repository.create(payload)
	}

	async createManyWithAnswers(payload: Pick<QuestionsCreateWithAnswersRequest, 'collectionId'>, text: string): Promise<QuestionsCreateWithAnswersResponse> {
		const qwa: QuestionsCreateWithAnswersRequest = { collectionId: payload.collectionId, questions: [] }
		const questions = text
			.split('S:')
			.map((q) => q.trim())
			.filter((q) => q.toString())

		questions.forEach((q) => {
			const questionWithAnswers = q
				.split('J:')
				.map((w) => w.trim())
				.filter((w) => w.toString())

			// console.log(questionWithAnswers, questionWithAnswers.length - 1, this.countOccurrences(q, 'J:'))
			if (questionWithAnswers.length - 1 !== this.countOccurrences(q, 'J:')) {
				throw new BadRequestException('Error with this question ' + q)
			} else {
				qwa.questions.push({
					text: questionWithAnswers[0],
					answers: questionWithAnswers
						.map((q, i): any => {
							const isCorrect = q[q.length - 1] === '+' ? true : false
							if (i !== 0) {
								return { isCorrect: isCorrect, text: isCorrect ? q.slice(0, q.length - 1) : q }
							}
						})
						.slice(1),
				})
			}
		})

		await this.findManyByTextsWithCollectionId({ collectionId: payload.collectionId, texts: qwa.questions.map((q) => q.text) })

		await this.repository.createWithAnswers({ ...qwa })

		return null
	}

	countOccurrences(mainStr: string, subStr: string): number {
		let count = 0
		let pos = mainStr.indexOf(subStr)

		while (pos !== -1) {
			count++
			pos = mainStr.indexOf(subStr, pos + 1)
		}

		return count
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
