import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
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
} from './interfaces'

@Injectable()
export class AnswerRepository {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findFull(payload: AnswerFindFullRequest): Promise<AnswerFindFullResponse> {
		const answers = await this.prisma.answer.findMany({
			where: { text: { contains: payload.text, mode: 'insensitive' }, deletedAt: null },
			select: {
				id: true,
				text: true,
				createdAt: true,
				isCorrect: true,
				question: { select: { id: true, createdAt: true, text: true } },
			},
		})

		return answers
	}

	async findAll(payload: AnswerFindAllRequest): Promise<AnswerFindAllResponse> {
		const answers = await this.prisma.answer.findMany({
			skip: (payload.pageNumber - 1) * payload.pageSize,
			take: payload.pageSize,
			where: { text: { contains: payload.text, mode: 'insensitive' }, deletedAt: null },
			select: {
				id: true,
				text: true,
				createdAt: true,
				isCorrect: true,
				question: { select: { id: true, createdAt: true, text: true } },
			},
		})

		const answersCount = await this.prisma.answer.count({})

		return {
			pageSize: answers.length,
			totalCount: answersCount,
			pageCount: Math.ceil(answersCount / payload.pageSize),
			data: answers,
		}
	}

	async findOne(payload: AnswerFindOneRequest): Promise<AnswerFindOneResponse> {
		const answer = await this.prisma.answer.findFirst({
			where: { id: payload.id, deletedAt: null },
			select: {
				id: true,
				text: true,
				createdAt: true,
				isCorrect: true,
				question: { select: { id: true, createdAt: true, text: true } },
			},
		})

		return answer
	}

	async findByTextWithQuestionId(payload: Partial<AnswerCreateRequest>): Promise<AnswerFindOneResponse> {
		const answer = await this.prisma.answer.findFirst({
			where: { text: payload.text, questionId: payload.questionId, deletedAt: null },
			select: {
				id: true,
				text: true,
				createdAt: true,
				isCorrect: true,
				question: { select: { id: true, createdAt: true, text: true } },
			},
		})
		return answer
	}

	async create(payload: AnswerCreateRequest): Promise<AnswerCreateResponse> {
		await this.prisma.answer.create({ data: { text: payload.text, questionId: payload.questionId, isCorrect: payload.isCorrect } })
		return null
	}

	async update(payload: AnswerFindOneRequest & AnswerUpdateRequest): Promise<AnswerUpdateRequest> {
		await this.prisma.answer.update({ where: { id: payload.id, deletedAt: null }, data: { text: payload.text, questionId: payload.questionId, isCorrect: payload.isCorrect } })
		return null
	}

	async delete(payload: AnswerDeleteRequest): Promise<AnswerDeleteResponse> {
		await this.prisma.answer.update({ where: { id: payload.id, deletedAt: null }, data: { deletedAt: new Date() } })
		return null
	}
}
