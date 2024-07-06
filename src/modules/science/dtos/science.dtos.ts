import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	ScienceCollection,
	ScienceCollection2,
	ScienceCollectionArchive,
	ScienceCollectionArchiveCourse,
	ScienceCollectionArchiveFaculty,
	ScienceCollectionArchiveSemestr,
	ScienceCreateRequest,
	ScienceDeleteRequest,
	ScienceFindAllRequest,
	ScienceFindAllResponse,
	ScienceFindFullForArchive,
	ScienceFindFullRequest,
	ScienceFindOneRequest,
	ScienceFindOneResponse,
	ScienceFindOneWithUserCollection,
	ScienceFindOnwWithUserCollectionRequest,
	ScienceUpdateRequest,
	ScienceUserCollection,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class ScienceFindFullRequestDto implements ScienceFindFullRequest {}

export class ScienceFindAllRequestDto implements ScienceFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number
}

export class ScienceFindOneRequestDto implements ScienceFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class ScienceCreateRequestDto implements ScienceCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class ScienceUpdateRequestDto implements ScienceUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string
}

export class ScienceDeleteRequestDto implements ScienceDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class ScienceFindFullResponseDto implements ScienceFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class ScienceFindOneResponseDto implements ScienceFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class ScienceFindAllResponseDto implements ScienceFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: ScienceFindOneResponseDto, isArray: true })
	data: ScienceFindOneResponse[]
}

export class ScienceCollectionArchiveFacultyDto implements ScienceCollectionArchiveFaculty {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string
}

export class ScienceCollectionArchiveCourseDto implements ScienceCollectionArchiveCourse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 1 })
	stage: number
}

export class ScienceCollectionArchiveSemestrDto implements ScienceCollectionArchiveSemestr {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 3 })
	stage: number
}

export class ScienceCollectionArchiveDto implements ScienceCollectionArchive {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ type: ScienceCollectionArchiveFacultyDto })
	faculty: ScienceCollectionArchiveFaculty

	@ApiProperty({ type: ScienceCollectionArchiveCourseDto })
	course: ScienceCollectionArchiveCourse

	@ApiProperty({ type: ScienceCollectionArchiveSemestrDto })
	semestr: ScienceCollectionArchiveSemestr

	@ApiProperty({ example: 4 })
	result: number

	@ApiProperty({ example: 10 })
	testCount: number
}
export class ScienceCollectionDto implements ScienceCollection {
	@ApiProperty({ example: 50 })
	givenMinutes: number

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'uz' })
	language: string

	@ApiProperty({ example: 20 })
	amountInTest: number

	@ApiProperty({ example: 2 })
	maxAttempts: number

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: ScienceCollectionArchiveDto, isArray: true })
	archives: ScienceCollectionArchive[]
}

export class ScienceFindFullForArchiveDto implements ScienceFindFullForArchive {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date

	@ApiProperty({ type: ScienceCollectionDto, isArray: true })
	collections: ScienceCollection[]
}

export class ScienceFindOnwWithUserCollectionRequestDto implements ScienceFindOnwWithUserCollectionRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string
}

export class ScienceUserCollectionDto implements ScienceUserCollection {
	@ApiProperty({ example: { id: 'uuid', name: 'john doe' }, isArray: true })
	user: { id: string; fullName: string }

	@ApiProperty({ example: 2 })
	haveAttempt: number
}
export class ScienceCollection2Dto implements ScienceCollection2 {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 20 })
	amountInTest: number

	@ApiProperty({ example: 20 })
	givenMinutes: number

	@ApiProperty({ example: 'uz' })
	language: string

	@ApiProperty({ example: 20 })
	maxAttempts: number

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: ScienceUserCollectionDto, isArray: true })
	userCollections: ScienceUserCollection[]
}

export class ScienceFindOneWithUserCollectionDto implements ScienceFindOneWithUserCollection {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: ScienceCollection2Dto, isArray: true })
	collections: ScienceCollection2[]
}
