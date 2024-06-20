import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	ScienceCreateRequest,
	ScienceDeleteRequest,
	ScienceFindAllRequest,
	ScienceFindAllResponse,
	ScienceFindFullRequest,
	ScienceFindOneRequest,
	ScienceFindOneResponse,
	ScienceUpdateRequest,
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
