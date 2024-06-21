import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	CollectionCreateRequest,
	CollectionDeleteRequest,
	CollectionFindAllRequest,
	CollectionFindAllResponse,
	CollectionFindFullRequest,
	CollectionFindOneRequest,
	CollectionFindOneResponse,
	CollectionUpdateRequest,
} from '../interfaces'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { $Enums } from '@prisma/client'
import { ScienceFindOneResponse, ScienceFindOneResponseDto } from '../../science'

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
}

export class CollectionFindOneRequestDto implements CollectionFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class CollectionCreateRequestDto implements CollectionCreateRequest {
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
