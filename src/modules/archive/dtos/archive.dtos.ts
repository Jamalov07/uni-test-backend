import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	ArchiveCreateRequest,
	ArchiveDeleteRequest,
	ArchiveFindAllRequest,
	ArchiveFindAllResponse,
	ArchiveFindFullRequest,
	ArchiveFindOneRequest,
	ArchiveFindOneResponse,
	ArchiveUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { CollectionFindOneResponse, CollectionFindOneResponseDto } from '../../collection'
import { FacultyFindOneResponse, FacultyFindOneResponseDto } from '../../faculty'
import { GroupFindOneResponse, GroupFindOneResponseDto } from '../../group'
import { UserFindOneResponse, UserFindOneResponseDto } from '../../user'
import { CourseFindOneResponse, CourseFindOneResponseDto } from '../../course'

export class ArchiveFindFullRequestDto implements ArchiveFindFullRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	collectionId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	facultyId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	courseId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	groupId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string
}

export class ArchiveFindAllRequestDto implements ArchiveFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	collectionId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	facultyId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	courseId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	groupId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string
}

export class ArchiveFindOneRequestDto implements ArchiveFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class ArchiveCreateRequestDto implements ArchiveCreateRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	collectionId: string

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	result: number

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string
}

export class ArchiveUpdateRequestDto implements ArchiveUpdateRequest {
	@ApiPropertyOptional({ example: 10 })
	@IsNumber()
	@IsOptional()
	result?: number
}

export class ArchiveDeleteRequestDto implements ArchiveDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class ArchiveFindFullResponseDto implements ArchiveFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ type: CollectionFindOneResponseDto })
	collection: CollectionFindOneResponse

	@ApiProperty({ type: FacultyFindOneResponseDto })
	faculty: FacultyFindOneResponse

	@ApiProperty({ type: GroupFindOneResponseDto })
	group: GroupFindOneResponse

	@ApiProperty({ type: CourseFindOneResponseDto })
	course: CourseFindOneResponse

	@ApiProperty({ example: 10 })
	result: number

	@ApiProperty({ type: UserFindOneResponseDto })
	user: UserFindOneResponse

	@ApiProperty({ example: 10 })
	testCount: number

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class ArchiveFindOneResponseDto implements ArchiveFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ type: CollectionFindOneResponseDto })
	collection: CollectionFindOneResponse

	@ApiProperty({ type: FacultyFindOneResponseDto })
	faculty: FacultyFindOneResponse

	@ApiProperty({ type: GroupFindOneResponseDto })
	group: GroupFindOneResponse

	@ApiProperty({ type: CourseFindOneResponseDto })
	course: CourseFindOneResponse

	@ApiProperty({ example: 10 })
	result: number

	@ApiProperty({ type: UserFindOneResponseDto })
	user: UserFindOneResponse

	@ApiProperty({ example: 10 })
	testCount: number
	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class ArchiveFindAllResponseDto implements ArchiveFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: ArchiveFindOneResponseDto, isArray: true })
	data: ArchiveFindOneResponse[]
}
