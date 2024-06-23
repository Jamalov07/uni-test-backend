import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserCollectionService } from './user-collection.service'
import {
	UserCollectionCreateRequestDto,
	UserCollectionFindFullResponseDto,
	UserCollectionDeleteRequestDto,
	UserCollectionFindAllRequestDto,
	UserCollectionFindFullRequestDto,
	UserCollectionFindOneRequestDto,
	UserCollectionUpdateRequestDto,
	UserCollectionFindAllResponseDto,
	UserCollectionFindOneResponseDto,
} from './dtos'
import {
	UserCollectionCreateResponse,
	UserCollectionDeleteResponse,
	UserCollectionFindAllResponse,
	UserCollectionFindFullResponse,
	UserCollectionFindOneResponse,
	UserCollectionUpdateResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAccessGuard } from '../../guards'

@ApiTags('UserCollection')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAccessGuard)
@Controller('user-collection')
export class UserCollectionController {
	private readonly service: UserCollectionService

	constructor(service: UserCollectionService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: UserCollectionFindFullResponseDto, isArray: true })
	findFull(@Query() payload: UserCollectionFindFullRequestDto): Promise<UserCollectionFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: UserCollectionFindAllResponseDto })
	findAll(@Query() payload: UserCollectionFindAllRequestDto): Promise<UserCollectionFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: UserCollectionFindOneResponseDto })
	findOne(@Param() payload: UserCollectionFindOneRequestDto): Promise<UserCollectionFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: UserCollectionCreateRequestDto): Promise<UserCollectionCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: UserCollectionFindOneRequestDto, @Body() payload: UserCollectionUpdateRequestDto): Promise<UserCollectionUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: UserCollectionDeleteRequestDto): Promise<UserCollectionDeleteResponse> {
		return this.service.delete(payload)
	}
}
