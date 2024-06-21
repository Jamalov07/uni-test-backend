import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
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
	QuestionsCreateWithAnswersRequest,
	QuestionsCreateWithAnswersResponse,
} from './interfaces'

@Injectable()
export class QuestionRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: QuestionFindFullRequest): Promise<QuestionFindFullResponse> {
		const questions = await this.prisma.question.findMany({
			where: { text: { contains: payload.text, mode: 'insensitive' } },
			select: {
				id: true,
				text: true,
				createdAt: true,
				collection: { select: { id: true, createdAt: true, language: true, givenMinutes: true, maxAttempts: true, name: true, amountInTest: true } },
			},
		})

		return questions
	}

	async findAll(payload: QuestionFindAllRequest): Promise<QuestionFindAllResponse> {
		const questions = await this.prisma.question.findMany({
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			where: { text: { contains: payload.text, mode: 'insensitive' } },
			select: {
				id: true,
				text: true,
				createdAt: true,
				collection: { select: { id: true, createdAt: true, language: true, givenMinutes: true, maxAttempts: true, name: true, amountInTest: true } },
			},
		})

		const questionsCount = await this.prisma.question.count({})

		return {
			pageSize: questions.length,
			totalCount: questionsCount,
			pageCount: Math.ceil(questionsCount / payload.pageSize),
			data: questions,
		}
	}

	async findOne(payload: QuestionFindOneRequest): Promise<QuestionFindOneResponse> {
		const question = await this.prisma.question.findFirst({
			where: { id: payload.id },
			select: {
				id: true,
				text: true,
				createdAt: true,
				collection: { select: { id: true, createdAt: true, language: true, givenMinutes: true, maxAttempts: true, name: true, amountInTest: true } },
			},
		})

		return question
	}

	async findByTextWithCollectionId(payload: Partial<QuestionCreateRequest>): Promise<QuestionFindOneResponse> {
		const question = await this.prisma.question.findFirst({
			where: { text: payload.text, collectionId: payload.collectionId },
			select: {
				id: true,
				text: true,
				createdAt: true,
				collection: { select: { id: true, createdAt: true, language: true, givenMinutes: true, maxAttempts: true, name: true, amountInTest: true } },
			},
		})
		return question
	}

	async findByTextsWithCollectionId(payload: { texts: string[]; collectionId: string }): Promise<QuestionFindFullResponse> {
		const questions = await this.prisma.question.findMany({
			where: { text: { in: payload.texts }, collectionId: payload.collectionId },
			select: {
				id: true,
				text: true,
				createdAt: true,
				collection: { select: { id: true, createdAt: true, language: true, givenMinutes: true, maxAttempts: true, name: true, amountInTest: true } },
			},
		})
		return questions
	}

	async create(payload: QuestionCreateRequest): Promise<QuestionCreateResponse> {
		await this.prisma.question.create({ data: { text: payload.text, collectionId: payload.collectionId } })
		return null
	}

	async createWithAnswers(payload: QuestionsCreateWithAnswersRequest): Promise<QuestionsCreateWithAnswersResponse> {
		// await this.prisma.question.createMany({
		// 	data: payload.questions.map((q) => {
		// 		return {
		// 			collectionId: payload.collectionId,
		// 			text: q.text,
		// 			answers: {
		// 				create: q.answers.map((a) => ({ text: a.text, isCorrect: a.isCorrect })),
		// 			},
		// 		}
		// 	}),
		// })

		payload.questions.map(async (q) => {
			await this.prisma.question.create({
				data: {
					collectionId: payload.collectionId,
					text: q.text,
					answers: {
						createMany: { data: q.answers.map((a) => ({ text: a.text, isCorrect: a.isCorrect })) },
					},
				},
			})
		})

		return null
	}

	async update(payload: QuestionFindOneRequest & QuestionUpdateRequest): Promise<QuestionUpdateRequest> {
		await this.prisma.question.update({ where: { id: payload.id }, data: { text: payload.text, collectionId: payload.collectionId } })
		return null
	}

	async delete(payload: QuestionDeleteRequest): Promise<QuestionDeleteResponse> {
		await this.prisma.question.update({ where: { id: payload.id }, data: { deletedAt: new Date() } })
		return null
	}
}
