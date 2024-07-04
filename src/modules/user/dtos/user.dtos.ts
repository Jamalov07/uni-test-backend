import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	SignInTokenDefinition,
	UserCreateRequest,
	UserCreateWithInfoRequest,
	UserDeleteRequest,
	UserFindAllRequest,
	UserFindAllResponse,
	UserFindFullRequest,
	UserFindOneRequest,
	UserFindOneResponse,
	UserSignInRequest,
	UserSignInResponse,
	UserUpdateRequest,
	UserCreateWithJsonFileRequest,
} from '../interfaces'
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { $Enums } from '@prisma/client'
import { UserInfoFindOneResponse, UserInfoFindOneResponseDto } from '../../user-info'
import { Type } from 'class-transformer'

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
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type?: $Enums.UserTypeEnum
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
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type?: $Enums.UserTypeEnum
}

export class UserFindOneRequestDto implements UserFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class UserSignInRequestDto implements UserSignInRequest {
	@ApiProperty({ example: 'hemisid' })
	@IsString()
	@IsNotEmpty()
	hemisId: string

	@ApiProperty({ example: 'password' })
	@IsString()
	@IsNotEmpty()
	password: string
}

export class UserCreateRequestDto implements UserCreateRequest {
	@ApiProperty({ example: 'fullName' })
	@IsString()
	@IsNotEmpty()
	fullName: string

	@ApiProperty({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiProperty({ example: '12345' })
	@IsString()
	@IsNotEmpty()
	password: string

	@ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
	image?: any

	@ApiProperty({ example: 'student' })
	@IsEnum($Enums.UserTypeEnum)
	@IsNotEmpty()
	type: $Enums.UserTypeEnum
}

export class UserCreateWithInfoRequestDto implements UserCreateWithInfoRequest {
	@ApiProperty({ example: 'fullName' })
	@IsString()
	@IsNotEmpty()
	fullName: string

	@ApiProperty({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiProperty({ example: '12345' })
	@IsString()
	@IsNotEmpty()
	password: string

	@ApiProperty({ example: 'student' })
	@IsEnum($Enums.UserTypeEnum)
	@IsNotEmpty()
	type: $Enums.UserTypeEnum

	@ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
	image?: any

	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	groupId: string

	@ApiProperty({ example: 'hemisid' })
	@IsString()
	@IsNotEmpty()
	hemisId: string
}

export class UserCreateManyWithJsonFileDto implements UserCreateWithJsonFileRequest {
	@IsString()
	@IsNotEmpty()
	full_name: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	@IsNotEmpty()
	image: string

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	course: number

	@IsString()
	@IsNotEmpty()
	faculty: string

	@IsString()
	@IsNotEmpty()
	group: string

	@IsString()
	@IsNotEmpty()
	hemis_id: string

	@IsNumber()
	@IsNotEmpty()
	@Type(() => Number)
	semestr: number
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

	// @ApiPropertyOptional({ example: 'link' })
	// @IsString()
	// @IsOptional()
	// image?: string

	@ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
	image?: any

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.UserTypeEnum)
	@IsOptional()
	type?: $Enums.UserTypeEnum
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

export class SignInTokenDefinitionDto implements SignInTokenDefinition {
	@ApiProperty({ example: 'eyjtgfgf....' })
	accessToken: string

	@ApiProperty({ example: 'eyjtgfgf....' })
	refreshToken: string
}

export class UserSignInResponseDto implements UserSignInResponse {
	@ApiProperty({ type: UserFindOneResponseDto })
	user: UserFindOneResponse

	@ApiProperty({ type: UserInfoFindOneResponseDto })
	userInfo: UserInfoFindOneResponse

	@ApiProperty({ type: SignInTokenDefinitionDto })
	tokens: SignInTokenDefinition
}
