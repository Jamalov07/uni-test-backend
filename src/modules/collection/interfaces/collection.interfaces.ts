import { CollectionLanguageEnum } from '@prisma/client'
import { ScienceFindOneResponse } from '../../science'

export declare interface CollectionFindFullRequest {
	name?: string
	language?: CollectionLanguageEnum
	scienceId?: string
}

export declare interface CollectionFindAllRequest {
	pageNumber?: number
	pageSize?: number
	name?: string
	language?: CollectionLanguageEnum
	scienceId?: string
}

export declare interface CollectionFindOneRequest {
	id: string
}

export declare interface CollectionCreateRequest {
	name: string
	language: CollectionLanguageEnum
	scienceId: string
	maxAttempts: number
	givenMinutes: number
	amountInTest: number
}

export declare interface CollectionUpdateRequest {
	name?: string
	language?: CollectionLanguageEnum
	scienceId?: string
	maxAttempts?: number
	givenMinutes?: number
	amountInTest?: number
}

export declare interface CollectionDeleteRequest {
	id: string
}

//=========================

export declare type CollectionFindFullResponse = CollectionFindOneResponse[]

export declare interface CollectionFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: CollectionFindOneResponse[]
}

export declare interface CollectionFindOneResponse {
	id: string
	name: string
	language: string
	science?: ScienceFindOneResponse
	maxAttempts: number
	givenMinutes: number
	amountInTest: number
	createdAt: Date
}

export declare type CollectionCreateResponse = null

export declare type CollectionUpdateResponse = null

export declare type CollectionDeleteResponse = null
