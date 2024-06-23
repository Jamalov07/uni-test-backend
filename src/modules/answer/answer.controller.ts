import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AnswerService } from './answer.service'
import {
	AnswerCreateRequestDto,
	AnswerFindFullResponseDto,
	AnswerDeleteRequestDto,
	AnswerFindAllRequestDto,
	AnswerFindFullRequestDto,
	AnswerFindOneRequestDto,
	AnswerUpdateRequestDto,
	AnswerFindAllResponseDto,
	AnswerFindOneResponseDto,
} from './dtos'
import { AnswerCreateResponse, AnswerDeleteResponse, AnswerFindAllResponse, AnswerFindFullResponse, AnswerFindOneResponse, AnswerUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'
import { CheckAuthGuard } from '../../guards'

@ApiTags('Answer')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@UseGuards(CheckAuthGuard)
@Controller('answer')
export class AnswerController {
	private readonly service: AnswerService

	constructor(service: AnswerService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: AnswerFindFullResponseDto, isArray: true })
	findFull(@Query() payload: AnswerFindFullRequestDto): Promise<AnswerFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: AnswerFindAllResponseDto })
	findAll(@Query() payload: AnswerFindAllRequestDto): Promise<AnswerFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: AnswerFindOneResponseDto })
	findOne(@Param() payload: AnswerFindOneRequestDto): Promise<AnswerFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: AnswerCreateRequestDto): Promise<AnswerCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: AnswerFindOneRequestDto, @Body() payload: AnswerUpdateRequestDto): Promise<AnswerUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: AnswerDeleteRequestDto): Promise<AnswerDeleteResponse> {
		return this.service.delete(payload)
	}
}
