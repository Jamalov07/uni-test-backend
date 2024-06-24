import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	SemestrCreateRequest,
	SemestrDeleteRequest,
	SemestrFindAllRequest,
	SemestrFindAllResponse,
	SemestrFindFullRequest,
	SemestrFindOneRequest,
	SemestrFindOneResponse,
	SemestrUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class SemestrFindFullRequestDto implements SemestrFindFullRequest {}

export class SemestrFindAllRequestDto implements SemestrFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number
}

export class SemestrFindOneRequestDto implements SemestrFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class SemestrCreateRequestDto implements SemestrCreateRequest {
	@ApiProperty({ example: 1 })
	@IsNumber()
	@IsNotEmpty()
	stage: number
}

export class SemestrUpdateRequestDto implements SemestrUpdateRequest {
	@ApiPropertyOptional({ example: 1 })
	@IsNumber()
	@IsOptional()
	stage?: number
}

export class SemestrDeleteRequestDto implements SemestrDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class SemestrFindFullResponseDto implements SemestrFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	stage: number

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class SemestrFindOneResponseDto implements SemestrFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	stage: number

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class SemestrFindAllResponseDto implements SemestrFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: SemestrFindOneResponseDto, isArray: true })
	data: SemestrFindOneResponse[]
}
