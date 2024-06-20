import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	UserCreateRequest,
	UserDeleteRequest,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindOneRequest,
	UserFindOneResponse,
	UserUpdateRequest,
} from '../interfaces'
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { $Enums } from '@prisma/client'
import { UserInfoFindOneResponse, UserInfoFindOneResponseDto } from '../../user-info'

export class UserFindFullRequestDto implements UserFindFullRequest {
	@ApiPropertyOptional({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiPropertyOptional({ example: 'jn' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.UserType)
	@IsOptional()
	type?: $Enums.UserType
}

export class UserFindAllRequestDto implements UserFindAllRequest {
	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageNumber?: number

	@ApiPropertyOptional({ example: 5 })
	@IsNumber()
	@IsOptional()
	pageSize?: number

	@ApiPropertyOptional({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiPropertyOptional({ example: 'jn' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.UserType)
	@IsOptional()
	type?: $Enums.UserType
}

export class UserFindOneRequestDto implements UserFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserCreateRequestDto implements UserCreateRequest {
	@ApiProperty({ example: 'fullName' })
	@IsString()
	@IsNotEmpty()
	fullName: string

	@ApiProperty({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsNotEmpty()
	emailAddress: string

	@ApiProperty({ example: '12345' })
	@IsString()
	@IsNotEmpty()
	password: string

	@ApiProperty({ example: 'student' })
	@IsEnum($Enums.UserType)
	@IsNotEmpty()
	type: $Enums.UserType
}

export class UserUpdateRequestDto implements UserUpdateRequest {
	@ApiPropertyOptional({ example: 'fullName' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiPropertyOptional({ example: '12345' })
	@IsString()
	@IsOptional()
	password?: string

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.UserType)
	@IsOptional()
	type?: $Enums.UserType
}

export class UserDeleteRequestDto implements UserDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class UserFindFullResponseDto implements UserFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'fullName' })
	fullName: string

	@ApiProperty({ example: 'jn@gmail.com' })
	emailAddress: string

	@ApiProperty({ example: 'link' })
	image: string

	@ApiProperty({ example: 'student' })
	type: string

	@ApiPropertyOptional({ type: UserInfoFindOneResponseDto })
	userInfo?: UserInfoFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserFindOneResponseDto implements UserFindOneResponse {
	@ApiProperty({ example: 'uuid' })
	id: string

	@ApiProperty({ example: 'fullName' })
	fullName: string

	@ApiProperty({ example: 'jn@gmail.com' })
	emailAddress: string

	@ApiProperty({ example: 'link' })
	image: string

	@ApiProperty({ example: 'student' })
	type: string

	@ApiPropertyOptional({ type: UserInfoFindOneResponseDto })
	userInfo?: UserInfoFindOneResponse

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class UserFindAllResponseDto implements UserFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: UserFindOneResponseDto, isArray: true })
	data: UserFindOneResponse[]
}
