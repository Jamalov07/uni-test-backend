import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ColBeforeQuestion,
	ColBeforeQuestionAnswer,
	CollectionBeforeCreateResponse,
	CollectionCreateRequest,
	CollectionDeleteRequest,
	CollectionFindAllRequest,
	CollectionFindAllResponse,
	CollectionFindFullRequest,
	CollectionFindOneRequest,
	CollectionFindOneResponse,
	CollectionUpdateRequest,
} from '../interfaces'
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { $Enums } from '@prisma/client'
import { ScienceFindOneResponse, ScienceFindOneResponseDto } from '../../science'
import { AdminFindOneResponse, AdminFindOneResponseDto } from '../../admin'

export class CollectionFindFullRequestDto implements CollectionFindFullRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	scienceId?: string

	@ApiPropertyOptional({ example: 'uz' })
	@IsEnum($Enums.CollectionLanguageEnum)
	@IsOptional()
	language?: $Enums.CollectionLanguageEnum

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	adminId?: string
}

export class CollectionFindAllRequestDto implements CollectionFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number

	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	scienceId?: string

	@ApiPropertyOptional({ example: 'uz' })
	@IsEnum($Enums.CollectionLanguageEnum)
	@IsOptional()
	language?: $Enums.CollectionLanguageEnum

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	adminId?: string
}

export class CollectionFindOneRequestDto implements CollectionFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CollectionCreateRequestDto implements CollectionCreateRequest {
	@ApiProperty({ type: 'string', format: 'binary', description: 'TXT file' })
	file: any

	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	scienceId: string

	@ApiProperty({ example: 'uz' })
	@IsEnum($Enums.CollectionLanguageEnum)
	@IsNotEmpty()
	language: $Enums.CollectionLanguageEnum

	@ApiProperty({ example: 5 })
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	amountInTest: number

	@ApiProperty({ example: 5 })
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	givenMinutes: number

	@ApiProperty({ example: 5 })
	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	maxAttempts: number

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	adminId: string
}

export class CollectionUpdateRequestDto implements CollectionUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsString()
	@IsOptional()
	name?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	scienceId?: string

	@ApiPropertyOptional({ example: 'uz' })
	@IsEnum($Enums.CollectionLanguageEnum)
	@IsOptional()
	language?: $Enums.CollectionLanguageEnum

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	amountInTest?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	givenMinutes?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	maxAttempts?: number

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	adminId?: string
}

export class CollectionDeleteRequestDto implements CollectionDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class CollectionFindFullResponseDto implements CollectionFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: 4 })
	amountInTest: number

	@ApiProperty({ example: 4 })
	givenMinutes: number

	@ApiProperty({ example: 'uz' })
	language: string

	@ApiProperty({ example: 6 })
	maxAttempts: number

	@ApiProperty({ type: ScienceFindOneResponseDto })
	science: ScienceFindOneResponse

	@ApiPropertyOptional({ type: AdminFindOneResponseDto })
	admin?: AdminFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CollectionFindOneResponseDto implements CollectionFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'name' })
	name: string

	@ApiProperty({ example: 4 })
	amountInTest: number

	@ApiProperty({ example: 4 })
	givenMinutes: number

	@ApiProperty({ example: 'uz' })
	language: string

	@ApiProperty({ example: 6 })
	maxAttempts: number

	@ApiProperty({ type: ScienceFindOneResponseDto })
	science: ScienceFindOneResponse

	@ApiPropertyOptional({ type: AdminFindOneResponseDto })
	admin?: AdminFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class CollectionFindAllResponseDto implements CollectionFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: CollectionFindOneResponseDto, isArray: true })
	data: CollectionFindOneResponse[]
}

export class ColBeforeQuestionAnswerDto implements ColBeforeQuestionAnswer {
	@ApiProperty({ example: 'toshkent' })
	@IsNotEmpty()
	@IsString()
	text: string

	@ApiProperty({ example: true })
	@IsNotEmpty()
	@IsBoolean()
	isCorrect: boolean
}
export class ColBeforeQuestionDto implements ColBeforeQuestion {
	@ApiProperty({ example: 'uzb poytaxti?' })
	@IsNotEmpty()
	@IsString()
	text: string

	@ApiProperty({ type: ColBeforeQuestionAnswerDto, isArray: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ColBeforeQuestionAnswerDto)
	answers: ColBeforeQuestionAnswer[]
}
class ScienceDto {
	@ApiProperty({ example: 'uuid' })
	@IsUUID()
	id: string

	@ApiProperty({ example: 'sciencename' })
	@IsString()
	name: string
}

export class CollectionBeforeCreateResponseDto implements CollectionBeforeCreateResponse {
	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	amountInTest: number

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	givenMinutes: number

	@ApiProperty({ example: 'uz' })
	@IsEnum($Enums.CollectionLanguageEnum)
	@IsNotEmpty()
	language: $Enums.CollectionLanguageEnum

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	maxAttempts: number

	@ApiProperty({ example: 'name' })
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	adminId: string

	@ApiProperty({ type: ColBeforeQuestionDto, isArray: true })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ColBeforeQuestionDto)
	questions: ColBeforeQuestion[]

	@ApiProperty({ example: { id: 'uuid', name: 'sciencename' } })
	@IsObject()
	@ValidateNested()
	@IsNotEmpty()
	@Type(() => ScienceDto)
	science: Pick<ScienceFindOneResponse, 'name' | 'id'>
}
