import { QuestionFindOneResponse } from '../../question'

export declare interface AnswerFindFullRequest {
	text?: string
	questionId?: string
}

export declare interface AnswerFindAllRequest {
	pageNumber?: number
	pageSize?: number
	text?: string
	questionId?: string
}

export declare interface AnswerFindOneRequest {
	id: string
}

export declare interface AnswerCreateRequest {
	text: string
	questionId: string
	isCorrect: boolean
}

export declare interface AnswerUpdateRequest {
	text?: string
	questionId?: string
	isCorrect?: boolean
}

export declare interface AnswerDeleteRequest {
	id: string
}

//=========================

export declare type AnswerFindFullResponse = AnswerFindOneResponse[]

export declare interface AnswerFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: AnswerFindOneResponse[]
}

export declare interface AnswerFindOneResponse {
	id: string
	text: string
	question: QuestionFindOneResponse
	isCorrect: boolean
	createdAt: Date
}

export declare type AnswerCreateResponse = null

export declare type AnswerUpdateResponse = null

export declare type AnswerDeleteResponse = null
