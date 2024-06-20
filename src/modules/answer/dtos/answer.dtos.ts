import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	AnswerCreateRequest,
	AnswerDeleteRequest,
	AnswerFindAllRequest,
	AnswerFindAllResponse,
	AnswerFindFullRequest,
	AnswerFindOneRequest,
	AnswerFindOneResponse,
	AnswerUpdateRequest,
} from '../interfaces'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { QuestionFindOneResponse, QuestionFindOneResponseDto } from '../../question'

export class AnswerFindFullRequestDto implements AnswerFindFullRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	questionId?: string

	@ApiPropertyOptional({ example: 'text' })
	@IsString()
	@IsOptional()
	text?: string
}

export class AnswerFindAllRequestDto implements AnswerFindAllRequest {
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
	questionId?: string

	@ApiPropertyOptional({ example: 'text' })
	@IsString()
	@IsOptional()
	text?: string
}

export class AnswerFindOneRequestDto implements AnswerFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class AnswerCreateRequestDto implements AnswerCreateRequest {
	@ApiProperty({ example: 'text' })
	@IsString()
	@IsNotEmpty()
	text: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	questionId: string

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsNotEmpty()
	isCorrect: boolean
}

export class AnswerUpdateRequestDto implements AnswerUpdateRequest {
	@ApiPropertyOptional({ example: 'text' })
	@IsString()
	@IsOptional()
	text?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	questionId?: string

	@ApiPropertyOptional({ example: true })
	@IsBoolean()
	@IsOptional()
	isCorrect?: boolean
}

export class AnswerDeleteRequestDto implements AnswerDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class AnswerFindFullResponseDto implements AnswerFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'text' })
	text: string

	@ApiProperty({ type: QuestionFindOneResponseDto })
	question: QuestionFindOneResponse

	@ApiProperty({ example: true })
	isCorrect: boolean

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class AnswerFindOneResponseDto implements AnswerFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'text' })
	text: string

	@ApiProperty({ example: true })
	isCorrect: boolean

	@ApiProperty({ type: QuestionFindOneResponseDto })
	question: QuestionFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class AnswerFindAllResponseDto implements AnswerFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: AnswerFindOneResponseDto, isArray: true })
	data: AnswerFindOneResponse[]
}
