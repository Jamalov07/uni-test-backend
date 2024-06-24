import { CourseFindOneResponse } from '../../course'
import { FacultyFindOneResponse } from '../../faculty'
import { SemestrFindOneResponse } from '../../semestr'

export declare interface GroupFindFullRequest {
	courseId?: string
	facultyId?: string
	semestrId?: string
}

export declare interface GroupFindAllRequest {
	pageNumber?: number
	pageSize?: number
	courseId?: string
	facultyId?: string
	semestrId?: string
}

export declare interface GroupFindOneRequest {
	id: string
}

export declare interface GroupCreateRequest {
	name: string
	courseId: string
	facultyId: string
	semestrId: string
}

export declare interface GroupUpdateRequest {
	name?: string
	courseId?: string
	facultyId?: string
	semestrId?: string
}

export declare interface GroupDeleteRequest {
	id: string
}

//=========================

export declare type GroupFindFullResponse = GroupFindOneResponse[]

export declare interface GroupFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: GroupFindOneResponse[]
}

export declare interface GroupFindOneResponse {
	id: string
	name: string
	course?: CourseFindOneResponse
	faculty?: FacultyFindOneResponse
	semestr?: SemestrFindOneResponse
	createdAt: Date
}

export declare type GroupCreateResponse = null

export declare type GroupUpdateResponse = null

export declare type GroupDeleteResponse = null
