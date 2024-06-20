import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CollectionService } from './collection.service'
import {
	CollectionCreateRequestDto,
	CollectionFindFullResponseDto,
	CollectionDeleteRequestDto,
	CollectionFindAllRequestDto,
	CollectionFindFullRequestDto,
	CollectionFindOneRequestDto,
	CollectionUpdateRequestDto,
	CollectionFindAllResponseDto,
	CollectionFindOneResponseDto,
} from './dtos'
import {
	CollectionCreateResponse,
	CollectionDeleteResponse,
	CollectionFindAllResponse,
	CollectionFindFullResponse,
	CollectionFindOneResponse,
	CollectionUpdateResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'

@ApiTags('Collection')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@Controller('collection')
export class CollectionController {
	private readonly service: CollectionService

	constructor(service: CollectionService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: CollectionFindFullResponseDto, isArray: true })
	findFull(@Query() payload: CollectionFindFullRequestDto): Promise<CollectionFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: CollectionFindAllResponseDto })
	findAll(@Query() payload: CollectionFindAllRequestDto): Promise<CollectionFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: CollectionFindOneResponseDto })
	findOne(@Param() payload: CollectionFindOneRequestDto): Promise<CollectionFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: CollectionCreateRequestDto): Promise<CollectionCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: CollectionFindOneRequestDto, @Body() payload: CollectionUpdateRequestDto): Promise<CollectionUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: CollectionDeleteRequestDto): Promise<CollectionDeleteResponse> {
		return this.service.delete(payload)
	}
}
