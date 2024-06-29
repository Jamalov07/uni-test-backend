import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	AdminCreateRequest,
	AdminDeleteRequest,
	AdminFindAllRequest,
	AdminFindAllResponse,
	AdminFindFullRequest,
	AdminFindOneRequest,
	AdminFindOneResponse,
	AdminSignInRequest,
	AdminSignInResponse,
	AdminUpdateRequest,
} from '../interfaces'
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { $Enums } from '@prisma/client'
import { SignInTokenDefinition, SignInTokenDefinitionDto } from '../../user'

export class AdminFindFullRequestDto implements AdminFindFullRequest {
	@ApiPropertyOptional({ example: 'jn@gmail.com' })
	@IsEmail()
	@IsOptional()
	emailAddress?: string

	@ApiPropertyOptional({ example: 'jn' })
	@IsString()
	@IsOptional()
	fullName?: string

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminFindAllRequestDto implements AdminFindAllRequest {
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
	@IsEnum($Enums.AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminFindOneRequestDto implements AdminFindOneRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

export class AdminSignInRequestDto implements AdminSignInRequest {
	@ApiProperty({ example: 'hemisid' })
	@IsString()
	@IsNotEmpty()
	hemisId: string

	@ApiProperty({ example: 'password' })
	@IsString()
	@IsNotEmpty()
	password: string
}

export class AdminCreateRequestDto implements AdminCreateRequest {
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

	// @ApiProperty({ example: 'link' })
	// @IsString()
	// @IsOptional()
	// image?: string

	@ApiProperty({ example: 'student' })
	@IsEnum($Enums.AdminTypeEnum)
	@IsNotEmpty()
	type: $Enums.AdminTypeEnum
}

export class AdminUpdateRequestDto implements AdminUpdateRequest {
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

	@ApiPropertyOptional({ example: 'student' })
	@IsEnum($Enums.AdminTypeEnum)
	@IsOptional()
	type?: $Enums.AdminTypeEnum
}

export class AdminDeleteRequestDto implements AdminDeleteRequest {
	@ApiProperty({ example: 'uuid' })
	@IsUUID('4')
	@IsNotEmpty()
	id: string
}

//=======================

export class AdminFindFullResponseDto implements AdminFindOneResponse {
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

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class AdminFindOneResponseDto implements AdminFindOneResponse {
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

	@ApiProperty({ example: new Date() })
	createdAt: Date
}

export class AdminFindAllResponseDto implements AdminFindAllResponse {
	@ApiProperty({ example: 10 })
	totalCount: number

	@ApiProperty({ example: 10 })
	pageCount: number

	@ApiProperty({ example: 10 })
	pageSize: number

	@ApiProperty({ type: AdminFindOneResponseDto, isArray: true })
	data: AdminFindOneResponse[]
}

export class AdminSignInResponseDto implements AdminSignInResponse {
	@ApiProperty({ type: AdminFindOneResponseDto })
	admin: AdminFindOneResponse

	@ApiProperty({ type: SignInTokenDefinitionDto })
	tokens: SignInTokenDefinition
}
