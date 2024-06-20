import { CollectionFindOneResponse } from '../../collection'
import { CourseFindOneResponse } from '../../course'
import { FacultyFindOneResponse } from '../../faculty'
import { GroupFindOneResponse } from '../../group'
import { UserFindOneResponse } from '../../user'

export declare interface ArchiveFindFullRequest {
	userId?: string
	groupId?: string
	courseId?: string
	facultyId?: string
	collectionId?: string
}

export declare interface ArchiveFindAllRequest {
	pageNumber?: number
	pageSize?: number
	userId?: string
	groupId?: string
	courseId?: string
	facultyId?: string
	collectionId?: string
}

export declare interface ArchiveFindOneRequest {
	id: string
}

export declare interface ArchiveCreateRequest {
	result: number
	userId: string
	collectionId: string
}

export declare interface ArchiveUpdateRequest {
	result?: number
}

export declare interface ArchiveDeleteRequest {
	id: string
}

//=========================

export declare type ArchiveFindFullResponse = ArchiveFindOneResponse[]

export declare interface ArchiveFindAllResponse {
	totalCount: number
	pageSize: number
	pageCount: number
	data: ArchiveFindOneResponse[]
}

export declare interface ArchiveFindOneResponse {
	id: string
	result: number
	user: UserFindOneResponse
	group: GroupFindOneResponse
	course: CourseFindOneResponse
	testCount: number
	faculty: FacultyFindOneResponse
	collection: CollectionFindOneResponse
	createdAt: Date
}

export declare type ArchiveCreateResponse = null

export declare type ArchiveUpdateResponse = null

export declare type ArchiveDeleteResponse = null