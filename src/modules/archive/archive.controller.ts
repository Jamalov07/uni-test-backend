import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
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
	ArchiveExcelResponseDto,
} from './dtos'
import { ArchiveCreateResponse, ArchiveDeleteResponse, ArchiveFindAllResponse, ArchiveFindFullResponse, ArchiveFindOneResponse, ArchiveUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'
import { Roles } from '../../decorators'
import { Response } from 'express'

@ApiTags('Archive')
@UseGuards(CheckAuthGuard)
@ApiBearerAuth()
@Controller('archive')
export class ArchiveController {
	private readonly service: ArchiveService

	constructor(service: ArchiveService) {
		this.service = service
	}

	@Get('full')
	@Roles('admin', 'student')
	@ApiResponse({ type: ArchiveFindFullResponseDto, isArray: true })
	findFull(@Query() payload: ArchiveFindFullRequestDto): Promise<ArchiveFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('excel-old')
	@Roles('admin', 'student')
	@ApiResponse({ type: null })
	findFullInExcel1(@Query() payload: ArchiveFindFullRequestDto, @Res() res: Response): Promise<void> {
		return this.service.downloadInExcel1(payload, res)
	}

	@Get('excel')
	@Roles('admin', 'student')
	@ApiResponse({ type: ArchiveExcelResponseDto })
	findFullInExcel(@Query() payload: ArchiveFindFullRequestDto): Promise<{ url: string }> {
		return this.service.downloadInExcel(payload)
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
