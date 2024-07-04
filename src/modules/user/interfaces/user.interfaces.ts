import { UserTypeEnum } from '@prisma/client'
import { UserInfoCreateRequest, UserInfoFindOneResponse } from '../../user-info'

export declare interface UserFindFullRequest {
	type?: UserTypeEnum
	fullName?: string
	emailAddress?: string
}

export declare interface UserFindAllRequest {
	pageNumber?: number
	pageSize?: number
	type?: UserTypeEnum
	fullName?: string
	emailAddress?: string
}

export declare interface UserFindOneRequest {
	id: string
}

export declare interface UserSignInRequest {
	hemisId: string
	password: string
}

export declare interface UserCreateRequest {
	fullName: string
	image?: string
	type: UserTypeEnum
	password: string
	emailAddress?: string
}

export declare type UserCreateWithInfoRequest = UserCreateRequest & Omit<UserInfoCreateRequest, 'userId'>

export declare interface UserCreateWithJsonFileRequest {
	full_name: string
	faculty: string
	course: number
	group: string
	image: string
	hemis_id: string
	password: string
	semestr: number
}

export declare interface UserUpdateRequest {
	fullName?: string
	image?: string
	type?: UserTypeEnum
	password?: string
	emailAddress?: string
}

export declare interface UserDeleteRequest {
	id: string
}

//=========================

export declare type UserFindFullResponse = UserFindOneResponse[]

export declare interface UserFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: UserFindOneResponse[]
}

export declare interface UserFindOneResponse {
	id: string
	fullName: string
	image: string
	type: string
	password?: string
	emailAddress: string
	userInfo?: UserInfoFindOneResponse
	createdAt: Date
}

export declare interface UserSignInResponse {
	user: UserFindOneResponse
	userInfo?: UserInfoFindOneResponse
	tokens: SignInTokenDefinition
}

export declare interface SignInTokenDefinition {
	accessToken: string
	refreshToken: string
}

export declare type UserCreateResponse = null

export declare type UserUpdateResponse = null

export declare type UserDeleteResponse = null
