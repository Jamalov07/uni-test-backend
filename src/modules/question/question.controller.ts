import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger'
import { QuestionService } from './question.service'
import {
	QuestionCreateRequestDto,
	QuestionFindFullResponseDto,
	QuestionDeleteRequestDto,
	QuestionFindAllRequestDto,
	QuestionFindFullRequestDto,
	QuestionFindOneRequestDto,
	QuestionUpdateRequestDto,
	QuestionFindAllResponseDto,
	QuestionFindOneResponseDto,
} from './dtos'
import { QuestionCreateResponse, QuestionDeleteResponse, QuestionFindAllResponse, QuestionFindFullResponse, QuestionFindOneResponse, QuestionUpdateResponse } from './interfaces'
import { PAGE_NUMBER, PAGE_SIZE } from '../../constants'

@ApiTags('Question')
@ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
@Controller('question')
export class QuestionController {
	private readonly service: QuestionService

	constructor(service: QuestionService) {
		this.service = service
	}

	@Get('full')
	@ApiResponse({ type: QuestionFindFullResponseDto, isArray: true })
	findFull(@Query() payload: QuestionFindFullRequestDto): Promise<QuestionFindFullResponse> {
		return this.service.findFull(payload)
	}

	@Get('all')
	@ApiResponse({ type: QuestionFindAllResponseDto })
	findAll(@Query() payload: QuestionFindAllRequestDto): Promise<QuestionFindAllResponse> {
		return this.service.findAll({ ...payload, pageSize: PAGE_SIZE, pageNumber: PAGE_NUMBER })
	}

	@Get(':id')
	@ApiResponse({ type: QuestionFindOneResponseDto })
	findOne(@Param() payload: QuestionFindOneRequestDto): Promise<QuestionFindOneResponse> {
		return this.service.findOne(payload)
	}

	@Post()
	@ApiResponse({ type: null })
	create(@Body() payload: QuestionCreateRequestDto): Promise<QuestionCreateResponse> {
		return this.service.create(payload)
	}

	@Patch(':id')
	@ApiResponse({ type: null })
	update(@Param() params: QuestionFindOneRequestDto, @Body() payload: QuestionUpdateRequestDto): Promise<QuestionUpdateResponse> {
		return this.service.update(params, payload)
	}

	@Delete(':id')
	@ApiResponse({ type: null })
	delete(@Param() payload: QuestionDeleteRequestDto): Promise<QuestionDeleteResponse> {
		return this.service.delete(payload)
	}
}
