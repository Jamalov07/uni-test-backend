import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ArchiveService } from './archive.service'
import {
	ArchiveCreateRequestDto,
	ArchiveFindFullResponseDto,
	ArchiveDeleteRequestDto,
	ArchiveFindAllRequestDto,
	ArchiveFindFullRequestDto,
	ArchiveFindOneRequestDto,
	ArchiveUpdateRequestDto,
	ArchiveFindAllResponseDto,
	ArchiveFindOneResponseDto,
} from './dtos'
import { ArchiveCreateResponse, ArchiveDeleteResponse, ArchiveFindAllResponse, ArchiveFindFullResponse, ArchiveFindOneResponse, ArchiveUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Archive')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('archive')
export class ArchiveController {
	private readonly service: ArchiveService

	constructor(service: ArchiveService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: ArchiveFindFullResponseDto, isArray: true })
	findFull(@Query() payload: ArchiveFindFullRequestDto): Promise<ArchiveFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: ArchiveFindAllResponseDto })
	findAll(@Query() payload: ArchiveFindAllRequestDto): Promise<ArchiveFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: ArchiveFindOneResponseDto })
	findOne(@Param() payload: ArchiveFindOneRequestDto): Promise<ArchiveFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: ArchiveCreateRequestDto): Promise<ArchiveCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: ArchiveFindOneRequestDto, @Body() payload: ArchiveUpdateRequestDto): Promise<ArchiveUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: ArchiveDeleteRequestDto): Promise<ArchiveDeleteResponse> {
		return this.service.delete(payload)
	}
}
