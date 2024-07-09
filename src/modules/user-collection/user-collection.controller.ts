import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
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
	UserCollectionCreateManyRequestDto,
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
import { CheckAuthGuard } from '../../guards'
import { UserIdInAccessToken } from '../../decorators'

@ApiTags('UserCollection')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller('user-collection')
export class UserCollectionController {
	private readonly service: UserCollectionService

	constructor(service: UserCollectionService) {
		this.service = service
	}

	@Get()
	@ApiResponse({ type: UserCollectionFindFullResponseDto, isArray: true })
	findFull(@Query() payload: UserCollectionFindFullRequestDto): Promise<UserCollectionFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('full')
	@ApiResponse({ type: UserCollectionFindFullResponseDto, isArray: true })
	findFullForUser(@UserIdInAccessToken() id: string, @Query() payload: UserCollectionFindFullRequestDto): Promise<UserCollectionFindFullResponse> {
		return this.service.findFull({ ...payload, userId: id })
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

	@Post('many')
	@ApiResponse({ type: null })
	createMany(@Body() payload: UserCollectionCreateManyRequestDto): Promise<UserCollectionCreateResponse> {
		return this.service.createMany(payload)
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
