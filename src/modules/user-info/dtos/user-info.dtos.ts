import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	UserInfoCreateRequest,
	UserInfoDeleteRequest,
	UserInfoFindAllRequest,
	UserInfoFindAllResponse,
	UserInfoFindFullRequest,
	UserInfoFindOneRequest,
	UserInfoFindOneResponse,
	UserInfoUpdateRequest,
} from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { UserFindOneResponse } from '../../user/interfaces'
import { UserFindOneResponseDto } from '../../user/dtos'
import { GroupFindOneResponse, GroupFindOneResponseDto } from '../../group'

export class UserInfoFindFullRequestDto implements UserInfoFindFullRequest {
	@ApiPropertyOptional({ example: 'hemisId' })
	@IsString()
	@IsOptional()
	hemisId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	groupId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string
}

export class UserInfoFindAllRequestDto implements UserInfoFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number

	@ApiPropertyOptional({ example: 'hemisId' })
	@IsString()
	@IsOptional()
	hemisId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	groupId?: string

	@ApiPropertyOptional({ example: 'uuid' })
	@IsUUID('4')
	@IsOptional()
	userId?: string
}

export class UserInfoFindOneRequestDto implements UserInfoFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserInfoCreateRequestDto implements UserInfoCreateRequest {
	@ApiProperty({ example: 'userId' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 'groupid' })
	@IsUUID('4')
	@IsNotEmpty()
	groupId: string

	@ApiProperty({ example: 'hemisid' })
	@IsString()
	@IsNotEmpty()
	hemisId: string
}

export class UserInfoWithOutUserIdDto implements Omit<UserInfoCreateRequest, 'userId'> {
	@ApiProperty({ example: 'userId' })
	@IsUUID('4')
	@IsNotEmpty()
	userId: string

	@ApiProperty({ example: 'groupid' })
	@IsUUID('4')
	@IsNotEmpty()
	groupId: string

	@ApiProperty({ example: 'hemisid' })
	@IsString()
	@IsNotEmpty()
	hemisId: string
}

export class UserInfoUpdateRequestDto implements UserInfoUpdateRequest {
	@ApiPropertyOptional({ example: 'userId' })
	@IsUUID('4')
	@IsOptional()
	userId: string

	@ApiPropertyOptional({ example: 'groupid' })
	@IsUUID('4')
	@IsOptional()
	groupId: string

	@ApiPropertyOptional({ example: 'hemisid' })
	@IsString()
	@IsOptional()
	hemisId: string
}

export class UserInfoDeleteRequestDto implements UserInfoDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class UserInfoFindFullResponseDto implements UserInfoFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiPropertyOptional({ type: UserFindOneResponseDto })
	user?: UserFindOneResponse

	@ApiProperty({ type: GroupFindOneResponseDto })
	group: GroupFindOneResponse

	@ApiProperty({ example: 'hemis id' })
	hemisId: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserInfoFindOneResponseDto implements UserInfoFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiPropertyOptional({ type: UserFindOneResponseDto })
	user?: UserFindOneResponse

	@ApiProperty({ type: GroupFindOneResponseDto })
	group: GroupFindOneResponse

	@ApiProperty({ example: 'hemis id' })
	hemisId: string

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserInfoFindAllResponseDto implements UserInfoFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: UserInfoFindOneResponseDto, isArray: true })
	data: UserInfoFindOneResponse[]
}
