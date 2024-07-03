import { CollectionFindOneResponse } from '../../collection'
import { CourseFindOneResponse } from '../../course'
import { FacultyFindOneResponse } from '../../faculty'
import { GroupFindOneResponse } from '../../group'
import { SemestrFindOneResponse } from '../../semestr'
import { UserFindOneResponse } from '../../user'

export declare interface ArchiveFindFullRequest {
	userId?: string
	groupId?: string
	courseId?: string
	facultyId?: string
	collectionId?: string
	semestrId?: string
}

export declare interface ArchiveFindAllRequest {
	pageNumber?: number
	pageSize?: number
	userId?: string
	groupId?: string
	courseId?: string
	facultyId?: string
	collectionId?: string
	semestrId?: string
}

export declare interface ArchiveFindOneRequest {
	id: string
}

export declare interface ArchiveCreateRequest {
	result: number
	userId: string
	collectionId: string
	collection: ArchiveCollection
	startTime: Date
	endTime: Date
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
	semestr: SemestrFindOneResponse
	testCount: number
	faculty: FacultyFindOneResponse
	collection: CollectionFindOneResponse
	createdAt: Date
	startTime: Date
	endTime: Date
	archiveCollection?: ArchiveCollectionResponse
}

export class ArchiveCollectionResponse {
	admin: string
	amountInTest: number
	givenMinutes: number
	language: string
	maxAttempts: number
	name: string
	science: string
	questions: ArchiveCollectionQuestionResponse[]
}

export class ArchiveCollectionQuestionResponse {
	text: string
	answers: ArchiveCollectionQuestionAnswerResponse[]
}

export class ArchiveCollectionQuestionAnswerResponse {
	isChecked: boolean
	isCorrect: boolean
	text: string
}

export declare type ArchiveCreateResponse = null

export declare type ArchiveUpdateResponse = null

export declare type ArchiveDeleteResponse = null

export declare interface ArchiveCollection {
	id: string
	questions: CollectionQuestion[]
}

export declare interface CollectionQuestion {
	text: string
	answers: QuestionAnswer[]
}

export declare interface QuestionAnswer {
	text: string
	isChecked: boolean
	isCorrect: boolean
}
