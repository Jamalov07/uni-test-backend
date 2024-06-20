import { CollectionFindOneResponse } from '../../collection'

export declare interface QuestionFindFullRequest {
	text?: string
	collectionId?: string
}

export declare interface QuestionFindAllRequest {
	pageNumber?: number
	pageSize?: number
	text?: string
	collectionId?: string
}

export declare interface QuestionFindOneRequest {
	id: string
}

export declare interface QuestionCreateRequest {
	text: string
	collectionId: string
}

export declare interface QuestionUpdateRequest {
	text?: string
	collectionId?: string
}

export declare interface QuestionDeleteRequest {
	id: string
}

//=========================

export declare type QuestionFindFullResponse = QuestionFindOneResponse[]

export declare interface QuestionFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: QuestionFindOneResponse[]
}

export declare interface QuestionFindOneResponse {
	id: string
	text: string
	collection?: CollectionFindOneResponse
	createdAt: Date
}

export declare type QuestionCreateResponse = null

export declare type QuestionUpdateResponse = null

export declare type QuestionDeleteResponse = null
