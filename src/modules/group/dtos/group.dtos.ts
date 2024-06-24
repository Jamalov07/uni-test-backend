import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	GroupCreateRequest,
	GroupDeleteRequest,
	GroupFindAllRequest,
	GroupFindAllResponse,
	GroupFindFullRequest,
	GroupFindOneRequest,
	GroupFindOneResponse,
	GroupUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { CourseFindOneResponse, CourseFindOneResponseDto } from '../../course'
import { FacultyFindOneResponse, FacultyFindOneResponseDto } from '../../faculty'
import { SemestrFindOneResponse, SemestrFindOneResponseDto } from '../../semestr'

export class GroupFindFullRequestDto implements GroupFindFullRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	courseId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	semestrId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	facultyId?: string
}

export class GroupFindAllRequestDto implements GroupFindAllRequest {
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
	courseId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	facultyId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	semestrId?: string
}

export class GroupFindOneRequestDto implements GroupFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class GroupCreateRequestDto implements GroupCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	courseId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	facultyId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	semestrId: string
}

export class GroupUpdateRequestDto implements GroupUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	courseId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	facultyId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	semestrId?: string
}

export class GroupDeleteRequestDto implements GroupDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class GroupFindFullResponseDto implements GroupFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: CourseFindOneResponseDto })
	course: CourseFindOneResponse

	@ApiProperty({ type: FacultyFindOneResponseDto })
	faculty: FacultyFindOneResponse

	@ApiPropertyOptional({ type: SemestrFindOneResponseDto })
	semestr?: SemestrFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class GroupFindOneResponseDto implements GroupFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: CourseFindOneResponseDto })
	course: CourseFindOneResponse

	@ApiProperty({ type: FacultyFindOneResponseDto })
	faculty: FacultyFindOneResponse

	@ApiPropertyOptional({ type: SemestrFindOneResponseDto })
	semestr?: SemestrFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class GroupFindAllResponseDto implements GroupFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: GroupFindOneResponseDto, isArray: true })
	data: GroupFindOneResponse[]
}
