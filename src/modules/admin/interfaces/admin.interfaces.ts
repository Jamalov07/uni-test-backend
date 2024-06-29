import { AdminTypeEnum } from '@prisma/client'
import { SignInTokenDefinition } from '../../user'

export declare interface AdminFindFullRequest {
	type?: AdminTypeEnum
	fullName?: string
	emailAddress?: string
}

export declare interface AdminFindAllRequest {
	pageNumber?: number
	pageSize?: number
	type?: AdminTypeEnum
	fullName?: string
	emailAddress?: string
}

export declare interface AdminFindOneRequest {
	id: string
}

export declare interface AdminSignInRequest {
	hemisId: string
	password: string
}

export declare interface AdminCreateRequest {
	fullName: string
	image?: string
	type: AdminTypeEnum
	password: string
	emailAddress: string
}

export declare interface AdminUpdateRequest {
	fullName?: string
	image?: string
	type?: AdminTypeEnum
	password?: string
	emailAddress?: string
}

export declare interface AdminDeleteRequest {
	id: string
}

//=========================

export declare type AdminFindFullResponse = AdminFindOneResponse[]

export declare interface AdminFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: AdminFindOneResponse[]
}

export declare interface AdminFindOneResponse {
	id: string
	fullName: string
	image: string
	type: string
	password?: string
	emailAddress: string
	createdAt: Date
}

export declare interface AdminSignInResponse {
	admin: AdminFindOneResponse
	tokens: SignInTokenDefinition
}

export declare type AdminCreateResponse = null

export declare type AdminUpdateResponse = null

export declare type AdminDeleteResponse = null
