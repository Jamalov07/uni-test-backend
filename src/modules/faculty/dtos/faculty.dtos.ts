import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	FacultyCourse,
	FacultyCourseSemestr,
	FacultyCourseSemestrGroup,
	FacultyCourseSemestrGroupStudent,
	FacultyCreateRequest,
	FacultyDeleteRequest,
	FacultyFindAllRequest,
	FacultyFindAllResponse,
	FacultyFindFullForSetCollection,
	FacultyFindFullRequest,
	FacultyFindOneRequest,
	FacultyFindOneResponse,
	FacultyUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class FacultyFindFullRequestDto implements FacultyFindFullRequest {}

export class FacultyFindAllRequestDto implements FacultyFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number
}

export class FacultyFindOneRequestDto implements FacultyFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class FacultyCreateRequestDto implements FacultyCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string
}

export class FacultyUpdateRequestDto implements FacultyUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string
}

export class FacultyDeleteRequestDto implements FacultyDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class FacultyFindFullResponseDto implements FacultyFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class FacultyFindOneResponseDto implements FacultyFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class FacultyFindAllResponseDto implements FacultyFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: FacultyFindOneResponseDto, isArray: true })
	data: FacultyFindOneResponse[]
}
//=========================

export class FacultyCourseSemestrGroupStudentDto implements FacultyCourseSemestrGroupStudent {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'john doe' })
	fullName: string
}

export class FacultyCourseSemestrGroupDto implements FacultyCourseSemestrGroup {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'groupname' })
	name: string

	@ApiProperty({ type: FacultyCourseSemestrGroupStudentDto, isArray: true })
	students: FacultyCourseSemestrGroupStudent[]
}

export class FacultyCourseSemestrDto implements FacultyCourseSemestr {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 2 })
	stage: number

	@ApiProperty({ type: FacultyCourseSemestrGroupDto, isArray: true })
	groups: FacultyCourseSemestrGroup[]
}

export class FacultyCourseDto implements FacultyCourse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 2 })
	stage: number

	@ApiProperty({ type: FacultyCourseSemestrDto, isArray: true })
	semestrs: FacultyCourseSemestr[]
}

export class FacultyFindFullForSetCollectionDto implements FacultyFindFullForSetCollection {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ type: FacultyCourseDto, isArray: true })
	courses?: FacultyCourse[]
}
