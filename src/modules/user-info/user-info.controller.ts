import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserInfoService } from './user-info.service'
import {
	UserInfoCreateRequestDto,
	UserInfoFindFullResponseDto,
	UserInfoDeleteRequestDto,
	UserInfoFindAllRequestDto,
	UserInfoFindFullRequestDto,
	UserInfoFindOneRequestDto,
	UserInfoUpdateRequestDto,
	UserInfoFindAllResponseDto,
	UserInfoFindOneResponseDto,
} from './dtos'
import { UserInfoCreateResponse, UserInfoDeleteResponse, UserInfoFindAllResponse, UserInfoFindFullResponse, UserInfoFindOneResponse, UserInfoUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('UserInfo')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('user-info')
export class UserInfoController {
	private readonly service: UserInfoService

	constructor(service: UserInfoService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: UserInfoFindFullResponseDto, isArray: true })
	findFull(@Query() payload: UserInfoFindFullRequestDto): Promise<UserInfoFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: UserInfoFindAllResponseDto })
	findAll(@Query() payload: UserInfoFindAllRequestDto): Promise<UserInfoFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: UserInfoFindOneResponseDto })
	findOne(@Param() payload: UserInfoFindOneRequestDto): Promise<UserInfoFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: UserInfoCreateRequestDto): Promise<UserInfoCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: UserInfoFindOneRequestDto, @Body() payload: UserInfoUpdateRequestDto): Promise<UserInfoUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: UserInfoDeleteRequestDto): Promise<UserInfoDeleteResponse> {
		return this.service.delete(payload)
	}
}
