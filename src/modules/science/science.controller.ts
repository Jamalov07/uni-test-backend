import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ScienceService } from './science.service'
import {
	ScienceCreateRequestDto,
	ScienceFindFullResponseDto,
	ScienceDeleteRequestDto,
	ScienceFindAllRequestDto,
	ScienceFindFullRequestDto,
	ScienceFindOneRequestDto,
	ScienceUpdateRequestDto,
	ScienceFindAllResponseDto,
	ScienceFindOneResponseDto,
	ScienceFindFullForArchiveDto,
} from './dtos'
import {
	ScienceCreateResponse,
	ScienceDeleteResponse,
	ScienceFindAllResponse,
	ScienceFindFullForArchive,
	ScienceFindFullResponse,
	ScienceFindOneResponse,
	ScienceUpdateResponse,
} from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { UserIdInAccessToken } from '../../decorators'

@ApiTags('Science')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('science')
export class ScienceController {
	private readonly service: ScienceService

	constructor(service: ScienceService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: ScienceFindFullResponseDto, isArray: true })
	findFull(@Query() payload: ScienceFindFullRequestDto): Promise<ScienceFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: ScienceFindAllResponseDto })
	findAll(@Query() payload: ScienceFindAllRequestDto): Promise<ScienceFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get('for-archive')
	@ApiResponse({ type: ScienceFindFullForArchiveDto, isArray: true })
	findAllForArchive(@UserIdInAccessToken() id: string): Promise<ScienceFindFullForArchive[]> {
		return this.service.findAllForArchive(id)
	}

	@Get(':id')
	@ApiResponse({ type: ScienceFindOneResponseDto })
	findOne(@Param() payload: ScienceFindOneRequestDto): Promise<ScienceFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: ScienceCreateRequestDto): Promise<ScienceCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: ScienceFindOneRequestDto, @Body() payload: ScienceUpdateRequestDto): Promise<ScienceUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: ScienceDeleteRequestDto): Promise<ScienceDeleteResponse> {
		return this.service.delete(payload)
	}
}
