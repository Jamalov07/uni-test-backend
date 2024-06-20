import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	CourseCreateRequest,
	CourseDeleteRequest,
	CourseFindAllRequest,
	CourseFindAllResponse,
	CourseFindFullRequest,
	CourseFindOneRequest,
	CourseFindOneResponse,
	CourseUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class CourseFindFullRequestDto implements CourseFindFullRequest {}

export class CourseFindAllRequestDto implements CourseFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number
}

export class CourseFindOneRequestDto implements CourseFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CourseCreateRequestDto implements CourseCreateRequest {
	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	stage: number
}

export class CourseUpdateRequestDto implements CourseUpdateRequest {
	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	stage?: number
}

export class CourseDeleteRequestDto implements CourseDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class CourseFindFullResponseDto implements CourseFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	stage: number

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CourseFindOneResponseDto implements CourseFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	stage: number

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CourseFindAllResponseDto implements CourseFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: CourseFindOneResponseDto, isArray: true })
	data: CourseFindOneResponse[]
}
