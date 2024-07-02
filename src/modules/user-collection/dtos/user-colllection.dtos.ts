import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	UserCollectionCreateManyRequest,
	UserCollectionCreateRequest,
	UserCollectionDeleteRequest,
	UserCollectionFindAllRequest,
	UserCollectionFindAllResponse,
	UserCollectionFindFullRequest,
	UserCollectionFindOneRequest,
	UserCollectionFindOneResponse,
	UserCollectionUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { UserFindOneResponse, UserFindOneResponseDto } from '../../user'
import { CollectionFindOneResponse, CollectionFindOneResponseDto } from '../../collection'

export class UserCollectionFindFullRequestDto implements UserCollectionFindFullRequest {
	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	collectionId?: string
}

export class UserCollectionFindAllRequestDto implements UserCollectionFindAllRequest {
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
	userId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	collectionId?: string
}

export class UserCollectionFindOneRequestDto implements UserCollectionFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserCollectionCreateRequestDto implements UserCollectionCreateRequest {
	@ApiProperty({ example: 'name' })
	@IsNumber()
	@IsNotEmpty()
	haveAttempt: number

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	collectionId: string
}

export class UserCollectionCreateManyRequestDto implements UserCollectionCreateManyRequest {
	@ApiProperty({ type: UserCollectionCreateRequestDto, isArray: true })
	userCollections: UserCollectionCreateRequest[]
}

export class UserCollectionUpdateRequestDto implements UserCollectionUpdateRequest {
	@ApiPropertyOptional({ example: 'name' })
	@IsNumber()
	@IsOptional()
	haveAttempt?: number

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	collectionId?: string
}

export class UserCollectionDeleteRequestDto implements UserCollectionDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class UserCollectionFindFullResponseDto implements UserCollectionFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	haveAttempt: number

	@ApiProperty({ type: UserFindOneResponseDto })
	user: UserFindOneResponse

	@ApiProperty({ type: CollectionFindOneResponseDto })
	collection: CollectionFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserCollectionFindOneResponseDto implements UserCollectionFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 4 })
	haveAttempt: number

	@ApiProperty({ type: UserFindOneResponseDto })
	user: UserFindOneResponse

	@ApiProperty({ type: CollectionFindOneResponseDto })
	collection: CollectionFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserCollectionFindAllResponseDto implements UserCollectionFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: UserCollectionFindOneResponseDto, isArray: true })
	data: UserCollectionFindOneResponse[]
}
