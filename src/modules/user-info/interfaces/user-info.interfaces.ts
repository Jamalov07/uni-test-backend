import { GroupFindOneResponse } from '../../group'
import { UserFindOneResponse } from '../../user/interfaces'

export declare interface UserInfoFindFullRequest {
	userId?: string
	hemisId?: string
	groupId?: string
}

export declare interface UserInfoFindAllRequest {
	pageNumber?: number
	pageSize?: number
	userId?: string
	hemisId?: string
	groupId?: string
}

export declare interface UserInfoFindOneRequest {
	id: string
}

export declare interface UserInfoCreateRequest {
	userId: string
	hemisId: string
	groupId: string
}

export declare interface UserInfoUpdateRequest {
	userId?: string
	hemisId?: string
	groupId?: string
}

export declare interface UserInfoDeleteRequest {
	id: string
}

//=========================

export declare type UserInfoFindFullResponse = UserInfoFindOneResponse[]

export declare interface UserInfoFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: UserInfoFindOneResponse[]
}

export declare interface UserInfoFindOneResponse {
	id: string
	user?: UserFindOneResponse
	hemisId: string
	group: GroupFindOneResponse
	createdAt: Date
}

export declare type UserInfoCreateResponse = null

export declare type UserInfoUpdateResponse = null

export declare type UserInfoDeleteResponse = null
