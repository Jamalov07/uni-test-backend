import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SemestrService } from './semestr.service'
import {
	SemestrCreateRequestDto,
	SemestrFindFullResponseDto,
	SemestrDeleteRequestDto,
	SemestrFindAllRequestDto,
	SemestrFindFullRequestDto,
	SemestrFindOneRequestDto,
	SemestrUpdateRequestDto,
	SemestrFindAllResponseDto,
	SemestrFindOneResponseDto,
} from './dtos'
import { SemestrCreateResponse, SemestrDeleteResponse, SemestrFindAllResponse, SemestrFindFullResponse, SemestrFindOneResponse, SemestrUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Semestr')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('semestr')
export class SemestrController {
	private readonly service: SemestrService

	constructor(service: SemestrService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: SemestrFindFullResponseDto, isArray: true })
	findFull(@Query() payload: SemestrFindFullRequestDto): Promise<SemestrFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: SemestrFindAllResponseDto })
	findAll(@Query() payload: SemestrFindAllRequestDto): Promise<SemestrFindAllResponse> {
		return this.service.findAll({ ...payload, pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE })
	}

	@Get(':id')
	@ApiResponse({ type: SemestrFindOneResponseDto })
	findOne(@Param() payload: SemestrFindOneRequestDto): Promise<SemestrFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: SemestrCreateRequestDto): Promise<SemestrCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: SemestrFindOneRequestDto, @Body() payload: SemestrUpdateRequestDto): Promise<SemestrUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: SemestrDeleteRequestDto): Promise<SemestrDeleteResponse> {
		return this.service.delete(payload)
	}
}
